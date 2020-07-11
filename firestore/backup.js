const fs = require('fs').promises;
const moment = require('moment');
require('./env');
const db = require('./db');

// get beers
db.collection('beers')
  .orderBy('name')
  .get()
  .then((snapshot) => {
    const beers = [];
    snapshot.forEach((doc) => {
      const beer = { ...doc.data(), id: doc.id };
      beers.push(beer);
    });
    return beers;
  })
  .then((beers) => {
    // save json file
    const filename = `./beers-${moment().format('YYYY-MM-DD')}.json`;
    return fs.writeFile(filename, JSON.stringify(beers, null, 2));
  })
  .catch((error) => {
    console.error('Caught error');
    console.dir(error);
    process.exit(1);
  });
