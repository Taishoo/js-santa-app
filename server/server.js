import app from './app.js';

// Listens to the default port or to 8080
const listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});