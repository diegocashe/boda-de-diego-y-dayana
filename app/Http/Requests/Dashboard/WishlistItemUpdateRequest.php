<?php

namespace App\Http\Requests\Dashboard;

use App\Models\WishlistItem;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

class WishlistItemUpdateRequest extends WishlistItemStoreRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * La imagen es opcional al editar: conservar la actual es el caso común.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            ...parent::rules(),
            'image' => ['nullable', 'image', 'max:10240'],
            'status' => ['required', 'string', Rule::in(WishlistItem::STATUSES)],
        ];
    }
}
