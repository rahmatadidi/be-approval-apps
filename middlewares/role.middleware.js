const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User belum login" });
    }

    const allowedRoles = roles.map((r) => r.toLowerCase());
    const userRole = req.user.role.toLowerCase();

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Akses ditolak untuk role ini" });
    }

    next();
  };
};

module.exports = { roleMiddleware };
