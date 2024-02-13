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

// world
const world = [];

// socket manage
server.ready((error) => {
  if (error) throw error;

  server.io.on('connection', (socket) => {
    let character = null;

    console.info('socket connected : ', socket.id);

    const onWorldUpdate = () => {
      server.io.emit('world', world);
    };

    socket.on('worldJoin', (nickname, avatar) => {
      character = {
        nickname,
        avatar,
        id: socket.id,
        position: { x: 0, y: 0, z: 0 },
      };
      world.push(character);

      socket.emit('worldJoined', {
        character,
      });
      onWorldUpdate();
    });

    socket.on('pressed', (pressed) => {
      server.io.emit('playerMove', {
        id: socket.id,
        pressed,
      });
    });

    socket.on('updatePosition', (id, position) => {
      character.position = position;
    });

    socket.on('disconnect', () => {
      console.info('socket disconnected : ', socket.id);

      if (world.length) {
        world.splice(
          world.findIndex((target) => target.id === socket.id),
          1
        );
        onWorldUpdate();
        character = null;
      }
    });
  });
});

server.listen({ port: PORT }, (error, address) => {
  if (error) {
    server.log.error(error);
    process.exit(1);
  }

  console.log('running fastify server on ', address);
});
