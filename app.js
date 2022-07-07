const express = require('express');
const { connectDB } = require('./config/dbConfig');
const app = express();
const port = 3000;

const userRoutes = require('./routes/userRoute');
const questionRoutes = require('./routes/questionRoutes');
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get('/', (req, res) => {
  res.send('Stack Overflow...')
});

// Importing Routes
app.use('/api/user', userRoutes);
app.use('/api/question', questionRoutes);

app.listen(port, ()=> {
  console.log(`Server running on Port:${port} `)
})