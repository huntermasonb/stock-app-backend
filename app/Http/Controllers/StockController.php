<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Routing\Controller;

use App\Models\Stock;
use App\Models\User;



class StockController extends Controller
{
    /**
     * Display all stocks saved by the user
     */
    public function index(Stock $stocks): Response
    {
        $user = auth()->user();
        $stocks = $user->stocks;
        return Inertia::render('Dashboard', [
            'stocks' => $stocks,
        ]);
    }

    /**
     * Create a new stock from the saved data
     */
    public function create(Array $data): Stock
    {
        //Create new stock instance and save the information to the database
        $stock = new Stock($data);
        auth()->user()->stocks()->save($stock);
        return $stock;
    }

    /**
     * Set parameters for stock entry in the database
     *
     **/
    public function validateStockData(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string',
            'symbol' => 'required|string',
            'price' => 'required|numeric',
            'beta' => 'required|numeric',
            'EPS' => 'required|numeric',
            'price_to_earnings' => 'required|numeric',
            'dividend_yield' => 'nullable|numeric',
            'dividend_date' => 'nullable|string',
            'dividend_per_share' => 'nullable|string'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        //Store the data from React components for future use.
        $validatedData = $this->validateStockData($request);

        $combinedData = $validatedData;

        $stock = $this->create($combinedData);
        return response()->json(['message'=>'Stock information was passed to Laravel']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
