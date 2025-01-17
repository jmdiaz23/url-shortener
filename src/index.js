import express from 'express';
import bodyparser from 'body-parser';
import sequelize from './config/db.js';
import urlRoutes from './routes/urlRoutes.js';
import cors from 'cors'

const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyparser.json());
app.use('/api',urlRoutes);

sequelize.sync({alter:false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});