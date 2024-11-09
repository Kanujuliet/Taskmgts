const express = require('express');
const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

app.get('/', (req, res) => res.send('Task Management API is running'));

const taskRoustes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoustes);
const authRoutes = require('./routes/authRoutes');
app.use('/api/login', authRoutes);


app.listen(PORT, () => console.log('Server running on port ${PORT}'));