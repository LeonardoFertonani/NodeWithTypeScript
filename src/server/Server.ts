import express from 'express';

const server = express();

server.get('/', (_, res) => {
  return res.send("working")
});


export { server };