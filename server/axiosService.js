import axios from 'axios';

// Mainlty for fetching .json data from github, can be used as well for other endpoints

export const userUrl = "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";
export const userProfilesUrl = "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";


export const fetchData = async (url) => {
    let response;
    return await axios.get(url)
    .then(res => response = res.data)
    .catch(error => console.log(error))
    .finally(console.log(`Done executing fetch method for url ${url}`))
}
