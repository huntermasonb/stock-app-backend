<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Create multiple columns within the stocks table, and a foreign key for referencing the user who saved the stock
     */
    public function up(): void
    {
        Schema::table('stocks', function (Blueprint $table) {
            $table->string('name');
            $table->string('symbol');
            $table->float('price');
            $table->float('beta');
            $table->float('EPS');
            $table->string('price_to_earnings')->nullable();
            $table->float('dividend_yield')->nullable();
            $table->string('dividend_date')->nullable();
            $table->float('dividend_per_share')->nullable();
            $table->integer('rating_strong_buy')->nullable();
            $table->integer('rating_buy')->nullable();
            $table->integer('rating_hold')->nullable();
            $table->integer('rating_sell')->nullable();
            $table->integer('rating_strong_sell')->nullable();
            $table->foreignId('user_id')->constrained(
                table: 'users', indexName: 'id'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks_table_columns');
    }
};
