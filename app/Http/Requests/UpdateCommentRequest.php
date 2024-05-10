<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\ValidationRule;

class UpdateCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'content' => 'required|string|max:1000',
        ];
    }

    /**
     * Custom messages for validation errors
     *
     * @return array<string, array<mixed>|string>
     */
    public function messages()
    {
        return [
            'content.required' => 'The comment content is required.',
            'content.string' => 'The comment content must be a string.',
            'content.max' => 'The comment content may not be greater than 1000 characters.',
        ];
    }
}
