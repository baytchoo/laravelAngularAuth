<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\ApiController;
use App\Product;
use Illuminate\Http\Request;

class ProductController extends ApiController
{
    public function __constract() {

        $this->middleware('role:admin');
        $this->middleware('role:manager',['except' => ['update', 'destroy']]);
        $this->middleware('role:office', [ 'only' => ['index' , 'show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->showAll(Product::all());
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
            'model' => 'required',
            'category' => 'required',
        ];

        $this->validate($request, $rules);

        $newproduct = Product::create($request->all());

        return $this->showOne($newproduct, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return $this->showOne($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,Product $product)
    {
        $product->fill($request->only([
            'model',
            'category',
        ]));

        if ($product->isClean()) {
            return $this->errorResponse('No changes detected to edit the resource!.', 422);
        }
        
        $product->save();

        return $this->showOne($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        
        return $this->showOne($product);
    }
}
