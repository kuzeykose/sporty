import express from 'express';
import cors from 'cors';


import auth from './routes/auth.routes';
import test from './routes/test.routes';

const app = express();
const port = 8080;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server aktif!')
})

auth(app);
test(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

