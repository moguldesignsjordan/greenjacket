package com.stackbotglobal.driver;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.SharedPreferences;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    // ── Bump this version any time you change channel settings ──────────
    // v5: Initial channel setup for driver app — synced with backend
    //     notifications.js CHANNELS config.
    //   - stackbot_orders_v5  (new delivery available — notification_delivery sound)
    //   - stackbot_default_v5 (status updates, support — system default sound)
    private static final int CHANNEL_VERSION = 5;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createNotificationChannels();
    }

    private void createNotificationChannels() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;

        SharedPreferences prefs = getSharedPreferences("stackbot_channels", MODE_PRIVATE);
        int savedVersion = prefs.getInt("channel_version", 0);

        NotificationManager manager = getSystemService(NotificationManager.class);
        if (manager == null) return;

        if (savedVersion < CHANNEL_VERSION) {
            tryDeleteChannel(manager, "orders");
            tryDeleteChannel(manager, "default");
            tryDeleteChannel(manager, "stackbot_orders");
            tryDeleteChannel(manager, "stackbot_default");
            tryDeleteChannel(manager, "stackbot_delivery");
            tryDeleteChannel(manager, "stackbot_orders_v2");
            tryDeleteChannel(manager, "stackbot_orders_v3");
            tryDeleteChannel(manager, "stackbot_orders_v4");
            tryDeleteChannel(manager, "stackbot_default_v2");
            tryDeleteChannel(manager, "stackbot_default_v3");
            tryDeleteChannel(manager, "stackbot_default_v4");

            prefs.edit().putInt("channel_version", CHANNEL_VERSION).apply();
        }

        AudioAttributes audioAttrs = new AudioAttributes.Builder()
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .setUsage(AudioAttributes.USAGE_NOTIFICATION_EVENT)
                .build();

        // ═══════════════════════════════════════════════════════════════
        //  ORDERS CHANNEL (v5) — New delivery available alerts
        //  Backend: CHANNELS.order.id = "stackbot_orders_v5"
        //  Sound:   notification_delivery.mp3
        // ═══════════════════════════════════════════════════════════════
        NotificationChannel ordersChannel = new NotificationChannel(
                "stackbot_orders_v5",
                "Entregas Disponibles / Available Deliveries",
                NotificationManager.IMPORTANCE_HIGH
        );
        ordersChannel.setDescription("Alertas cuando hay una nueva entrega disponible");
        ordersChannel.enableVibration(true);
        ordersChannel.setVibrationPattern(new long[]{0, 600, 200, 600, 200, 400});
        ordersChannel.enableLights(true);
        ordersChannel.setLightColor(0xFF55529D);
        ordersChannel.setLockscreenVisibility(android.app.Notification.VISIBILITY_PUBLIC);
        ordersChannel.setShowBadge(true);
        ordersChannel.setSound(
                Uri.parse("android.resource://" + getPackageName() + "/raw/notification_delivery"),
                audioAttrs
        );
        manager.createNotificationChannel(ordersChannel);

        // ═══════════════════════════════════════════════════════════════
        //  DEFAULT CHANNEL (v5) — Everything else
        //  Backend: CHANNELS.default.id = "stackbot_default_v5"
        //  Sound:   system default
        // ═══════════════════════════════════════════════════════════════
        NotificationChannel defaultChannel = new NotificationChannel(
                "stackbot_default_v5",
                "Notificaciones / Notifications",
                NotificationManager.IMPORTANCE_HIGH
        );
        defaultChannel.setDescription("Estado de entregas, soporte y anuncios");
        defaultChannel.enableVibration(true);
        defaultChannel.setVibrationPattern(new long[]{0, 300, 200, 300});
        defaultChannel.enableLights(true);
        defaultChannel.setLightColor(0xFF55529D);
        defaultChannel.setLockscreenVisibility(android.app.Notification.VISIBILITY_PUBLIC);
        defaultChannel.setShowBadge(true);
        defaultChannel.setSound(
                RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION),
                null
        );
        manager.createNotificationChannel(defaultChannel);
    }

    private void tryDeleteChannel(NotificationManager manager, String channelId) {
        try {
            manager.deleteNotificationChannel(channelId);
        } catch (Exception ignored) {}
    }
}