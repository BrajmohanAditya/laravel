<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Hash;
use Exception;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $payload = $request->validated();

        try {

            $payload['password'] = Hash::make($payload['password']);
            $user = User::create($payload);

            return response()->json([
                'message' => 'User created successfully',
                'user' => $user,
                'token' => $user->createToken('api')->plainTextToken
            ], 201);

        } catch (Exception $err) {
            Log::info("Register error =>" .$err->getMessage());

            return response()->json([
                'message' => 'Something went wrong'
            ], 500);
        }
    }
}
