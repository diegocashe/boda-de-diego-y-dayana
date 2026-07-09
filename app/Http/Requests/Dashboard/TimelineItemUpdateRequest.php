<?php

namespace App\Http\Requests\Dashboard;

class TimelineItemUpdateRequest extends TimelineItemStoreRequest
{
    // Mismas reglas que la creación; la imagen siempre es opcional porque
    // conservar la actual es el caso común al editar.
}
