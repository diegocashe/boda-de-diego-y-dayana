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
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->string('guest_name');
            $table->string('email')->nullable();
            $table->string('code')->unique();
            $table->unsignedInteger('max_passes')->default(1);
            $table->boolean('attending')->nullable();
            $table->unsignedInteger('confirmed_passes')->nullable();
            $table->text('dietary')->nullable();
            $table->text('message')->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->boolean('is_locked')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
