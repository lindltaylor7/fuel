<?php

namespace App\Http\Controllers;

use App\Models\Fluid;
use Illuminate\Http\Request;

class FluidController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fluids = Fluid::with('vehicle')->get();
        return response()->json($fluids);
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
        $fluid = Fluid::create([
            "vehicle_id" => $request->get('vehicle_id'),
            "refrigerant" => $request->get('refrigerant'),
            "compressor" => $request->get('compressor'),
            "engine" => $request->get('engine'),
            "hydraulic" => $request->get('hydraulic'),
            "shift" => $request->get('shift'),
            "comments" => $request->get('comments')
        ]);

        return response()->json([
            'msg' => 'Successfully created'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Fluid  $fluid
     * @return \Illuminate\Http\Response
     */
    public function show(Fluid $fluid)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Fluid  $fluid
     * @return \Illuminate\Http\Response
     */
    public function edit(Fluid $fluid)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Fluid  $fluid
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Fluid $fluid)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Fluid  $fluid
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $fluid = Fluid::find($id);

        $fluid->delete();

        return response()->json([
            'msg' => 'Successfully created'
        ]);
    }
}
