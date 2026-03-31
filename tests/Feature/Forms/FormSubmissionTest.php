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

test('fails validation when textarea is below min length', function () {
    $template = FormTemplate::create([
        'name' => 'Test Form',
        'schema' => [
            'fields' => [
                ['name' => 'message', 'type' => 'textarea', 'required' => true, 'min' => 5],
            ],
        ],
    ]);

    $response = $this->post("/templates/{$template->id}/submissions", [
        'message' => 'hey',
    ]);

    $response->assertSessionHasErrors('message');

    $this->assertDatabaseCount('form_submissions', 0);
});

test('fails validation when textarea exceeds max length', function () {
    $template = FormTemplate::create([
        'name' => 'Test Form',
        'schema' => [
            'fields' => [
                ['name' => 'message', 'type' => 'textarea', 'required' => true, 'max' => 5],
            ],
        ],
    ]);

    $response = $this->post("/templates/{$template->id}/submissions", [
        'message' => 'hello world',
    ]);

    $response->assertSessionHasErrors('message');

    $this->assertDatabaseCount('form_submissions', 0);
});

test('submits when textarea is within min and max length', function () {
    $template = FormTemplate::create([
        'name' => 'Test Form',
        'schema' => [
            'fields' => [
                ['name' => 'message', 'type' => 'textarea', 'required' => true, 'min' => 5, 'max' => 20],
            ],
        ],
    ]);

    $response = $this->post("/templates/{$template->id}/submissions", [
        'message' => 'hello there',
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('form_submissions', [
        'form_template_id' => $template->id,
    ]);
});

test('allows nullable textarea to be omitted', function () {
    $template = FormTemplate::create([
        'name' => 'Test Form',
        'schema' => [
            'fields' => [
                ['name' => 'message', 'type' => 'textarea', 'required' => false],
            ],
        ],
    ]);

    $response = $this->post("/templates/{$template->id}/submissions", []);

    $response->assertStatus(200);

    $this->assertDatabaseHas('form_submissions', [
        'form_template_id' => $template->id,
    ]);
});
