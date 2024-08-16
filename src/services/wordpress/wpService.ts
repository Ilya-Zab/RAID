import axios, { AxiosResponse, Method } from "axios";

interface AuthConfig
{
    username: string;
    password: string;
}

const authConfig: AuthConfig = {
    username: process.env.USER_NAME || '',
    password: process.env.USER_PASSWORD || ''
};

const serverPath = process.env.SITE_URL;

export class WPRestAPI
{
    private readonly _apiBase: string;
    private readonly _authConfig: AuthConfig;
    private readonly _wpApiPath = '/wp-json/wp/v2/';
    private readonly _wpCustomApiPath = '/wp-json/';

    constructor(apiBase: string, authConfig: AuthConfig)
    {
        this._apiBase = apiBase;
        this._authConfig = authConfig;
    }

    private getBasicAuth(): string
    {
        const { username, password } = this._authConfig;
        if (!username || !password)
        {
            throw new Error('Username or password is missing');
        }
        const encodedAuth = Buffer.from(`${username}:${password}`).toString('base64');
        return `Basic ${encodedAuth}`;
    }

    private async sendRequest(url: string, isCustom: boolean, method: Method, params?: { [key: string]: string | string[] | number }, body?: any, headers?: Record<string, string>): Promise<AxiosResponse<unknown>>
    {
        const response = await axios({
            url: `${this._apiBase}${isCustom ? this._wpCustomApiPath : this._wpApiPath}${url}`,
            method: method,
            params: params,
            data: body,
            headers: {
                'Authorization': this.getBasicAuth(),
                'Content-Type': 'application/x-www-form-urlencoded',
                ...headers
            }
        });
        if (response.status !== 200 && response.status !== 201)
        {
            throw new Error(`Could not fetch ${url}, received ${response.status}`);
        }
        return response;
    }

    async get(url: string, isCustom: boolean, params?: { [key: string]: string | string[] | number }, headers?: Record<string, string>)
    {
        return this.sendRequest(url, isCustom, 'GET', params, null, headers);
    }

    async post(url: string, isCustom: boolean, body?: any, params?: { [key: string]: string | string[] | number }, headers?: Record<string, string>)
    {
        return this.sendRequest(url, isCustom, 'POST', params, body, headers);
    }
}

const wpRestApi = new WPRestAPI(serverPath || '', authConfig);
export default wpRestApi;
