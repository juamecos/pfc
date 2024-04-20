<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Create the likes table.
 */
return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            /**
             * The id of the stone that is liked.
             * @var int
             */
            $table->foreignId('stone_id')->constrained()->onDelete('cascade');
            /**
             * The id of the user that likes the stone.
             * @var int
             */
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            // Explicitly drop foreign keys if necessary
            $table->dropForeign(['likes_stone_id_foreign']);  // Drops the foreign key on 'stone_id'
            $table->dropForeign(['likes_user_id_foreign']);   // Drops the foreign key on 'user_id'
        });

        Schema::dropIfExists('likes');
    }

};
