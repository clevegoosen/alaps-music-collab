const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use('/songs', express.static('uploads'));

app.post('/upload', upload.single('song'), (req, res) => {
  const filePath = `/songs/${req.file.filename}`;
  io.emit('new-song', { name: req.file.originalname, url: filePath });
  res.json({ success: true, url: filePath });
});

io.on('connection', (socket) => {
  console.log('User connected');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

