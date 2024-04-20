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
        Schema::create('stones', function (Blueprint $table) {
            $table->id(); // Automatically creates a primary key and indexes it
            $table->string('image');
            $table->string('title');
            $table->string('description')->nullable();
            $table->float('latitude');
            $table->float('longitude');
            $table->boolean('active')->default(true);
            $table->boolean('abuse')->default(false);
            $table->string('code')->unique(); // Unique index is automatically named `stones_code_unique`
            $table->unsignedBigInteger('user_id');
            // When adding a foreign key, it's common to also add an index for the foreign key column
            // Laravel conventionally uses `table_column_name_foreign` for foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->index('user_id', 'stones_user_id_index');

            $table->string('moderation_status')->default('pending');
            $table->integer('report_count');

            // Specify geometry type, SRID, and an explicit name for the spatial index
            $table->geometry('location', 'POINT', 4326);
            $table->spatialIndex('location', 'stones_location_spatialindex');
            $table->timestamps();
        });
    }

    /*


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stones', function (Blueprint $table) {
            $table->dropSpatialIndex(['location']); // Drop the spatial index
            $table->dropIndex(['stones_code_unique']); // Drop the index for 'code'
            $table->dropForeign(['stones_user_id_index']); // Drop the foreign key constraint

        });

        Schema::dropIfExists('stones');
    }
};
