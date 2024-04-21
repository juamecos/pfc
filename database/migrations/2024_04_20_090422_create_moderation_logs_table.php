<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('moderation_logs', function (Blueprint $table) {
            $table->id();
            $table->morphs('moderatable');
            $table->unsignedBigInteger('action_by')->nullable();
            $table->string('action_taken');
            $table->text('reason');
            $table->timestamps();

            $table->foreign('action_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('moderation_logs');
    }
};

