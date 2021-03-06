import express from 'express';
import MachineLearning from './Modules/MachineLearning/Learning';

import Scraper from './Modules/Scraper/Scraper';

console.log('Starting node app...');

const app = express();
const port = 1337;

// app.listen(port, () => console.log(`Listening on port ${port}`));

// app.use(express.static('src/html'));
// app.use('/css', express.static(__dirname + 'html/css'));
// app.use('/img', express.static(__dirname + 'html/img'));

// app.get('', (req, res) => {
//   res.sendFile(__dirname, +'./index.html');
// });

const scraper = new Scraper();
const machineLearning = new MachineLearning();

machineLearning.ClassifyImage('src/Modules/MachineLearning/img/download.jpeg');

// scraper.initializeScraper();
