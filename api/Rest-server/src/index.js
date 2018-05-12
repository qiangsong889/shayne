import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

const PORT = 4000;
const Server = express();

Server.use(bodyParser.json());
Server.use(bodyParser.urlencoded({ extended: true }));
Server.use(morgan('dev'));
Server.use(cors());
Server.post('/api', (req, res) => {
  console.log('recieved a request haha', req.body);
  res.send('nothing');
});

Server.listen(PORT, () => {
  console.log('i think the api rest server is listening on port ', PORT);
});
