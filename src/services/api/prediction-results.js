// For handling the prediction and result api calls to backend
import axios from 'axios'
const BASE_URL = process.env.REACT_APP_DRF_BASE_URL;
const highLevelPrediction = async (accessToken, songData) => {
    try {
      const response = await axios.post(`${BASE_URL}/predict/high_level_prediction/`, songData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };
  export {highLevelPrediction};

  const lowLevelPrediction = async (accessToken,songData) => {
    try {
      const response = await axios.post(`${BASE_URL}/predict/low_level_prediction/`, songData, { 
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error predicting low level:', error);
      throw error;
    }
  };
  
  export { lowLevelPrediction };
  