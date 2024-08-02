<?php

namespace App\Http\Controllers;

use App\Services\StockServices;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Stock;
use function Laravel\Prompts\error;

//TO DO: REVAMP THIS CONTROLLER TO STORE STOCKS ITSELF, AND ACTUALLY HAVE VALIDATION. I WAS A NOOB.

class StockController extends Controller
{
    /**
     * Build constructor for StockServices to reference validateStockData function
     */
    private StockServices $stockServices;
    public function __construct(StockServices $stockServices){
        $this->stockServices = $stockServices;
    }

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
     * Store a newly created stock and fire the create method to save the entry
     */
    // TODO: correct the returns in this file to actually take users back to the correct page.
    public function store(Request $request) : \Illuminate\Http\JsonResponse
    {
        //Store the data from React components for future use.
        $validatedData = $this->stockServices->validateStockData($request);
        $combinedData = $validatedData;

        //Check to see if the stock exists, user is logged in, and trigger the Update method if so
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
        $stock = $user->stocks()->findOrFail($stockID);

        if ($stock && $stock->exists()){
            $stock->delete();
        } else {
            error("An error occurred when deleting the last stock.");
        }
    }
}
