const express = require('express');
const cors = require('cors');
const { pool, initDatabase } = require('./database');

const app = express();
const port = 8080;

app.use(cors())
app.use(express.json());

// Initialize database tables when server starts
initDatabase()
  .then(() => console.log('Database initialized'))
  .catch((err) => console.error('Failed to initialize database:', err));

(async () => {
  await initDatabase();
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
})();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});
