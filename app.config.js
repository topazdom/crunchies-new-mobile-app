module.exports = ({ config }) => {
    return {
      ...config,
      android: {
        adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.crunchiesonline.customerapp",
      versionCode: 1,
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? config.android.googleServicesFile,
      }
    };
  };
  