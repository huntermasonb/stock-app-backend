<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StockController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/dashboard', [StockController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

//Routes for User Model
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Routes for Stock Model
Route::middleware('auth')->group(function () {
    Route::delete('/stock', [StockController::class, 'destroy'])->name('stock.destroy');
    Route::post('/saveData', [StockController::class, 'store'])->middleware('verified');
});

//Routes for Group Model
Route::middleware('auth')->group(function () {
    Route::get('/groups', [GroupController::class, 'index'])->name('group.index');
    Route::get('/groups/create', [GroupController::class, 'create'])->name('group.create');
    Route::post('/groups/store', [GroupController::class, 'store'])->name('group.store');
    Route::patch('/groups/edit/{group_id}', [GroupController::class, 'update'])->name('group.update');
    Route::delete('/groups/destroy/{group_id}', [GroupController::class, 'destroy'])->name('group.destroy');
    Route::get('/groups/{group_id}', [GroupController::class, 'show'])->name('group.show');
});
require __DIR__.'/auth.php';
