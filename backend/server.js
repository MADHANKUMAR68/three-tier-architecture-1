const express = require("express");
const client = require("prom-client");

const app = express();
const port = 3000;

// Create a Registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom HTTP request counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
});

register.registerMetric(httpRequestCounter);

app.get("/", (req, res) => {
  httpRequestCounter.inc();
  res.send("Three Tier DevOps Backend Running 🚀");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
