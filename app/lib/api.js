import axios from "axios";

export const baseUrl = "https://api.laikaa.in/";
/**
 * @param {string} url
 * @param {Object|FormData|string} data
 * @param {Object} headers
 * @returns {Promise}
 */
export async function postData(endPoint, data = {}, headers = {}) {
  let body;
  
  if (data instanceof FormData) {
    body = data;
  } else if (typeof data === "object") {
    body = JSON.stringify(data);
    headers['Content-Type'] = 'application/json';
    // headers['Access-Control-Allow-Origin'] = '*';
    // headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
    // headers['Access-Control-Allow-Headers'] = 'append,delete,entries,foreach,get,has,keys,set,values,Authorization';
  } else {
    body = data;
  }
  const url = baseUrl + endPoint;
  try {
    const response = await axios.post(url, body, {headers},);

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.data;

    return responseData;
  } catch (error) {
    console.error("Error in postData:", error);
    throw error;
  }
}
