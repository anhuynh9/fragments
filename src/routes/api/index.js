const express = require('express');
const router = express.Router();
const contentType = require('content-type');
const { Fragment } = require('../../model/fragment'); // Import your Fragment class

// Define a raw body parser middleware
const rawBodyParser = express.raw({
  inflate: true,
  limit: '5mb',
  type: (req) => {
    const { type } = contentType.parse(req);
    return Fragment.isSupportedType(type);
  },
});

// POST /fragments route
router.post('/fragments', rawBodyParser, (req, res) => {
  try {
    // Check if the user is authenticated (you can use Basic Auth or your preferred method)
    // For simplicity, we assume authentication here.

    // Parse the Content-Type header
    const { type } = contentType.parse(req);
    const debugInfo = `Received Content-Type: ${type}`;
    console.debug(debugInfo);

    // Check if the type is supported
    if (!Fragment.isSupportedType(type)) {
      const errorMessage = 'Unsupported Content-Type';
      console.warn(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    // Create a new fragment
    const fragment = new Fragment(req.body, type);
    console.info(`Created a new fragment with ID: ${fragment.getId()}`);

    // Respond with the fragment data
    res.status(201).json({
      id: fragment.getId(),
      created: fragment.getCreated(),
      type: fragment.getType(),
      // Add other properties as needed
      size: fragment.getSize(),
      ownerId: fragment.getOwnerId(),
    });

    // Set the Location header
    const fragmentUrl = new URL(`/fragments/${fragment.getId()}`, API_URL);
    res.setHeader('Location', fragmentUrl.toString());
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
