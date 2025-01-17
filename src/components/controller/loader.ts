interface ILoader {
    baseLink: string;
    options: object;
    getResp({}: object, callback: () => {}): void;
    errorHandler(res: Response): Response;
    load(method: string, endpoint: string, callback: { (): void; (arg0: object): void; }, options: object):void;
    makeUrl(options: object, endpoint: string):string
}

class Loader implements ILoader {
    baseLink: string;
    options: object;
    constructor(baseLink: string, options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint = '', options = {} },
        callback = () => {
            console.error('No callback for GET response');
        }
    ):void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: object, endpoint: string):string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]): void => {
            url += `${key}=${value ?? ''}&`;
          });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: { (): void; (arg0: object): void; }, options = {}):void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
