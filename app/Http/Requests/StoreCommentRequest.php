<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'stone_id' => 'required|integer|exists:stones,id',
            'content' => 'required|string|max:1000',
        ];
    }

    /**
     * Custom messages for validation errors
     *
     * @return array
     */
    public function messages()
    {
        return [
            'stone_id.required' => 'The stone ID is required.',
            'stone_id.integer' => 'The stone ID must be an integer.',
            'stone_id.exists' => 'The specified stone ID does not exist.',
            'content.required' => 'The comment content is required.',
            'content.string' => 'The comment content must be a string.',
            'content.max' => 'The comment content may not be greater than 1000 characters.',
        ];
    }

}
