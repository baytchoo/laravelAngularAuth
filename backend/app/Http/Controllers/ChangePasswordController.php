<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request){
    	// return $this->getPasswordFromDB()->get();
    	return $this->getPasswordFromDB($request)->count()>0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }

    private  function getPasswordFromDB($request) {
    	return DB::table('password_resets')->where([
    		'email' => $request->email,
    		'token' => $request->resetToken
    	]);
    }

    private function tokenNotFoundResponse() {
    	return response()->json(['error' => 'Email is false'], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function changePassword($request) {
    	$user = User::whereEmail( $request->email)->first();
    	$user->update(['password'=> $request->password]);
    	$this->getPasswordFromDB($request)->delete();
    	return response()->json(['data' => 'Password successfully changed'], Response::HTTP_CREATED);
    }
}
