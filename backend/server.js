const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());

const USERS = [];

app.get("/", (req, res) => {
  res.json({ message: "Netflix Login API is running 🎬" });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password are required." });

  const user = USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return setTimeout(() => {
      res.status(401).json({ success: false, message: "Incorrect email or password." });
    }, 500);
  }

  return res.status(200).json({
    success: true,
    message: "Login successful!",
    user: { name: user.name, email: user.email },
  });
});

// Signup
app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: "All fields are required." });

  const exists = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists)
    return res.status(409).json({ success: false, message: "An account with this email already exists." });

  const newUser = { email: email.toLowerCase(), password, name };
  USERS.push(newUser);
  console.log(`✅ New user: ${name} (${email})`);

  return res.status(201).json({
    success: true,
    message: "Account created successfully!",
    user: { name: newUser.name, email: newUser.email },
  });
});

app.listen(PORT, () => {
  console.log(`🎬 Server running at http://localhost:${PORT}`);
  console.log(`\n📋 Default credentials:`);
  USERS.forEach((u) => console.log(`   ${u.email} / ${u.password}`));
});
