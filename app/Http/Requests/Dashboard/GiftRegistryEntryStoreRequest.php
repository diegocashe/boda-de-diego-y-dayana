<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class GiftRegistryEntryStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'label' => ['required', 'string', 'max:100'],
            'value' => ['required', 'string', 'max:255'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:1000'],
        ];
    }
}
