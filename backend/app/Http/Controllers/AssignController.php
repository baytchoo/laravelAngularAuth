<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AssignController extends Controller
{

	public function init() {
		// Role::create(['name' => 'admin']);
	 //    Role::create(['name' => 'commerciale']);
	 //    Role::create(['name' => 'marketing']);

	    Permission::create(['name' => 'module_client_read']);
	    Permission::create(['name' => 'module_client_master']);
	    Permission::create(['name' => 'module_product_read']);
	    Permission::create(['name' => 'module_product_master']);

	    // return Permission::all()->pluck('name');
	    Role::findByName('admin')->givePermissionTo(Permission::all()->pluck('name'));
	    Role::findByName('commerciale')->givePermissionTo('module_client_master','module_product_read');
	    Role::findByName('marketing')->givePermissionTo('module_product_master','module_client_read');

	    User::find(1)->assignRole('admin');
    	User::find(2)->assignRole('commerciale');
    	User::find(3)->assignRole('marketing');
	}


}
