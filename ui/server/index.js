import express from 'express';
import path from 'path';

const server = express();
const PORT = process.env.PORT || 1227;

server.use(express.static(path.join(__dirname, '../client/public')));

server.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'))
);

server.listen(PORT, () =>
  console.log(`static file server now is opening on port ${PORT}`)
);
