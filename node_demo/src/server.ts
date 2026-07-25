import { Server } from 'http';
import { app } from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import { env } from './config/env.js';

let server: Server;

// Connect to PostgreSQL and start HTTP Server
connectDB()
  .then(() => {
    server = app.listen(env.PORT, () => {
      console.log(`🚀 Employee Management API running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Server startup failed:', err);
    process.exit(1);
  });

// Graceful Shutdown Handler
const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\n⚠️ Received ${signal}. Starting graceful shutdown...`);

  if (server) {
    server.close(async () => {
      console.log('🛑 HTTP server closed.');
      await disconnectDB();
      console.log('👋 Process exiting gracefully.');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('❌ Forcefully shutting down server after timeout.');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason: any) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error('Reason:', reason);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (err: Error) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error('Error:', err);
  process.exit(1);
});
