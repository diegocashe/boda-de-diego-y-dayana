<?php

namespace App\Http\Requests\Dashboard;

use App\Models\TimelineItem;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TimelineItemStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'period' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:150'],
            'description' => ['required', 'string', 'max:1000'],
            'icon' => ['required', 'string', Rule::in(TimelineItem::ICONS)],
            'highlighted' => ['boolean'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:1000'],
            'image' => ['nullable', 'image', 'max:4096'],
        ];
    }
}
