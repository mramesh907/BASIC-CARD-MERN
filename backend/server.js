const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const registerRoute = require('./routes/register.route.js');
const userRoute = require('./routes/users.route.js');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Database connected');
        app.listen(process.env.PORT || 8000, (err) => {
            if (err) {
                console.log('Error starting server:', err);
            } else {
                console.log(`Server started at port ${process.env.PORT || 5000}`);
            }
        });
    })
    .catch((err) => {
        console.error('Error connecting to database:', err);
    });

app.get('/', (req, res) => {
    res.send('Home Route');
});
app.use('/api', registerRoute);
app.use('/api', userRoute);



