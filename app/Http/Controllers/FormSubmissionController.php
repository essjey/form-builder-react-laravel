<?php

namespace App\Http\Controllers;

use App\Models\FormTemplate;
use App\Services\FormSubmissionRules;
use Illuminate\Http\Request;

class FormSubmissionController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function store(Request $request, FormTemplate $template, FormSubmissionRules $rulesBuilder)
    {
        $rules = $rulesBuilder->build($template);

        $request->validate($rules);

        $template->submissions()->create([
            'data' => $request->all(),
            'submitted_at' => now(),
        ]);

        return redirect()->back();
    }
}
