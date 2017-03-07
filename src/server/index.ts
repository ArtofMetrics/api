import 'reflect-metadata';
import { dependencies } from './dependencies';
import * as express from 'express';
import { app } from './app';

class Server {

  async start(di): Promise<void> {
    
    try {
      const server = app(di);
      server.listen(3000);
      
      console.log('Server is listening on port 3000');
    } catch (error) {
      console.error(`Error starting server: \n ${ error.stack}\n${ error }`);
    }
  }
}

const server = new Server();
server.start(dependencies());
