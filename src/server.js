// src/server.js

// We want to gracefully shutdown our server
const stoppable = require('stoppable');

// Get our logger instance
const logger = require('./logger');

// Get our express app instance
const app = require('./app');

const express = require('express');
const PORT = process.env.PORT || 8080; // Use a default port or specify one in the environment variables
const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

app.use(express.json());

//

// Get the desired port from the process environment. Default to `8080`
const port = parseInt(8080, 10);
//process.env.PORT || 8080, 10
// Start a server listening on this port
const server = stoppable(
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
);

// Export our server instance so other parts of our code can access it if necessary.
module.exports = server;