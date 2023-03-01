const axios = require('axios');

async function makeAPICall(APIUrl) {
  const apiResponse = await axios.get(APIUrl);
  return apiResponse.data;
}

module.exports = { makeAPICall };
