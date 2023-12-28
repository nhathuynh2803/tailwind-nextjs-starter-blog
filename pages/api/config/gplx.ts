import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const data = {
        version: '1.0.0',
        name: 'GPLX',
        description: 'GPLX API'
    };

    res.status(200).json(data);
};
