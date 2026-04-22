import express from 'express';
import router from './routes';
import config from './config/config';

import { errorHandler } from './middlewares/errors';

const app = express();

app.use(express.json());
app.use('/shipments', router);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});