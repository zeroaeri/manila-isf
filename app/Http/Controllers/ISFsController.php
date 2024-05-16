<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ISFs;
use Illuminate\Support\Facades\Storage;

class ISFsController extends Controller
{

    public function index()
    {
        return ISFs::all();
    }



    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:isfs',
            'bday' => 'required|date',
            'civilStat' => 'required|string',
            'childQuan' => 'required|integer',
            'incomeBracket' => 'required|string',
            'district' => 'required|integer',
            'zone' => 'required|integer',
            'brgy' => 'required|integer',
            'typeLocation' => 'required|string',
            'specLocation' => 'required|string',
            'imgLoc' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'descLocation' => 'nullable|string',
        ]);

        $imgLocName = $request->file('imgLoc')->getClientOriginalName();
        $request->file('imgLoc')->storeAs(
            'public/images/isf',
            $imgLocName
        );

        return ISFs::create([
            'name' => $request->name,
            'bday' => $request->bday,
            'civilStat' => $request->civilStat,
            'childQuan' => $request->childQuan,
            'incomeBracket' => $request->incomeBracket,
            'district' => $request->district,
            'zone' => $request->zone,
            'brgy' => $request->brgy,
            'typeLocation' => $request->typeLocation,
            'specLocation' => $request->specLocation,
            'descLocation' => $request->descLocation,
            'imgLoc' => $imgLocName,
        ]);
    }


    public function show(string $id)
    {
        return ISFs::find($id);
    }


    public function edit($id)
    {
        // Logic to show the edit resource form
    }

    public function update(Request $request, string $id)
    {
        $isf = ISFs::findOrFail($id);

        if ($request->hasFile('imgLoc')) {

            if ($isf->imgLoc) {
                Storage::delete('public/images/isf' . $isf->imgLoc);
            }

            $imgLocName = $request->file('imgLoc')->getClientOriginalName();
            $request->file('imgLoc')->storeAs(
                'public/images/isf',
                $imgLocName
            );
            $isf->imgLoc = $imgLocName;

            $isf->update([
                'name' => $request->name,
                'bday' => $request->bday,
                'civilStat' => $request->civilStat,
                'childQuan' => $request->childQuan,
                'incomeBracket' => $request->incomeBracket,
                'district' => $request->district,
                'zone' => $request->zone,
                'brgy' => $request->brgy,
                'typeLocation' => $request->typeLocation,
                'specLocation' => $request->specLocation,
                'descLocation' => $request->descLocation,
                'imgLoc' => $imgLocName,
            ]);
            return $isf;
        }


        $isf->update($request->all());
        return $isf;
    }


    public function destroy(string $id)
    {
        return ISFs::destroy($id);
    }
}
