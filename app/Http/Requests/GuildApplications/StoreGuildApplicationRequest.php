<?php

namespace App\Http\Requests\GuildApplications;

use Illuminate\Foundation\Http\FormRequest;

class StoreGuildApplicationRequest extends FormRequest
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
            "in_server" => 'required|boolean',
            "server" => 'nullable|string',
            "description" => 'required|string',
            "experience" => 'required|string',
            "play_time" => 'required|string',
            "gvg" => 'required|boolean',
            "gve" => 'required|string',
            "server_expectations" => 'required|string',
            "inquiry_source" => 'required|string',
            "additional_info" => 'nullable',
            "guild_cooldown" => 'nullable',
            "acquaintances" => 'nullable',
        ];
    }
}
