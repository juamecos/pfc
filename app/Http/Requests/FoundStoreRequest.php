<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FoundStoreRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'user_id' => 'required|integer|exists:users,id',
            'stone_id' => 'required|integer|exists:stones,id',
            'country' => 'required|string|max:2', // ISO Alpha-2 codes are 2 letters
            'city' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-85,85',
            'longitude' => 'required|numeric|between:-175,175',
        ];
    }

    /**
     * Custom messages for validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'user_id.required' => 'A user ID is required.',
            'user_id.integer' => 'The user ID must be an integer.',
            'user_id.exists' => 'The user ID must exist in the database.',
            'stone_id.required' => 'A stone ID is required.',
            'stone_id.integer' => 'The stone ID must be an integer.',
            'stone_id.exists' => 'The stone ID must exist in the database.',
            'country.required' => 'A country code is required.',
            'country.string' => 'The country code must be a string.',
            'country.max' => 'The country code must not exceed 2 characters.',
            'city.required' => 'A city name is required.',
            'city.string' => 'The city must be a string.',
            'city.max' => 'The city name must not exceed 255 characters.',
            'latitude.required' => 'Latitude is required.',
            'latitude.numeric' => 'Latitude must be a number.',
            'latitude.between' => 'Latitude must be between -85 and 85 degrees.',
            'longitude.required' => 'Longitude is required.',
            'longitude.numeric' => 'Longitude must be a number.',
            'longitude.between' => 'Longitude must be between -175 and 175 degrees.',
        ];
    }
}
