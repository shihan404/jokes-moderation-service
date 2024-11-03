const axios = require("axios");
const { SUBMIT_SERVICE_URL, DELIVER_SERVICE_URL } = require("../config");

class JokesService {
  async getPendingJokes() {
    try {
      const response = await axios.get(`${SUBMIT_SERVICE_URL}/jokes/pending`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch pending jokes");
    }
  }

  async approveJoke(jokeId, content, type) {
    try {
      // Send to deliver service
      await axios.post(`${DELIVER_SERVICE_URL}/jokes`, {
        content,
        type,
      });

      // Delete from submit service
      await axios.delete(`${SUBMIT_SERVICE_URL}/jokes/${jokeId}`);
    } catch (error) {
      throw new Error("Failed to process joke approval");
    }
  }

  async rejectJoke(jokeId) {
    try {
      await axios.delete(`${SUBMIT_SERVICE_URL}/api/jokes/${jokeId}`);
    } catch (error) {
      throw new Error("Failed to reject joke");
    }
  }
}

module.exports = new JokesService();
