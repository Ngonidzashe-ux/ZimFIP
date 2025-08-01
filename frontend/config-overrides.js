module.exports = function override(config) {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-typescript", "@babel/preset-react"],
    },
  });
  return config;
};
