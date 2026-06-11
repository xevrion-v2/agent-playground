import express from 'express';
import cors from 'cors';
import routes from './routes';
import { getHealth } from './controllers/health.controller';

const app = express();