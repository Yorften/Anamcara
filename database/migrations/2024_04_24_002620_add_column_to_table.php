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
        Schema::table('custom_tasks', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('custom_tasks', function (Blueprint $table) {
            $table->dropForeign('custom_tasks_user_id_foreign');
            $table->dropColumn('user_id');      
        });
    }
};
