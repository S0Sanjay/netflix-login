const USERS = global.USERS || (global.USERS = []);

export default function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'All fields are required.' });

  const exists = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists)
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' });

  USERS.push({ email: email.toLowerCase(), password, name });

  return res.status(201).json({
    success: true,
    message: 'Account created successfully!',
    user: { name, email },
  });
}