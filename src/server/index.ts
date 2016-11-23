import 'reflect-metadata';
import './dependencies';
import * as express from 'express';
import { app } from './app';
import { Container } from 'typedi';

class Server {

  async start(di): Promise<void> {
    
    const server = app(di);
    server.listen(3000);
    
    console.log('Server is listening on port 3000');
  }
}

const server = new Server();
server.start(Container);

// /**
//  * Starts server
//  */
// async function startServer(): Promise<void> {
//   // const injector = await dependencies();
//   // console.log(dependencies.TestDependency)
//   const server = app();
//   server.listen(3000);

//   console.log('Server is listening on port 3000');
//   // const server = await app(injector);
//   // app.listen(injector.get('config').port || 3000);
//   // return app;
// }