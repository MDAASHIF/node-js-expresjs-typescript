import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URI || 'mongodb://127.0.0.1:27017/typescript', {
    // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true
      autoIndex: true
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err.message))
  

import postRouter from './routes/posts';
import userRouter from './routes/users';


/** Logging */
app.use(morgan('dev'));

/** Takes care of JSON data */
app.use(express.json());
/** Parse the request */
app.use(express.urlencoded({ extended: false }));

app.use(cors())

// Routes
app.use('/api/v1/posts/', postRouter);
app.use('/api/v1/user/', userRouter);
app.get('/', (req, res) => {
    res.status(200).send('Hello from express and typescript');
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));