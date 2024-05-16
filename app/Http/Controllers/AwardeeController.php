<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Awardee;

class AwardeeController extends Controller
{

    public function index()
    {
        return Awardee::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:awardees',
            'entitlement' => 'required|string',
            'members' => 'nullable|array',
            'amortization' => 'nullable|numeric',
            'arrears' => 'nullable|numeric',
            'estate' => 'required|string',
            'remarks' => 'nullable|string',
        ]);

        $members = $request->input('members') ?? [];

        $awardee = new Awardee();
        $awardee->name = $request->input('name');
        $awardee->entitlement = $request->input('entitlement');
        $awardee->members = json_encode($members);
        $awardee->amortization = $request->input('amortization');
        $awardee->arrears = $request->input('arrears');
        $awardee->estate = $request->input('estate');
        $awardee->remarks = $request->input('remarks');
        $awardee->save();

        return $awardee;
    }

    public function show(string $id)
    {
        return Awardee::find($id);
    }


    public function update(Request $request, string $id)
    {
        $awardee = Awardee::findOrFail($id);
        $members = json_encode($request->input('members'));

        $awardee->update([
            'name' => $request->input('name'),
            'entitlement' => $request->input('entitlement'),
            'members' => $members,
            'amortization' => $request->input('amortization'),
            'arrears' => $request->input('arrears'),
            'estate' => $request->input('estate'),
            'remarks' => $request->input('remarks'),
        ]);

        return $awardee;
    }

    public function destroy(string $id)
    {
        return Awardee::destroy($id);
    }
}
