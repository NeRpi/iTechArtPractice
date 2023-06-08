require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.json('Hi');
})

app.listen(PORT, () => console.log(`Server started on: ${PORT}`));