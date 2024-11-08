const jwt = require("jsonwebtoken");

class AuthController {
  static async generateToken(req, res) {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  }
}

module.exports = AuthController;
