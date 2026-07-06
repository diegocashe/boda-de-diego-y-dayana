<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class WeddingSettingUpdateRequest extends FormRequest
{
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
        ];
    }
}
