import wpRestApi from '@/services/wordpress/wpService';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    const { ...params } = req.query;
    let slug = req.query.path;

    if (!slug || slug.length === 0)
    {
        return res.status(400).json({ error: 'Slug parameter is missing' });
    }

    if (Array.isArray(slug))
    {
        slug = slug.join('/');
    }

    if (req.body)
    {
        wpRestApi.post(slug, req.body)
            .then((response) =>
            {
                if (response.status === 200 || response.status === 201)
                {
                    return res.status(response.status).json(response.data);
                } else
                {
                    throw new Error(`WordPress API returned status ${response.status}`);
                }
            })
            .catch((error) =>
            {
                console.log(error.response.data.message);
                return res.status(500).json(error);
            })
    } else
    {
        wpRestApi.get(slug, params)
            .then((response) =>
            {
                if (response.status === 200 || response.status === 201)
                {
                    return res.status(response.status).json(response.data);
                } else
                {
                    throw new Error(`WordPress API returned status ${response.status}`);
                }
            })
            .catch((error) =>
            {
                return res.status(500).json(error);
            })
    }
}