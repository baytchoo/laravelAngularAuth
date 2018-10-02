<?php

Route::group([

    'middleware' => 'api',

], function ($router) {

    // authentication & registration -----------------------------------------
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('sendpasswordresetlink', 'ResetPasswordController@sendEmail');
    Route::post('resetpassword', 'ChangePasswordController@process');

    // init permissions--------------------------------------------------------
    // Route::get('init', 'AssignController@init');

    // client------------------------------------------------------------------
    
    // master--------------
    Route::group(['middleware' => ['permission:module_client_master']], function () {
        Route::resource('clients' , 'Client\ClientController' , [ 'except' => ['create' , 'edit']]);
    });

    // // read--------------
    // Route::group(['middleware' => ['permission:module_client_read',]], function () {
        Route::resource('clients' , 'Client\ClientController' , [ 'only' => ['index' , 'show']]);
    // });
    
    // // product------------------------------------------------------------------
    
    // // master--------------
    // Route::group(['middleware' => ['permission:module_product_master']], function () {
    //     Route::resource('products' , 'Product\ProductController' , [ 'except' => ['create' , 'edit']]);
    // });
    
    // // read--------------
    // Route::group(['middleware' => ['permission:module_product_read']], function () {
    //     Route::resource('products' , 'Product\ProductController' , [ 'only' => ['index' , 'show']]);
    // });
    

});
