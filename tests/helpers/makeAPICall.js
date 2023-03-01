const axios = require('axios');

export async function makeAPICall(APIUrl) {
  const apiResponse = await axios.get(APIUrl);
  return apiResponse.data;
}
