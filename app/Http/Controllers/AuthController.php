<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'fname' => 'required|string|max:255',
            'mname' => 'nullable|string|max:255',
            'lname' => 'required|string|max:255',
            'uname' => 'required|string|unique:users',
            'role' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'department' => 'required|string|max:100',
            'password' => 'required'
        ]);

        User::create([
            'fname' => $request->fname,
            'mname' => $request->mname,
            'lname' => $request->lname,
            'uname' => $request->uname,
            'role' => $request->role,
            'email' => $request->email,
            'department' => $request->department,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User registered successfully.',

        ]);

    }

    public function login(Request $request)
    {

        $request->validate([
            'uname' => 'required|string',
            'password' => 'required'
        ]);

        $user = User::where('uname', $request->uname)->first();

        if (!empty($user)) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('token')->plainTextToken;

                return response()->json([
                    'status' => true,
                    'message' => 'User logged in.',
                    'token' => $token,
                    'user' => $user
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid password.',

                ]);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Account does not exist.',

            ]);
        }

    }

    public function profile()
    {
        $userData = auth()->user();
        return response()->json([
            'status' => true,
            'message' => 'Get user info successful.',
            'data' => $userData,
        ]);
    }

    public function forgot(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string', 
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Email not found.',
            ], 404);
        }

        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Password updated successfully.',
            'data' =>  $user
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully.',
        ]);
    }
}
