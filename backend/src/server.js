// File: backend/src/index.js
// ---------------------------

import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // IMPORTANT: Restrict this to your frontend URL in production
        methods: ["GET", "POST"],
        credentials: true
    }
});

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('A user connected via WebSocket:', socket.id);

    socket.on('join_class_session', (classId) => {
        socket.join(classId);
        console.log(`Socket ${socket.id} joined session for class ${classId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.set('socketio', io);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

