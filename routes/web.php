<?php

use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\FormTemplateController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';

Route::get('templates', [FormTemplateController::class, 'index']);
Route::get('templates/{template}', [FormTemplateController::class, 'show'])
    ->name('templates.show');
Route::get('templates/{template}/edit', [FormTemplateController::class, 'edit'])
    ->name('templates.edit');
Route::post('templates', [FormTemplateController::class, 'store']);
Route::put('templates/{template}', [FormTemplateController::class, 'update']);

Route::post('templates/{template}/submissions', [FormSubmissionController::class, 'store']);
