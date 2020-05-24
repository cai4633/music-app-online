module.exports = {
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": resolve("src"),
      api: resolve("src/api")
    }
  }
};
