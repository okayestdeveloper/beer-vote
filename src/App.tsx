import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';

import { db } from './shared/firebase';
import Header from './components/common/Header';

interface IBeer {
  name: string;
  style: string;
  tags: string[];
}

const App: React.FC<any> = () => {
  const [beers, setBeers] = useState<IBeer[]>([]);

  useEffect(() => {
    db.collection('beers')
      .get()
      .then((snapshot) => {
        const _beers: IBeer[] = [];
        snapshot.forEach((doc) => _beers.push(doc.data() as IBeer));
        setBeers(_beers);
      });
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <div>
          {beers.map((beer: IBeer) => {
            return (
              <>
                <p>
                  <b>{beer.name}</b>
                </p>
                <p>{beer.style}</p>
                <ul>
                  {beer.tags.map((tag) => (
                    <li>{tag}</li>
                  ))}
                </ul>
              </>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default App;
