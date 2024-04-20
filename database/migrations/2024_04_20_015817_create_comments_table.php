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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stone_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('content');
            $table->boolean('active')->default(true);
            $table->boolean('abuse')->default(false);
            $table->string('moderation_status')->default('pending')->index(); // could be pending, approved, rejected
            $table->unsignedInteger('report_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign(['comments_stone_id_foreign']);  // Drop the foreign key and index for 'stone_id'
            $table->dropForeign(['comments_user_id_foreign']);   // Drop the foreign key and index for 'user_id'
            $table->dropIndex(['comments_moderation_status_index']);  // Explicitly drop index if created
        });

        Schema::dropIfExists('comments');
    }
};
