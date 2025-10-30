const express = require('express');
const cors = require('cors');
const { pool, initDatabase } = require('./database');

const userRoutes = require('./routes/userRoutes'); 
const bookRoutes = require('./routes/bookRoutes'); 

const app = express();
const port = 8080;

app.use(cors())
app.use(express.json());

// Initialize database tables when server starts
initDatabase()
  .then(() => console.log('Database initialized'))
  .catch((err) => console.error('Failed to initialize database:', err));


app.use('/', userRoutes);
app.use('/', bookRoutes);

(async () => {
  await initDatabase();
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
})();


