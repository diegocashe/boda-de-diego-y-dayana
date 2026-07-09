<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class WeddingSettingUpdateRequest extends FormRequest
{
    /**
     * The notification emails travel as a single newline/comma-separated textarea;
     * split them into an array before validating each one.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'notification_emails' => collect(preg_split('/[\s,]+/', (string) $this->input('notification_emails'), -1, PREG_SPLIT_NO_EMPTY) ?: [])
                ->map(fn (string|false $email): string => trim((string) $email))
                ->unique()
                ->values()
                ->all(),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'groom_name' => ['required', 'string', 'max:100'],
            'bride_name' => ['required', 'string', 'max:100'],
            'wedding_at' => ['required', 'date'],
            'city' => ['required', 'string', 'max:120'],
            'og_background' => ['nullable', 'image', 'max:4096'],
            'notification_emails' => ['array'],
            'notification_emails.*' => ['email:rfc', 'max:255'],
            'godparents_whatsapp' => ['nullable', 'string', 'max:20'],
            'godparents_phone' => ['nullable', 'string', 'max:20'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'notification_emails.*.email' => 'Revisa el correo ":input", no parece válido.',
        ];
    }
}
