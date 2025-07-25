import 'dotenv/config';

export default {
  expo: {
    name: "troodie",
    slug: "troodie",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/troodie_icon_logo.jpg",
    scheme: "troodie",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.troodie.troodie.com",
      buildNumber: "3",
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "Troodie uses your location to show nearby restaurants and recommendations.",
        NSCameraUsageDescription: "Troodie uses your camera to take photos of restaurants and food.",
        NSPhotoLibraryUsageDescription: "Troodie uses your photo library to select images for posts."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/troodie_icon_logo.jpg",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/troodie_icon_logo.jpg",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ],
      "expo-font"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: "68397d45-255f-4b4c-ba93-d51a044ddfb2"
      }
    }
  }
};