const User = require("../models/User");
const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

class UserController {
  static async createUser(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getUser(req, res) {
    const userId = req.params.id;
    client.get(userId, async (err, data) => {
      if (data) {
        return res.json(JSON.parse(data));
      } else {
        try {
          const user = await User.findById(userId);
          if (!user) return res.status(404).json({ message: "User not found" });
          client.setex(userId, 3600, JSON.stringify(user)); // Cache for 1 hour
          res.json(user);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
    });
  }

  static async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) return res.status(404).json({ message: "User not found" });

      client.del(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      client.del(req.params.id);
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserByAccountNumber(req, res) {
    const { accountNumber } = req.params;
    try {
      const user = await User.findOne({ accountNumber });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getUserByIdentityNumber(req, res) {
    const { identityNumber } = req.params;
    try {
      const user = await User.findOne({ identityNumber });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = UserController;
