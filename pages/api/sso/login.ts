import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

// This is your default user
const defaultUser = {
  username: 'admin',
  password: process.env.ADMIN_PASSWORD,
}

/**
 * @openapi
 * /api/sso/login:
 *   post:
 *     description: Login to the system.
 *     parameters:
 *       - in: query
 *         name: redirect
 *         schema:
 *           type: string
 *         description: The URL to redirect to after login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successfully and return jwt token data.
 */
export default function handle(req: NextApiRequest, res: NextApiResponse) {
  // check if the request is a POST request
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }
  const { username, password } = req.body
  if (username === defaultUser.username && password === defaultUser.password) {
    // If the username and password match the default user, create a JWT
    const token = jwt.sign(
      { username: defaultUser.username },
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '15m' }
    )

    // Create a refresh token
    const refreshToken = jwt.sign(
      { username: defaultUser.username },
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: '7d' }
    )

    // Set the JWT as a cookie
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax`)

    // Return the JWT, refresh token, and expiration time
    res.status(200).json({ ok: true })
  } else {
    // If the username and password don't match, return a 401 Unauthorized response
    res.status(401).json({ message: "Invalid username or password :'(" })
  }
}
