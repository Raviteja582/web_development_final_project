const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    "mongodb+srv://demo:demo123@cluster0.0q3b1.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0",
};

export default config;
