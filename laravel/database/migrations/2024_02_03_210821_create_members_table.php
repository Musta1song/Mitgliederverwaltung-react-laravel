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
        Schema::create('members', function (Blueprint $table) {
            $table->increments('id');
            $table->string('FirstName');
            $table->string('SecondName');
            $table->date('BirthDate');
            $table->integer('MemberId');
            $table->double('MembershipFee');
            $table->string('role')->nullable();
            $table->date('EntryDate');
            $table->date('ExitDate')->nullable();
            $table->boolean('isActive')->nullable();
            
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
