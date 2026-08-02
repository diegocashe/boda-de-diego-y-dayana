<?php

namespace App\Http\Requests;

use App\Models\Invitation;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RsvpStoreRequest extends FormRequest
{
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
            'attending' => ['required', Rule::in(['yes', 'no'])],
            // Si el invitado declina, los pases que viajen en la petición se ignoran.
            'guests' => ['exclude_unless:attending,yes', 'required', 'integer', 'min:1', 'max:'.$invitation->max_passes],
            'message' => ['nullable', 'string', 'max:1000'],
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
            'attending.required' => 'Cuéntanos si podrás acompañarnos.',
            'guests.max' => 'Tu invitación incluye máximo :max pases.',
        ];
    }
}
