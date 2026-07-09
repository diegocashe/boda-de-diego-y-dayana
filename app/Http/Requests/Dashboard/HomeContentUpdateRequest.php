<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class HomeContentUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'hero_eyebrow' => ['required', 'string', 'max:80'],
            'hero_scroll_hint' => ['required', 'string', 'max:40'],
            'countdown_eyebrow' => ['required', 'string', 'max:80'],
            'countdown_heading' => ['required', 'string', 'max:120'],
            'cta_heading' => ['required', 'string', 'max:400'],
            'cta_paragraph' => ['required', 'string', 'max:600'],
            'cta_button_label' => ['required', 'string', 'max:60'],
        ];
    }
}
