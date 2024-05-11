import { NextApiRequest, NextApiResponse } from 'next'
import withAuth from 'utilities/jwt-handle'

// This is your API handler
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const data = {
    version: '1.0.0',
    name: 'GPLX',
    description: 'GPLX API',
  }

  res.status(200).json({ ok: true, data: data })
}

// Wrap your handler with the authentication middleware
export default withAuth(handler)
