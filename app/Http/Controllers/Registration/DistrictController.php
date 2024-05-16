<?php

namespace App\Http\Controllers\Registration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\District;

class DistrictController extends Controller
{

    public function index()
    {
        return District::all();
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|integer|unique:districts',
            'startZone' => 'nullable|integer|unique:districts',
            'endZone' => 'required|integer|unique:districts',
            'startBrgy' => 'required|integer|unique:districts',
            'endBrgy' => 'required|integer|unique:districts',

        ]);

        return District::create($request->all());
    }

    public function show(string $id)
    {
        return District::find($id);
    }

    public function update(Request $request, string $id)
    {
        $district = District::findOrFail($id);
        $district->update($request->all());
        return $district;
    }

    public function destroy(string $id)
    {
        return District::destroy($id);
    }
}
