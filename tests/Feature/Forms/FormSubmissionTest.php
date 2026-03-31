<?php

use App\Models\FormTemplate;

test('submits a form submission', function () {
    $template = FormTemplate::create([
        'name' => 'Test Form',
        'schema' => [
            'fields' => [
                ['name' => 'email', 'type' => 'email', 'required' => true],
                ['name' => 'message', 'type' => 'textarea', 'required' => true],
            ],
        ],
    ]);

    $response = $this->post("/templates/{$template->id}/submissions", [
        'email' => 'test@test.com',
        'message' => 'hello',
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('form_submissions', [
        'form_template_id' => $template->id,
    ]);
});

test('fails validation when email is missing', function () {
    $template = FormTemplate::create([
        'name' => 'Test Form',
        'schema' => [
            'fields' => [
                ['name' => 'email', 'type' => 'email', 'required' => true],
                ['name' => 'message', 'type' => 'textarea', 'required' => true],
            ],
        ],
    ]);

    $response = $this->post("/templates/{$template->id}/submissions", [
        'message' => 'hello',
    ]);

    $response->assertSessionHasErrors('email');

    $this->assertDatabaseCount('form_submissions', 0);
});
