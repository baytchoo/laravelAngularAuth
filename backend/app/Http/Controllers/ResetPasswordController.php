<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;

class ResetPasswordController extends Controller
{
    public function sendEmail() {
    	if (!$this->validateEmail(request()->email)) {
    		return $this->failedResponse();
    	}
    	$this->send(request()->email);
    	return $this->successResponse();
    }

    public function send($email) {

    	$token = $this->createToken($email);

    	Mail::to($email)->send(new ResetPasswordMail($token));
    }

    private function validateEmail($email) {
    	return !!User::where('email', $email)->first();
    }

    private function createToken($email) {
    	$oldToken = DB::table('password_resets')->where('email', $email)->first();
    	if($oldToken) {
            Log::info($oldToken->token);
    		return $oldToken->token;
    	}
    	$token = str_random(60);
    	$this->saveToken($token, $email);
    	return $token;
    }

    private function saveToken($token, $email) {
    	DB::table('password_resets')->insert([
    		'email' => $email,
    		'token' => $token,
    		'created_at' => Carbon::now(),

    	]);
    }

    private function failedResponse() {
    	return response()->json([
    		'error' => 'Email does\'t exist'
    	], response::HTTP_NOT_FOUND);
    }

    private function successResponse() {
    	return response()->json([
    		'data' => 'Reset-Email was send'
    	], response::HTTP_OK);
    }
}
