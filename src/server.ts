import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users';
import bookRoutes from './routes/books';
import sequelize from './config/database';
import { errorHandler } from './middleware/errorHandler';
import './models/associations';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(errorHandler);
app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

sequelize.sync().then(() => {
    console.log('Database synced');
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
