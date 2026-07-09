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
        Schema::table('wedding_settings', function (Blueprint $table) {
            $table->string('hero_eyebrow')->default('Nos casamos');
            $table->string('hero_scroll_hint')->default('Desliza');
            $table->string('countdown_eyebrow')->default('Cuenta regresiva');
            $table->string('countdown_heading')->default('Faltan para el gran día');
            $table->text('cta_heading')->default('Con la bendición de Dios y de nuestras familias, queremos compartir contigo este momento.');
            $table->text('cta_paragraph')->default('Tu presencia hará de este día un recuerdo aún más especial. Con todo nuestro cariño, esperamos contar contigo.');
            $table->string('cta_button_label')->default('Confirmar asistencia');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('wedding_settings', function (Blueprint $table) {
            $table->dropColumn([
                'hero_eyebrow',
                'hero_scroll_hint',
                'countdown_eyebrow',
                'countdown_heading',
                'cta_heading',
                'cta_paragraph',
                'cta_button_label',
            ]);
        });
    }
};
