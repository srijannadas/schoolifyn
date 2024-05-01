const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config');
const createRoutes = require('./routes'); // Import createRoutes function

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB(); // Call the connectDB function to establish MongoDB connection

const User = require('./models/User'); // Import the User model
const noteRoutes = require('./noteRoutes');
const subjectRoutes = require('./subjectRoutes');
const boardRoutes = require('./boardRoutes');

const routes = createRoutes(User); // Pass the User model to createRoutes

app.use('/', routes);
app.use('/note', noteRoutes);
app.use('/subject', subjectRoutes);
app.use('/board', boardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
