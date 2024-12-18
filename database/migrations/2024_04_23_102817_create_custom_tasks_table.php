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
        Schema::create('custom_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('frequency', ['daily', 'weekly']);
            $table->integer('repetition');
            $table->integer('ilvl');
            $table->foreignId('icon_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_tasks');
    }
};
