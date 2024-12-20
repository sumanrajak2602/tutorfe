import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { SocketManager } from './socketManager.js';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const socketManager = new SocketManager(io);

io.on('connection', (socket) => {
  socketManager.handleConnection(socket);
});

// API endpoint to send notification to specific users
app.post('/send-notification', (req, res) => {
  const { recipients, notification } = req.body;
  
  if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({ 
      success: false, 
      message: 'Recipients array is required' 
    });
  }

  if (!notification || !notification.id) {
    return res.status(400).json({ 
      success: false, 
      message: 'Valid notification object with id is required' 
    });
  }

  socketManager.sendNotificationToUsers(recipients, notification);
  res.json({ 
    success: true, 
    message: 'Notification sent successfully' 
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});