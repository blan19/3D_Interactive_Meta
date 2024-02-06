import fastify from 'fastify';
import fastifySocketIO from 'fastify-socket.io';
import cors from '@fastify/cors';
import { Server } from 'socket.io';

declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}

const PORT = 8080;

const server = fastify({ logger: true });

// middleware
server.register(cors, {
  origin: '*',
  credentials: true,
});
server.register(fastifySocketIO, {
  cors: {
    origin: '*',
  },
});

// socket manage
server.ready((error) => {
  if (error) throw error;

  server.io.on('connection', (socket) => {
    console.info('socket connected : ', socket.id);
  });
});

server.listen({ port: PORT }, (error, address) => {
  if (error) {
    server.log.error(error);
    process.exit(1);
  }

  console.log('running fastify server on ', address);
});
