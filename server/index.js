const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
app.use(cors())


app.get('/', (req, res) => {
      res.json({ message: 'Hello from the API!' }); 
})

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});