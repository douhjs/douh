import * as http from 'http';
import { handleRequest } from './routes';

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at ${port}`);
});
