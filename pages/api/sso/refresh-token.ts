import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

// This is your refresh token API
export default function handle(req: NextApiRequest, res: NextApiResponse) {
  const { refreshToken } = req.body

  try {
    // Verify the refresh token
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET_KEY)

    // If the refresh token is valid, create a new JWT
    const token = jwt.sign(
      { username: payload.username },
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '15m' }
    )
    const newRefreshToken = jwt.sign(
      { username: payload.username },
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: '7d' }
    )

    // Return the new JWT
    res.status(200).json({ token, refreshToken: newRefreshToken, expiresIn: 15 * 60 })
  } catch (error) {
    // If the refresh token is invalid, return a 401 Unauthorized response
    res.status(401).json({ message: 'Invalid refresh token' })
  }
}
