// src/auth/basic-auth.js

// Configure HTTP Basic Auth strategy for Passport, see:
// https://github.com/http-auth/http-auth-passport

import { basic } from 'http-auth';
import { authenticate } from 'passport';
import authPassport from 'http-auth-passport';

// We expect HTPASSWD_FILE to be defined.
if (!process.env.HTPASSWD_FILE) {
  throw new Error('missing expected env var: HTPASSWD_FILE');
}

export function strategy()  // For our Passport authentication strategy, we'll look for a
  // username/password pair in the Authorization header.
  {     return authPassport(
    basic({
      file: process.env.HTPASSWD_FILE,
    })
  );     }

export function authenticate() { return authenticate('http', { session: false }); }