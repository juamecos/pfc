<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('founds', function (Blueprint $table) {
            $table->string('country')->after('longitude'); // Adds a country field
            $table->string('city')->after('country');      // Adds a city field
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('founds', function (Blueprint $table) {
            $table->dropColumn(['country', 'city']);
        });
    }
};
