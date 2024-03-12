<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Stock;
use function Laravel\Prompts\alert;
use function Laravel\Prompts\error;

class StockController extends Controller
{
    /**
     * Display all stocks saved by the user
     */
    public function index(): Response
    {
        $stocks = auth()->user()->stocks;
        return Inertia::render('Dashboard', [
            'stocks' => $stocks,
        ]);
    }

    /**
     * Create a new stock (this should have been to re-direct to a view not an actual function)
     */
    public function create(Array $data): void
    {
            //Create new stock instance and save the information to the database
            $stock = new Stock($data);
            auth()->user()->stocks()->save($stock);
    }

    /**
     * Set parameters for stock entry in the database
     */
    public function validateStockData(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string',
            'symbol' => 'required|string',
            'price' => 'required|numeric',
            'beta' => 'required|numeric',
            'EPS' => 'required|numeric',
            'price_to_earnings' => 'nullable|string',
            'dividend_yield' => 'nullable|string',
            'dividend_date' => 'nullable|string',
            'dividend_per_share' => 'nullable|string'
        ]);
    }

    /**
     * Store a newly created stock and fire the create method to save the entry
     */
    public function store(Request $request) : \Illuminate\Http\JsonResponse
    {
        //Store the data from React components for future use.
        $validatedData = $this->validateStockData($request);
        $combinedData = $validatedData;

        //Check to see if the stock exists and trigger the Update method if so
        $stock = auth()->user()->stocks()->where('name', $combinedData['name'])->first();
        if ($stock && $stock->exists()){
            $stock->update($combinedData);
            return response()->json(['message'=>'Stock information was updated!']);
        }
        //Trigger Create method if stock doesn't exist to save data to the database
        else{
            $this->create($combinedData);
            return response()->json(['message'=>'Stock information was saved!']);
        }
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
     * Update already bookmarked stock in the database
     */
    public function update(Request $request) : Void
    {
        $stock = $this->validateStockData($request);
        //Authorize the user is signed in and update the existing entry in the database
        auth()->user()->stocks()->where('name',$stock['name'])->update();
    }

    /**
     * Remove the stock from User's saved stocks.
     */
    public function destroy(Request $request)
    {
        //Extract the stock id from the request to be used in delete method
        $stockID = $request->input('id');

        //Authorize the user is logged in and remove specified stock using data from dashboard.jsx
        $user = auth()->user();
        $stock = $user->stocks()->where('id',$stockID);

        if ($stock && $stock->exists()){
            $stock->delete();
        } else {
            error("An error occurred when deleting the last stock.");
        }
    }
}
