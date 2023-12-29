import { NextApiRequest, NextApiResponse } from 'next';


/**
 * @openapi
 * /api/user/get-user:
 *   get:
 *     description: Return the user data.
 *     responses:
 *       200:
 *         description: user detail.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Handle the GET request to /api/user/get-user
    if (req.method === 'GET') {
        // Retrieve the user data from the database or any other data source
        const user = {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
        };

        // Return the user data as the response
        res.status(200).json(user);
    } else {
        // Return an error for unsupported request methods
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
