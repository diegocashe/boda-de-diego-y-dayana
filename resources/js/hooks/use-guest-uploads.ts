import { useEffect, useRef, useState } from 'react';
import { store } from '@/routes/invitation/uploads';

const MAX_CONCURRENT = 3;
const MAX_AUTO_RETRIES = 2;
const RETRY_DELAY_MS = 1200;

export type UploadStatus = 'queued' | 'uploading' | 'success' | 'error';

export interface UploadItem {
    id: string;
    file: File;
    previewUrl: string | null;
    status: UploadStatus;
    progress: number;
    retries: number;
}

function csrfToken(): string {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
}

// Cola de subida por lotes: sube varios archivos a la vez con un límite de
// concurrencia, reintenta automáticamente los que fallan y deja el resto
// disponible para reintento manual.
export function useGuestUploads(invitationCode: string) {
    const [items, setItems] = useState<UploadItem[]>([]);
    const filesRef = useRef(new Map<string, File>());
    const pendingRef = useRef<string[]>([]);
    const activeRef = useRef(0);
    const previewUrlsRef = useRef<string[]>([]);

    useEffect(
        () => () => {
            previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
        },
        [],
    );

    function patch(id: string, changes: Partial<UploadItem>) {
        setItems((current) => current.map((item) => (item.id === id ? { ...item, ...changes } : item)));
    }

    function pump() {
        while (activeRef.current < MAX_CONCURRENT && pendingRef.current.length > 0) {
            const id = pendingRef.current.shift();

            if (!id) {
                break;
            }

            const file = filesRef.current.get(id);

            if (!file) {
                continue;
            }

            upload(id, file);
        }
    }

    function upload(id: string, file: File) {
        activeRef.current += 1;
        patch(id, { status: 'uploading', progress: 0 });

        const xhr = new XMLHttpRequest();
        xhr.open('POST', store.url(invitationCode));
        xhr.setRequestHeader('X-CSRF-TOKEN', csrfToken());
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                patch(id, { progress: Math.round((event.loaded / event.total) * 100) });
            }
        };

        xhr.onloadend = () => {
            activeRef.current -= 1;

            if (xhr.status >= 200 && xhr.status < 300) {
                patch(id, { status: 'success', progress: 100 });
            } else {
                retryOrFail(id);
            }

            pump();
        };

        const formData = new FormData();
        formData.append('file', file);
        xhr.send(formData);
    }

    function retryOrFail(id: string) {
        setItems((current) =>
            current.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                if (item.retries < MAX_AUTO_RETRIES) {
                    scheduleRetry(id);

                    return { ...item, retries: item.retries + 1, status: 'queued', progress: 0 };
                }

                return { ...item, status: 'error' };
            }),
        );
    }

    function scheduleRetry(id: string) {
        setTimeout(() => {
            pendingRef.current.push(id);
            pump();
        }, RETRY_DELAY_MS);
    }

    function addFiles(files: FileList | File[]) {
        const newItems: UploadItem[] = Array.from(files).map((file) => {
            const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
            const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;

            if (previewUrl) {
                previewUrlsRef.current.push(previewUrl);
            }

            filesRef.current.set(id, file);
            pendingRef.current.push(id);

            return { id, file, previewUrl, status: 'queued', progress: 0, retries: 0 };
        });

        setItems((current) => [...current, ...newItems]);
        pump();
    }

    function retry(id: string) {
        setItems((current) => current.map((item) => (item.id === id ? { ...item, status: 'queued', progress: 0, retries: 0 } : item)));
        pendingRef.current.push(id);
        pump();
    }

    return {
        items,
        addFiles,
        retry,
    };
}
