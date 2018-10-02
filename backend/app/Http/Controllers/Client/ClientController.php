<?php

namespace App\Http\Controllers\Client;

use App\Client;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;

class ClientController extends ApiController
{


    // public function __constract() {

    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->showAll(Client::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules=[
            'name' => 'required',
            'address' => 'required',
        ];

        $this->validate($request, $rules);

        $newClient = Client::create($request->all());

        return $this->showOne($newClient, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        return $this->showOne($client);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,Client $client)
    {
        $client->fill($request->only([
            'name',
            'address',
        ]));

        if ($client->isClean()) {
            return $this->errorResponse('No changes detected to edit the resource!.', 422);
        }
        
        $client->save();

        return $this->showOne($client);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        $client->delete();
        
        return $this->showOne($client);
    }
}
