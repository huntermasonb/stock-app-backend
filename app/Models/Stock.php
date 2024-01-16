<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Stock extends Model
{
    use HasFactory;

//    /**
//     * Default values for all stock attributes
//     *
//     * @var array<int, string>
//     **/
//    protected $attributes = [
//        'name' => '',
//        'symbol' => '',
//        'price' => 0,
//        'beta' => 0,
//        'EPS' => 0,
//        'price_to_earnings' => 0,
//        'dividend_yield' => '',
//        'dividend_date' => '',
//        'dividend_per_share' => 0
//    ];

    /**
     * Attributes that are mass assignable
     *
     * @var array<int, string>
     **/
    protected $fillable = [
        'created_at',
        'updated_at',
        'name',
        'symbol',
        'price',
        'beta',
        'EPS',
        'price_to_earnings',
        'dividend_yield',
        'dividend_date',
        'dividend_per_share'
    ];
}
