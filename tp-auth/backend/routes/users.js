const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/auth");

/*
=================================================
GET /api/users
Afficher tous les utilisateurs
=================================================
*/
router.get("/", auth, async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, name, email, age, cin, created_at FROM users"
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/*
=================================================
PUT /api/users/:id
Modifier un utilisateur
=================================================
*/
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, cin } = req.body;

    const [existingRows] = await pool.query(
      "SELECT id, name, email, age, cin FROM users WHERE id = ?",
      [id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const existing = existingRows[0];
    const nextName = name ?? existing.name;
    const nextEmail = email ?? existing.email;
    const nextAge = age ?? existing.age;
    const nextCin = cin ?? existing.cin;

    await pool.query(
      "UPDATE users SET name = ?, email = ?, age = ?, cin = ? WHERE id = ?",
      [nextName, nextEmail, nextAge, nextCin, id]
    );

    return res.json({
      id: existing.id,
      name: nextName,
      email: nextEmail,
      age: nextAge,
      cin: nextCin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/*
=================================================
DELETE /api/users/:id
Supprimer un utilisateur
=================================================
*/
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM users WHERE id = ?", [id]);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
