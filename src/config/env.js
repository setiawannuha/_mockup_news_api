require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  APP_PORT: process.env.PORT || 3000,
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || '',
  DB_PASS: process.env.DB_PASS || '',
  DB_NAME: process.env.DB_NAME || 'db_news',
  DB_PORT: process.env.DB_PORT || 5432,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};
