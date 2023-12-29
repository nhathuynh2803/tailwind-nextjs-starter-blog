
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// This is your authentication middleware
function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => void) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization;

    try {
      // Verify the token (replace 'your-secret-key' with your actual secret key)
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY );

      // If the token is valid, call the handler
      return handler(req, res);
    } catch (error) {
      // If the token is invalid, return a 401 Unauthorized response
      res.status(401).json({ message: 'Not authenticated' });
    }
  };
}

export default withAuth;