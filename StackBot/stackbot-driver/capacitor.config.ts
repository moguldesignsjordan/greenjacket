import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stackbotglobal.driver',
  appName: 'StackBot Conductor',

  server: {
    url: 'https://stackbotglobal.com/driver',
    cleartext: false,
  },

  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['google.com', 'apple.com'],
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    Camera: {
      quality: 80,
    },
    Geolocation: {
      // iOS background location updates for active deliveries
    },
  },

  ios: {
    scheme: 'StackBot Conductor',
    backgroundColor: '#55529d',
  },

  android: {
    backgroundColor: '#55529d',
    allowMixedContent: false,
  },
};

export default config;
