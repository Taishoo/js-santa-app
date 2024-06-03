import axios from 'axios';

// Mainly for fetching .json data from github, can be used as well for other endpoints
// I Replaced the main HTTP Client from Request to Axios, because it give more advantages with the older Request library.

export const userUrl = "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";
export const userProfilesUrl = "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";


export const fetchData = async (url) => {
    let response;
    return await axios.get(url)
    .then(res => response = res.data)
    .catch(error => console.log(error))
    .finally(console.log(`Done executing fetch method for url ${url}`))
}
