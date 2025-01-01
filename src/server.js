const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const userServerUrl = "http://localhost:5001";
const jobServerUrl = "http://localhost:5003";

const proxyOptions = {
  changeOrigin: true,
  logger: console,
};

// Proxy middleware for /api/user/*
app.use(
  "/api/user",
  createProxyMiddleware({
    target: userServerUrl,
    pathRewrite: (path, req) => path.replace("/", "/api/user/"),
    ...proxyOptions,
  })
);
// Proxy middleware for /api/jobs/*
app.use(
  "/api/jobs",
  createProxyMiddleware({
    target: jobServerUrl,
    pathRewrite: (path, req) => path.replace("/", "/api/jobs/"),
    ...proxyOptions,
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
