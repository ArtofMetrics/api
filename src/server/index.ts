import 'reflect-metadata';
import { dependencies } from './dependencies';
import * as express from 'express';
import { app } from './app';

class Server {

  async start(di): Promise<void> {
    
    const server = app(di);
    server.listen(3000);
    
    console.log('Server is listening on port 3000');
  }
}

const server = new Server();
server.start(dependencies());
