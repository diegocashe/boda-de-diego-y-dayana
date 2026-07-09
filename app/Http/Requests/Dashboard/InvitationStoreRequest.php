<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class InvitationStoreRequest extends FormRequest
{
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
        ];
    }
}
