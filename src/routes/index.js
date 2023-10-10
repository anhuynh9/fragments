// src/routes/index.js

// import { authenticate } from '../../src/auth/basic-auth';

/**
 * Expose all of our API routes on /v1/* to include an API version.
 * Protect them all so you have to be authenticated in order to access.
 */
router.use(`/v1`, authenticate(), require('./api'));

////////////////////////////////////////////////////////////////////

// src/routes/api/get.js

/**
 * Get a list of fragments for the current user
 */
export default (req, res) => {
  // TODO: this is just a placeholder to get something working
  res.status(200).json({
    status: 'ok',
    fragments: [],
  });
};