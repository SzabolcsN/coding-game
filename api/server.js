const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const executeRoute = require('./routes/execute');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/execute', executeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});