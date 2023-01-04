import * as express from 'express';
import * as hpp from 'hpp';
import * as morgen from 'morgan';
import * as cors from 'cors';
import helmet from 'helmet';
import userRouter from './routes/user';
import { sequelize } from './models';

const app = express();
const prod: boolean = process.env.NODE_ENV === 'production';

app.set('port', 3001);
app.use('/', express.static('uploads'));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결완료');
  })
  .catch((err: Error) => {
    console.log('err: ' + err.message);
  });

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgen('combined'));
  app.use(
    cors({
      // origin: /tteoksang\.site$/,
      origin: true,
      credentials: true,
    }),
  );
} else {
  app.use(morgen('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  next();
});

if (prod) {
  //
} else {
  app.listen(app.get('port'), () => {
    console.log(`server is running on ${app.get('port')}!`);
  });
}

app.use('/api/user', userRouter);
