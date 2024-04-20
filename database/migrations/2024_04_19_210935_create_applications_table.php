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
        Schema::create('guild_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->boolean('in_server');
            $table->string('server')->nullable();
            $table->string('description');
            $table->string('roster_image');
            $table->string('experience');
            $table->string('play_time');
            $table->boolean('gvg');
            $table->string('gve');
            $table->string('server_expectations');
            $table->string('inquiry_source');
            $table->string('additional_info')->nullable();
            $table->string('guild_cooldown')->nullable();
            $table->string('acquaintances')->nullable();
            $table->boolean('accepted');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
