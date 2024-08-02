<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class StockServices
{
    /**
     * Validate Stock Data. Mainly for checking the data before trying to send it to the database.
     *
     * This was originally in the `StockController` but I needed to use it in the `GroupController` as well.
     * I figured best practice would be to create a service class for ease of maintenance and re-use.
     *
     * @param $data
     * @return array
     *
     * @throws ValidationException
     */
    public function validateStockData($data): array
    {
        $rules = [
            'name' => 'required|string',
            'symbol' => 'required|string',
            'price' => 'required|numeric',
            'beta' => 'required|numeric',
            'EPS' => 'required|numeric',
            'price_to_earnings' => 'nullable|string',
            'dividend_yield' => 'nullable|string',
            'dividend_date' => 'nullable|string',
            'dividend_per_share' => 'nullable|string',
            'rating_strong_buy' => 'nullable|numeric',
            'rating_buy' => 'nullable|numeric',
            'rating_hold' => 'nullable|numeric',
            'rating_sell' => 'nullable|numeric',
            'rating_strong_sell' => 'nullable|numeric',
        ];

        if ($data instanceof Request) {
            return $data->validate($rules);
        }
        //If the data is not a request data type
        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            Log::error($validator->errors());
            throw new ValidationException($validator);
        } else {
            return $validator->validated();
        }
    }
}
