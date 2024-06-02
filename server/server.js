
import {userUrl, userProfilesUrl, fetchData} from "./axiosService.js"
import express from 'express';
import morgan from 'morgan';
import bodyParser from "body-parser";
import { send } from "./mailerService.js";

const app = express();

app.use(bodyParser());
app.use(morgan());
app.use(express.static('public'));


let lettersToSanta = [];

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/view/index.html');
});

// Main API Endpoint for sending request to santa
app.post('/send', async (request, response) => {

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
  return response.send({message:"Letter has been sent to Santa."});
});


// Sends the accumulated email to Santa every 15 seconds
setInterval(()=> {
  if (lettersToSanta.length > 0) {
      lettersToSanta.forEach(obj => send(obj));
      lettersToSanta = [];
  }
}, 15000);


const listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
