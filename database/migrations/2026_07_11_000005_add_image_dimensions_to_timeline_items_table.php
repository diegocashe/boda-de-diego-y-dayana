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
            $table->unsignedInteger('image_width')->nullable()->after('video_poster_path');
            $table->unsignedInteger('image_height')->nullable()->after('image_width');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('timeline_items', function (Blueprint $table) {
            $table->dropColumn(['image_width', 'image_height']);
        });
    }
};
