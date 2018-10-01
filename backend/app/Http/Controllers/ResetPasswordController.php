<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\User;
use Illuminate\Http\Request;
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
    	Mail::to($email)->send(new ResetPasswordMail());
    }

    public function validateEmail($email) {
    	return !!User::where('email', $email)->first();
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
