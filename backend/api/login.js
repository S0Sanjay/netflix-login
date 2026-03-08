const USERS = global.USERS || (global.USERS = []);

export default function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password are required.' });

  const user = USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user)
    return res.status(401).json({ success: false, message: 'Incorrect email or password.' });

  return res.status(200).json({
    success: true,
    message: 'Login successful!',
    user: { name: user.name, email: user.email },
  });
}