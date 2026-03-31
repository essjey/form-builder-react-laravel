<?php

namespace App\Http\Controllers;

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
        $rules = [];

        foreach ($template->schema['fields'] as $field) {
            $fieldRules = [];

            if (!empty($field['required'])) {
                $fieldRules[] = 'required';
            }

            if ($field['type'] === 'email') {
                $fieldRules[] = 'email';
            }

            $rules[$field['name']] = $fieldRules;
        }

        $request->validate($rules);

        $template->submissions()->create([
            'data' => $request->all(),
            'submitted_at' => now(),
        ]);

        return Response::json(['success' => true]);
    }
}
