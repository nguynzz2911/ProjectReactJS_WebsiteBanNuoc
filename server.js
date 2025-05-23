import express, { json } from 'express';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
const app = express(); 
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});