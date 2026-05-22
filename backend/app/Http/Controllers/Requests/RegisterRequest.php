<?php
namespace App\Http\Controllers\Requests;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'name' => 'required|min:2|max:50',
            "username"=>"required|alpha_num:ascii|min:3|max:25|unique:users,username",
            "email"=>"required|email|unique:users,email",
            "password"=>"required|min:3|max:50|confirmed",
        ];
    }
}


