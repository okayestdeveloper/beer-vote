if (process.argv.length < 3) {
  console.info('Usage: node restore.js <path to backup.json file>');
  process.exit(1);
}

const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');
require('./env');
const db = require('./db');
const { omit } = require('./utils');

const filename = path.resolve('./', process.argv[2]);

fs.readFile(filename)
  .then((beerData) => {
    const beers = JSON.parse(beerData);
    return Promise.all(
      beers.map((beer) =>
        db
          .collection('beers')
          .doc(beer.id)
          .set(omit(beer, ['id'])),
      ),
    );
  })
  .catch((error) => {
    console.error('Caught error');
    console.dir(error);
    process.exit(1);
  });
