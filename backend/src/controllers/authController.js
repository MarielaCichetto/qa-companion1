import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { getDb } from '../models/database.js';

const sanitizeEmail = (email = '') => email.trim().toLowerCase();
const isValidEmail = (email) => /.+@.+\..+/.test(email);

const presentUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  language: user.language ?? 'es',
  provider: user.provider ?? 'local',
  createdAt: user.createdAt
});

const generateToken = () => nanoid(32);

export const register = async (req, res) => {
  const { name, email, password, language = 'es', remember = false } = req.body ?? {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  const normalizedEmail = sanitizeEmail(email);
  if (!isValidEmail(normalizedEmail)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }

  try {
    const db = await getDb();
    const existing = await db.get('SELECT * FROM users WHERE email = ?', [normalizedEmail]);
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const id = `USR-${nanoid(8).toUpperCase()}`;
    const token = remember ? generateToken() : null;

    await db.run(
      `INSERT INTO users (id, name, email, passwordHash, language, provider, rememberToken)
       VALUES (?, ?, ?, ?, ?, 'local', ?)`
      ,
      [id, name.trim(), normalizedEmail, passwordHash, language, token]
    );

    const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    return res.status(201).json({ token: token ?? generateToken(), user: presentUser(user) });
  } catch (error) {
    console.error('register error', error);
    return res.status(500).json({ message: 'Unexpected error while registering user.' });
  }
};

export const login = async (req, res) => {
  const { email, password, remember = false } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials.' });
  }
  const normalizedEmail = sanitizeEmail(email);
  if (!isValidEmail(normalizedEmail)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }

  try {
    const db = await getDb();
    const user = await db.get('SELECT * FROM users WHERE email = ?', [normalizedEmail]);
    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = remember ? generateToken() : generateToken();
    await db.run('UPDATE users SET rememberToken = ? WHERE id = ?', [remember ? token : null, user.id]);

    return res.json({ token, user: presentUser(user) });
  } catch (error) {
    console.error('login error', error);
    return res.status(500).json({ message: 'Unexpected error during login.' });
  }
};

export const googleSignIn = async (req, res) => {
  const { email, name, language = 'es' } = req.body ?? {};
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }
  const normalizedEmail = sanitizeEmail(email);
  if (!normalizedEmail.endsWith('@gmail.com')) {
    return res.status(400).json({ message: 'Google sign-in requires a Gmail account.' });
  }

  try {
    const db = await getDb();
    let user = await db.get('SELECT * FROM users WHERE email = ?', [normalizedEmail]);
    if (!user) {
      const id = `USR-${nanoid(8).toUpperCase()}`;
      await db.run(
        `INSERT INTO users (id, name, email, language, provider)
         VALUES (?, ?, ?, ?, 'google')`
        ,
        [id, (name || normalizedEmail.split('@')[0]).trim(), normalizedEmail, language]
      );
      user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    } else if (user.provider !== 'google') {
      await db.run('UPDATE users SET provider = ? WHERE id = ?', ['google', user.id]);
      user = await db.get('SELECT * FROM users WHERE id = ?', [user.id]);
    }

    return res.json({ token: generateToken(), user: presentUser(user) });
  } catch (error) {
    console.error('googleSignIn error', error);
    return res.status(500).json({ message: 'Unexpected error during Google sign-in.' });
  }
};

export const updateLanguage = async (req, res) => {
  const { userId } = req.params;
  const { language } = req.body ?? {};
  if (!userId || !language) {
    return res.status(400).json({ message: 'Invalid payload.' });
  }

  try {
    const db = await getDb();
    await db.run('UPDATE users SET language = ? WHERE id = ?', [language, userId]);
    const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.json({ user: presentUser(user) });
  } catch (error) {
    console.error('updateLanguage error', error);
    return res.status(500).json({ message: 'Unexpected error updating language.' });
  }
};
