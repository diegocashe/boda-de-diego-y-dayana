<?php

namespace App\Http\Requests\Dashboard;

use App\Models\Venue;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VenueStoreRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:150'],
            'schedule' => ['required', 'string', 'max:255'],
            'lat' => ['nullable', 'numeric', 'between:-90,90'],
            'lng' => ['nullable', 'numeric', 'between:-180,180'],
            'icon' => ['required', 'string', Rule::in(Venue::ICONS)],
            'accent' => ['required', 'string', Rule::in(Venue::ACCENTS)],
            'sort_order' => ['required', 'integer', 'min:0', 'max:1000'],
        ];
    }
}
