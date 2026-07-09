<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('timeline_items', function (Blueprint $table) {
            $table->string('video_path')->nullable()->after('image_path');
            $table->string('video_poster_path')->nullable()->after('video_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('timeline_items', function (Blueprint $table) {
            $table->dropColumn(['video_path', 'video_poster_path']);
        });
    }
};
