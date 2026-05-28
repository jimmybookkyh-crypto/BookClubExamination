// import usernames
import userNames from './data/userNames.json' with { type: 'json' };

// config
const STRAPI_HOST = "127.0.0.1";
const STRAPI_PORT = 5001;

const NUMBER_OF_USERS = 25;
const DEFAULT_PASSWORD = "12345678";

// shuffle/randomize array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function createUsers() {

  // randomize usernames
  shuffleArray(userNames);

  for (let i = 0; i < NUMBER_OF_USERS; i++) {

    const username = userNames[i];

    const userData = {
      username,
      email: `${username.toLowerCase()}@mail.com`,
      password: DEFAULT_PASSWORD
    };

    const response = await fetch(
      `http://${STRAPI_HOST}:${STRAPI_PORT}/api/auth/local/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }
    );

    const answer = await response.json();

    console.log(`Creating user ${i + 1}/${NUMBER_OF_USERS}`);
    console.log(answer);
    console.log('');
  }
}

// run seeder
createUsers();