
import {userUrl, userProfilesUrl, fetchData} from './axiosService.js'
import { send } from './mailerService.js';
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(bodyParser());
app.use(morgan());
app.use(cors())
app.use(express.static('dist'));


// Letters to santa are stored here
let lettersToSanta = [
  // {
  //   username: "charlie.brown",
  //   address: "Tokyo, Japan",
  //   wish: "Gifts!"
  // }
];

// Main API Endpoint for sending request to santa
app.post('/api/v1/send', async (request, response) => {

  // Get appropriate data
  const userData = await fetchData(userUrl);
  const userProfiles = await fetchData(userProfilesUrl);

  // Find name in the users data
  let found = userData.find(user => user.username.toLowerCase() === request.body.name.toLowerCase());
  if (!found) { return response.status(404).send({message:"You are not in Santa's list :("}); } 

  // Find the full user profile and calculate age
  let userProfile = userProfiles.find(profile => profile.userUid === found.uid);
  let age = new Date().getFullYear() - new Date(userProfile.birthdate).getFullYear();
  if (age > 10) { return response.status(403).send({message:"You are too old now to write to Santa."}); }

  // Set in pending, will be sent in or around 15 seconds..
  lettersToSanta.push(
    {
      username: found.username,
      address: userProfile.address,
      wish: request.body.wish
    }
  );

  // Return success message
  return response.send({message:"Your letter has been sent to Santa!"});
});


// Sends the accumulated email to Santa every 15 seconds
setInterval(()=> {

  // Only trigger send function when letter box is not empty
  if (lettersToSanta.length > 0) {

      lettersToSanta.forEach(obj => send(obj)); // Send All of the Letters

      lettersToSanta = []; // Empty the letter box so we can fill it up again
  }
}, 15000); // 15 seconds

// Listens to the default port or to 8080
const listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

export default app;