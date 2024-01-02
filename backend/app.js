import express from 'express';
import dotenv from 'dotenv';
import logger from './src/api/logger/index.js';
import cryptoRoute from './src/api/routes/crypto.route.js'
import fiatRoute from './src/api/routes/fiat.route.js'
import priceRoute from './src/api/routes/price.route.js'
import invalidRoute from './src/api/routes/invalid.route.js'
import cors from 'cors'

dotenv.config();

const app = express();

// req input phraser
app.use(express.json());

app.use(cors());


app.use(cryptoRoute);
app.use(fiatRoute);
app.use(priceRoute);

app.get('/', (req, res) => {
    res.send('Hey');
});
// for handling 
app.use(invalidRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    logger.info(`App listening to http://localhost:${PORT}`)
);