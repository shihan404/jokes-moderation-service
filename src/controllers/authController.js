const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (email === "admin@admin.com" && password === "admin123") {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
