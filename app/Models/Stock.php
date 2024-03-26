<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'dividend_per_share',
        'rating_strong_buy',
        'rating_buy',
        'rating_hold',
        'rating_sell',
        'rating_strong_sell'
    ];
    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function group(): HasMany
    {
        return $this->hasMany(Group::class);
    }
}
