<?php

namespace App\Http\Controllers\Registration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
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

        return User::create($request->all());
    }

    public function show(string $id)
    {
        return User::find($id);
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return $user;
    }

    public function destroy(string $id)
    {
        return User::destroy($id);
    }
}
