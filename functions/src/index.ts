import { initializeApp } from 'firebase-admin';
import { https } from 'firebase-functions';

// todo: credentials and database URL...from config, I guess
initializeApp();

import { corsOptions } from './config';
import { votingRoutes } from './voting';
import { beerRoutes } from './beer';

import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(cors(corsOptions));

app.use('/voting', votingRoutes);
app.use('/beers', beerRoutes);

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.api = https.onRequest(app);
