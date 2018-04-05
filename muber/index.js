const app = require('./app');

app.get('/api', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(3050, () => {
  console.log('Running on port 3050.');
});

module.exports = app;
