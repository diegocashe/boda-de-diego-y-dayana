<?php

namespace App\Http\Requests\Dashboard;

use App\Models\Invitation;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InvitationUpdateRequest extends FormRequest
{
    /**
     * Keep the current attendance mode when the dashboard form omits it.
     */
    protected function prepareForValidation(): void
    {
        /** @var Invitation $invitation */
        $invitation = $this->route('invitation');

        $this->merge([
            'attendance_mode' => $this->input('attendance_mode', $invitation->attendance_mode),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /** @var Invitation $invitation */
        $invitation = $this->route('invitation');

        return [
            'guest_name' => ['required', 'string', 'max:150'],
            'email' => ['nullable', 'email', 'max:255'],
            // Los pases no pueden bajar de lo que el invitado ya confirmó.
            'max_passes' => ['required', 'integer', 'min:'.max(1, (int) $invitation->confirmed_passes), 'max:20'],
            'attendance_mode' => ['required', Rule::in(['in_person', 'online'])],
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
            'max_passes.min' => 'Los pases no pueden ser menos de los que el invitado ya confirmó.',
        ];
    }
}
