module.exports = ({ config }) => {
    return {
      ...config,
      android: {
        adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.crunchiesonline.customerapp",
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? config.android.googleServicesFile,
      },
      ios: {
        bundleIdentifier: "com.crunchiesonline.crunchies.customers",
        googleServicesFile: process.env.GOOGLE_SERVICES_PLIST ?? config.ios.googleServicesFile,
        supportsTablet: true,
      },
    };
  };
  