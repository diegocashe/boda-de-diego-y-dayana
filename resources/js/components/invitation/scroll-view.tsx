import { cn } from '@/lib/utils';

interface ScrollViewProps {
    children: React.ReactNode;
    className?: string;
}

// Vista con scroll propio bajo la navegación fija (barra inferior en móvil, píldora superior en desktop).
export default function ScrollView({ children, className }: ScrollViewProps) {
    return (
        <div className="scrollbar-hidden h-dvh overflow-x-hidden overflow-y-auto">
            <div className={cn('mx-auto w-full max-w-[1120px] px-[22px] pt-[34px] pb-[108px] desk:pt-[122px] desk:pb-[70px]', className)}>
                {children}
            </div>
        </div>
    );
}
