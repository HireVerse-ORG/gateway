const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const userServerUrl = "http://localhost:5001";
const notificationServerUrl = "http://localhost:5002";
const jobServerUrl = "http://localhost:5003";
const profileServerUrl = "http://localhost:5004";
const paymentServerUrl = "http://localhost:5005";

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

// Proxy middleware for /api/user/*
app.use(
  "/api/notifications",
  createProxyMiddleware({
    target: notificationServerUrl,
    pathRewrite: (path, req) => path.replace("/", "/api/notifications/"),
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

// Proxy middleware for /api/profile/*
app.use(
  "/api/profile",
  createProxyMiddleware({
    target: profileServerUrl,
    pathRewrite: (path, req) => path.replace("/", "/api/profile/"),
    ...proxyOptions,
  })
);

// Proxy middleware for /api/payment/*
app.use(
  "/api/payment",
  createProxyMiddleware({
    target: paymentServerUrl,
    pathRewrite: (path, req) => path.replace("/", "/api/payment/"),
    ...proxyOptions,
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
