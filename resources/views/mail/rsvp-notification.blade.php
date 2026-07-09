<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>Respuesta de confirmación de asistencia</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Mulish:wght@400;600;700&display=swap');

        body { margin: 0; padding: 0; width: 100%; -webkit-text-size-adjust: 100%; }
        table { border-collapse: collapse; }

        .serif { font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; }
        .sans { font-family: 'Mulish', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; }
    </style>
</head>
<body style="margin:0; padding:0; background-color:#f4efe4;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4efe4;">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%; max-width:560px;">

                    <tr>
                        <td align="center" style="padding:8px 0 24px;">
                            <div class="sans" style="font-size:11px; font-weight:700; letter-spacing:4px; text-transform:uppercase; color:#7a1f2b;">
                                Nueva confirmación de asistencia
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color:#fbf8f0; border:1px solid #d8b4ba; border-radius:18px; padding:32px 40px;">
                            <div class="serif" style="font-size:30px; font-weight:600; color:#3a342b; text-align:center;">
                                {{ $invitation->guest_name }}
                            </div>

                            <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:20px auto 0;">
                                <tr>
                                    <td style="background-color:{{ $invitation->attending ? '#eaf3ea' : '#f6eced' }}; border:1px solid {{ $invitation->attending ? '#a9c9ac' : '#d8b4ba' }}; border-radius:999px; padding:8px 22px;">
                                        <span class="sans" style="font-size:13px; font-weight:700; letter-spacing:1px; color:{{ $invitation->attending ? '#2e5c33' : '#7a1f2b' }};">
                                            {{ $invitation->attending ? 'Confirmó asistencia' : 'No podrá asistir' }}
                                        </span>
                                    </td>
                                </tr>
                            </table>

                            @if ($invitation->attending)
                                <p class="sans" style="font-size:15px; line-height:1.7; color:#6e6555; text-align:center; margin:22px 0 0;">
                                    Pases confirmados: <strong>{{ $invitation->confirmed_passes }}</strong> de {{ $invitation->max_passes }}
                                </p>

                                @if ($invitation->dietary)
                                    <p class="sans" style="font-size:14px; line-height:1.7; color:#6e6555; text-align:center; margin:8px 0 0;">
                                        Restricciones alimentarias: {{ $invitation->dietary }}
                                    </p>
                                @endif
                            @endif

                            @if ($invitation->message)
                                <p class="serif" style="font-size:17px; font-style:italic; line-height:1.6; color:#3a342b; text-align:center; margin:22px 0 0;">
                                    «{{ $invitation->message }}»
                                </p>
                            @endif

                            <p class="sans" style="font-size:12px; line-height:1.6; color:#9a9080; text-align:center; margin:26px 0 0;">
                                {{ $invitation->email ?? 'Sin correo registrado' }} · Código {{ $invitation->code }}
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:22px 0 0;">
                            <p class="sans" style="font-size:12px; color:#9a9080; margin:0;">
                                Boda de {{ $wedding->bride_name }} &amp; {{ $wedding->groom_name }}
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
