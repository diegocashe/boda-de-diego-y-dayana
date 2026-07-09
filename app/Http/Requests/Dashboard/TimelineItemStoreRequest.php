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
            'image' => ['nullable', 'image', 'max:4096', Rule::prohibitedIf(fn () => $this->hasFile('video'))],
            'video' => [
                'nullable',
                'file',
                'mimetypes:video/mp4,video/quicktime,video/webm',
                'max:20480',
                Rule::prohibitedIf(fn () => $this->hasFile('image')),
            ],
            'video_poster' => [
                'nullable',
                'image',
                'max:4096',
                Rule::prohibitedIf(fn () => ! $this->hasFile('video') && ! $this->existingTimelineItem()?->video_path),
            ],
        ];
    }

    /**
     * The timeline item being updated, if this request is bound to one (edit forms).
     */
    protected function existingTimelineItem(): ?TimelineItem
    {
        $item = $this->route('timelineItem');

        return $item instanceof TimelineItem ? $item : null;
    }
}
