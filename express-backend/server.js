const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

function createAccount(name, email, password) {
  console.log(`Creating account for ${name}, ${email}`);
  return { success: true, message: 'Account created successfully' };
}

app.post('/create_account', (req, res) => {
  const { name, email, password } = req.body;
  const result = createAccount(name, email, password);

  res.json(result);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
