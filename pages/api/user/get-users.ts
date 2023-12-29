import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @openapi
 * /api/user/get-users:
 *   get:
 *     description: Return a list user data.
 *     responses:
 *       200:
 *         description: list user data.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Handle the GET request to /api/user/get-users
    if (req.method === 'GET') {
        // Retrieve the user data from the database or any other data source
        const user = [{
            id: 1,
            name: 'John Doe 1',
            email: 'john.doe@example.com',
        },
        {
            id: 2,
            name: 'John Doe 2',
            email: 'john.doe@example.com',
        }];

        // Return the user data as the response
        res.status(200).json(user);
    } else {
        // Return an error for unsupported request methods
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
