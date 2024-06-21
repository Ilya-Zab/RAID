import wpRestApi from '@/services/wordpress/wpService';
import { validateApiError } from '@/utils';
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

    if (req.method !== 'GET')
    {
        wpRestApi.post(slug, req.body)
            .then((response) => res.status(response.status).json(response.data))
            .catch((error) =>
            {
                validateApiError(error, res);
            })
    } else
    {
        wpRestApi.get(slug, params)
            .then((response) => res.status(response.status).json(response.data))
            .catch((error) =>
            {
                validateApiError(error, res);
            })
    }
}