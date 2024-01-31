<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Stock extends Model
{
    use HasFactory;

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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
