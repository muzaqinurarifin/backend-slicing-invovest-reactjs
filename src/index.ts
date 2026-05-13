import express from 'express';
import cors from 'cors'
import eventRoute from './routes/eventRoute';
import CategoryRoute from './routes/categoryRoute';
import speakerRoute from './routes/speakerRoute';




const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Ini adalah aplikasi untuk invofest');
});

app.use('/events', eventRoute);
app.use('/categories', CategoryRoute);
app.use('/speakers', speakerRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
