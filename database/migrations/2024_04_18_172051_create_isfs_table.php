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
        Schema::create('isfs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->date('bday');
            $table->string('civilStat');
            $table->integer('childQuan');
            $table->string('incomeBracket');
            $table->integer('brgy');
            $table->integer('zone');
            $table->integer('district');
            $table->string('typeLocation');
            $table->string('specLocation');
            $table->string('imgLoc')->nullable();
            $table->string('descLocation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('isfs');
    }
};
