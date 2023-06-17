import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import auth from './routes/auth.routes';
// import test from './routes/test.routes';
import user from './routes/user.routes';
import workout from './routes/workout.routes';
import plan from './routes/plan.routes';
import program from './routes/program.routes';

const app = express();
const port = 8080;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server aktif!');
});

auth(app);
// test(app);
user(app);
workout(app);
plan(app);
program(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
