const jokeService = require("../services/jokeService");

class JokesController {
  async getPendingJokes(req, res) {
    try {
      const jokes = await jokeService.getPendingJokes();
      res.json(jokes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async approveJoke(req, res) {
    try {
      const { jokeId, content, type } = req.body;
      await jokeService.approveJoke(jokeId, content, type);
      res.json({ message: "Joke approved and processed" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async rejectJoke(req, res) {
    try {
      const { jokeId } = req.params;
      await jokeService.rejectJoke(jokeId);
      res.json({ message: "Joke rejected and deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new JokesController();
