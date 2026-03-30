<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FormTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class FormSubmissionController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function store(Request $request, FormTemplate $template)
    {
        $template->submissions()->create([
            'data' => $request->all(),
            'submitted_at' => now(),
        ]);

        return Response::json(['success' => true]);
    }
}
