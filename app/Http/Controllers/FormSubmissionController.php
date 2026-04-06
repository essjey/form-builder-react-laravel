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

            if (! empty($field['required'])) {
                $fieldRules[] = 'required';
            } else {
                $fieldRules[] = 'nullable';
            }

            if ($field['type'] === 'email') {
                $fieldRules[] = 'email';
            }

            if ($field['type'] === 'checkbox' && ! empty($field['required'])) {
                $fieldRules[] = 'accepted';
            } elseif ($field['type'] === 'checkbox') {
                $fieldRules[] = 'boolean';
            }

            /**
             * @todo Validation to add
             *
             * date support
             * multiselect support
             */
            if (in_array($field['type'], ['text', 'textarea'])) {
                $fieldRules[] = 'string';

                if (isset($field['min'])) {
                    $fieldRules[] = "min:{$field['min']}";
                }

                if (isset($field['max'])) {
                    $fieldRules[] = "max:{$field['max']}";
                }
            }

            $rules[$field['name']] = $fieldRules;
        }

        $request->validate($rules);

        $template->submissions()->create([
            'data' => $request->all(),
            'submitted_at' => now(),
        ]);

        // return Response::json(['success' => true]);
        redirect()->back();
    }
}
