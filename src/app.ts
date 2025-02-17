import express, { NextFunction, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import router from './routes/routes';
import globalErrorHandler from './middlewares/globalError';
const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      '<h2 style="color: red; text-align: center;">Server is running ✨</h2>',
    );
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [{ path: '', message: 'Not Found' }],
  });
});

app.use(globalErrorHandler);

export default app;
