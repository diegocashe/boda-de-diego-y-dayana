<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InvitationStoreRequest extends FormRequest
{
    /**
     * Default the attendance mode to in-person when the dashboard form omits it.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'attendance_mode' => $this->input('attendance_mode', 'in_person'),
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
            'guest_name' => ['required', 'string', 'max:150'],
            'email' => ['nullable', 'email', 'max:255'],
            'max_passes' => ['required', 'integer', 'min:1', 'max:20'],
            'attendance_mode' => ['required', Rule::in(['in_person', 'online'])],
        ];
    }
}
