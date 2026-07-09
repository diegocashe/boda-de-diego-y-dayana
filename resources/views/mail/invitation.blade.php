<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>Invitación de boda</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Mulish:wght@400;600;700&display=swap');

        body { margin: 0; padding: 0; width: 100%; -webkit-text-size-adjust: 100%; }
        table { border-collapse: collapse; }
        img { border: 0; line-height: 100%; }

        .serif { font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; }
        .sans { font-family: 'Mulish', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; }

        @media only screen and (max-width: 620px) {
            .card-pad { padding-left: 24px !important; padding-right: 24px !important; }
            .name { font-size: 40px !important; }
        }
    </style>
</head>
<body style="margin:0; padding:0; background-color:#f4efe4;">
    <!-- Preheader oculto -->
    <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
        {{ $wedding->bride_name }} y {{ $wedding->groom_name }} te invitan a su boda · Confirma tu asistencia
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4efe4; background-image:radial-gradient(120% 90% at 50% 0%, #fbf8f0 0%, #f4efe4 60%);">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px;">

                    <!-- Cabecera -->
                    <tr>
                        <td align="center" style="padding:12px 0 28px;">
                            <div class="sans" style="font-family:'Mulish',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; font-size:11px; font-weight:700; letter-spacing:6px; text-transform:uppercase; color:#7a1f2b;">
                                Nos casamos
                            </div>
                            <div class="serif name" style="font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif; font-size:52px; line-height:1; font-weight:600; color:#3a342b; padding-top:18px;">
                                {{ $wedding->groom_name }}
                            </div>
                            <div class="serif" style="font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif; font-size:28px; font-style:italic; color:#a98a5b; line-height:1.2;">
                                &amp;
                            </div>
                            <div class="serif name" style="font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif; font-size:52px; line-height:1; font-weight:600; color:#3a342b;">
                                {{ $wedding->bride_name }}
                            </div>

                            <!-- Separador línea · rombo · línea -->
                            <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin-top:22px;">
                                <tr>
                                    <td style="width:56px; height:1px; background-color:#e7c6a8; font-size:0; line-height:0;">&nbsp;</td>
                                    <td style="padding:0 12px; color:#7a1f2b; font-size:11px; line-height:1;">&#9670;</td>
                                    <td style="width:56px; height:1px; background-color:#e7c6a8; font-size:0; line-height:0;">&nbsp;</td>
                                </tr>
                            </table>

                            <div class="serif" style="font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif; font-size:22px; font-weight:500; color:#3a342b; padding-top:18px;">
                                {{ $wedding->wedding_at->locale('es')->isoFormat('dddd D [de] MMMM [de] YYYY, h:mm a') }}
                            </div>
                            <div class="sans" style="font-family:'Mulish',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#777063; padding-top:6px;">
                                {{ $wedding->city }}
                            </div>
                        </td>
                    </tr>

                    <!-- Tarjeta -->
                    <tr>
                        <td class="card-pad" style="background-color:#fbf8f0; border:1px solid #d8b4ba; border-radius:18px; padding:36px 44px;">
                            <div class="serif" style="font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif; font-size:26px; font-weight:600; color:#3a342b; text-align:center;">
                                ¡Hola, {{ $invitation->guest_name }}!
                            </div>

                            <p class="sans" style="font-family:'Mulish',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; font-size:15px; line-height:1.75; color:#6e6555; text-align:center; margin:18px 0 0;">
                                Con la bendición de Dios y de nuestras familias, queremos compartir contigo este momento tan especial. Tu presencia hará de este día un recuerdo inolvidable.
                            </p>

                            <!-- Pases -->
                            <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:24px auto 0;">
                                <tr>
                                    <td style="background-color:#f6eced; border:1px solid #d8b4ba; border-radius:999px; padding:8px 22px;">
                                        <span class="sans" style="font-family:'Mulish',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; font-size:13px; font-weight:700; letter-spacing:1px; color:#7a1f2b;">
                                            Tu invitación incluye {{ $invitation->max_passes }} {{ $invitation->max_passes === 1 ? 'pase' : 'pases' }}
                                        </span>
                                    </td>
                                </tr>
                            </table>

                            <!-- Botón -->
                            <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:28px auto 0;">
                                <tr>
                                    <td align="center" style="background-color:#7a1f2b; border-radius:999px;">
                                        <a href="{{ $rsvpUrl }}" class="sans" style="font-family:'Mulish',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; display:inline-block; padding:15px 38px; font-size:14px; font-weight:700; letter-spacing:1px; color:#f7f1e7; text-decoration:none; border-radius:999px;">
                                            Confirmar asistencia &nbsp;&rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p class="sans" style="font-family:'Mulish',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; font-size:12px; line-height:1.6; color:#9a9080; text-align:center; margin:22px 0 0;">
                                Este enlace es personal e intransferible; contiene tu código de invitado.
                            </p>
                        </td>
                    </tr>

                    <!-- Firma -->
                    <tr>
                        <td align="center" style="padding:30px 0 10px;">
                            <div class="serif" style="font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif; font-size:19px; font-style:italic; color:#6e6555;">
                                Con cariño,
                            </div>
                            <div class="serif" style="font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif; font-size:24px; font-weight:600; color:#7a1f2b; padding-top:4px;">
                                {{ $wedding->bride_name }} &amp; {{ $wedding->groom_name }}
                            </div>
                        </td>
                    </tr>

                    <!-- Enlace alternativo -->
                    <tr>
                        <td align="center" style="padding:18px 20px 0;">
                            <p class="sans" style="font-family:'Mulish',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; font-size:11px; line-height:1.6; color:#9a9080; margin:0;">
                                Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
                                <a href="{{ $rsvpUrl }}" style="color:#7a1f2b; word-break:break-all;">{{ $rsvpUrl }}</a>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
