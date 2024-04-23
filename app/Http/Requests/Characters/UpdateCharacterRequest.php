<?php

namespace App\Http\Requests\Characters;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCharacterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'required|integer',
            'name' => 'sometimes|string',
            'note' => 'sometimes|string',
            'ilvl' => 'sometimes|integer',
            'class_icon_id' => 'sometimes|integer',
        ];
    }
}
