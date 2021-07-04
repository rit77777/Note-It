require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user.router');
const noteRouter = require('./routes/notes.router');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/api/notes', noteRouter);

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('database connected...');
  })
  .catch((e) => console.log(e.message));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server @ http://localhost:${PORT}`));
