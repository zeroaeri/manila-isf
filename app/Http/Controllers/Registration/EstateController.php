<?php

namespace App\Http\Controllers\Registration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Estate;

class EstateController extends Controller
{

    public function index()
    {
        return Estate::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:estates',
            'housingQuan' => 'nullable|integer',
            'status' => 'required|string|max:255',
            'address' => 'required|string',
            'brgy' => 'required|integer',
            'zone' => 'required|integer',
            'sqm' => 'required|numeric',
            'district' => 'required|integer',
        ]);

        return Estate::create($request->all());
    }

    public function show(string $id)
    {
        return Estate::find($id);
    }

    public function update(Request $request, string $id)
    {
        $estate = Estate::findOrFail($id);
        $estate->update($request->all());
        return $estate;
    }

    public function destroy(string $id)
    {
        return Estate::destroy($id);
    }
}
