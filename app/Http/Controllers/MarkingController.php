<?php

namespace App\Http\Controllers;

use App\Models\Marking;
use DateTime;
use Illuminate\Http\Request;

class MarkingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $markings = Marking::all();
        return response()->json($markings);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $marking = Marking::create([
            "vehicle_id" => $request->get('vehicle_id'),
            "fuel" => $request->get('fuel'),
            "performance" => $request->get('performance'),
            "date_estimated" => DateTime::createFromFormat('d/m/Y, H:i:s', $request->get('date_estimated'))
        ]);

        return response()->json([
            'msg' => 'Successfully created'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Marking  $marking
     * @return \Illuminate\Http\Response
     */
    public function show(Marking $marking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Marking  $marking
     * @return \Illuminate\Http\Response
     */
    public function edit(Marking $marking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Marking  $marking
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Marking $marking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Marking  $marking
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $marking = Marking::find($id);

        $marking->delete();

        return response()->json([
            'msg' => 'Successfully created'
        ]);
    }
}
