<?php

namespace App\Http\Controllers;

use App\Models\FormTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FormTemplate::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display Template Editor
     */
    public function edit(FormTemplate $template)
    {
        return Inertia::render('Templates/Edit', [
            'template' => $template,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(FormTemplate $template)
    {
        return Inertia::render('Templates/Show', [
            'template' => $template,
        ]);
    }

    public function update(Request $request, FormTemplate $template)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'schema' => ['required', 'array'],
            'schema.fields' => ['required', 'array'],
        ]);

        $template->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'schema' => $validated['schema'],
        ]);

        return redirect()->route('templates.edit', $template);
    }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(string $id)
    // {
    //     //
    // }
}
