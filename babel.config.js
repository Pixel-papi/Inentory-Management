module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Tell Expo/React to use NativeWind's JSX transform
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      // Enable NativeWind
      "nativewind/babel",
    ],
  };
};
