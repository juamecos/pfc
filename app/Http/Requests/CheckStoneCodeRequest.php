<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckStoneCodeRequest extends FormRequest
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
            'code' => [
                'required',
                'regex:/^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}$/'
            ],
        ];


    }

    /**
     * Custom message for validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'code.regex' => 'The code must consist of three alphanumeric characters, a dash, and four alphanumeric characters.',
        ];
    }
}
