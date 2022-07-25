import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.routes';
import languageRoutes from './routes/language.routes';

const app = express();

// Settings
app.set('port', 4000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/languages', languageRoutes);

export default app;
