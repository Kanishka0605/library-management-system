// Configuration file for server-wide constants and secrets
// Uses environment variables when available, otherwise falls back to defaults

const DEFAULT_MONGO = 'mongodb+srv://kanishkanaik40_db_user:Uf5fOQjZwPPQBgUL@cluster0.nkxqksz.mongodb.net/library?retryWrites=true&w=majority';

module.exports = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || DEFAULT_MONGO,
  JWT_SECRET: process.env.JWT_SECRET || 'replace_this_with_a_secure_secret',
};
