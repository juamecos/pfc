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
        Schema::create('founds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stone_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->float('latitude');
            $table->float('longitude');
            // Specify geometry type, SRID, and an explicit name for the spatial index
            $table->geometry('location', 'POINT', 4326);
            $table->spatialIndex('location', 'found_location_spatialindex');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('founds', function (Blueprint $table) {
            $table->dropSpatialIndex(['location']);
            $table->dropForeign(['founds_stone_id_index']); // Drop the foreign key constraint for 'stone_id'
            $table->dropForeign(['founds_user_id_index']);  // Drop the foreign key constraint for 'user_id'

        });

        Schema::dropIfExists('founds');
    }

};