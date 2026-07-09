<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | La app es un monolito Inertia servido desde un único origen, así que
    | esto solo aplica a las rutas api/* (si se añaden en el futuro) y al
    | endpoint de Sanctum. No es necesario para el dashboard ni el flujo de
    | invitación/RSVP, que siempre se sirven desde el mismo dominio.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_filter(explode(',', (string) env('CORS_ALLOWED_ORIGINS', env('APP_URL', '')))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
