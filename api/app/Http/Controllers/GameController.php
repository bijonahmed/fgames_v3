<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GameController extends Controller
{
    // Show the Enter Game form
    public function showForm()
    {
        return view('enter-game');
    }

    // Handle the form submission
    public function submitForm(Request $request)
    {
        dd($request->all());
        // Validate form input
        
    }
}
