/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // When running locally in development mode, we use the built-in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  serverBuildPath: "api/index.js",
  future: {
    unstable_tailwind: true,
  },
  watchPaths: ['../../packages/ui', './components'],
  appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
};
