var request = require('request-promise');

module.exports = {

  GetUserDetails: (accessToken) => {
    return new Promise((resolve, reject) => {
      // Call Amazon API
      request({
        url: "https://api.amazon.com/user/profile?access_token="+accessToken,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        // Return Users Details
        resolve(JSON.parse(response));
      })
      .catch((error) => {
        // API ERROR
        reject('Amazon API Error: ', error);
      });
    });
  }

};
