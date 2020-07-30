export default {
  MONGO_HOSTNAME: process.env.MONGO_HOSTNAME || 'localhost',
  MONGO_DB: process.env.MONGO_DB || 'LAM_Industries',
  MONGO_PORT: process.env.MONGO_PORT || '27017',
  SERVER_PORT: process.env.SERVER_PORT || '5000',
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/LAM_Industries',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  JWT_SECRET: process.env.JWT_SECRET || 'LAMMAL',
};
