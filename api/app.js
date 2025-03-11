const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const frequenciaRoutes = require('./routes/frequenciaRoutes');
const turmaRoutes = require('./routes/turmasRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/frequencias', frequenciaRoutes);
app.use('/turmas', turmaRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
