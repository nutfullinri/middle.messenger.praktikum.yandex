export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export type Options = {
    method: METHOD;
    headers?: Record<string, string>;
    timeout?: number;
    data?: Record<string, unknown>;
}

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
export type OptionsWithoutMethod = Omit<Options, 'method'>
// Этот тип эквивалентен следующему:
// type OptionsWithoutMethod = { data?: any };

export class HTTPTransport {
    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHOD.GET});
    }

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHOD.DELETE}, options.timeout);
    }

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHOD.PUT}, options.timeout);
    }

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, {...options, method: METHOD.POST}, options.timeout);
    }

    request(url: string, options: Options = { method: METHOD.GET }, timeout?: number): Promise<XMLHttpRequest> {
        const { method, data } = options;
        let { headers } = options;

        if (!headers) {
            headers = {'Content-Type': 'text/plain'};
        }
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, method === METHOD.GET ? url + queryStringify(data!) : url);
            Object.keys(headers as {}).forEach(key => {
                xhr.setRequestHeader(key, String(headers));
            });

            if (timeout) {
                xhr.timeout = timeout;
            }

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}

function queryStringify(data: Record<string, unknown>): string {
    return data ? `?${Object.keys(data).map(key => `${key}=${encodeURIComponent(String(data[key]))}`).join('&')}` : '';
}
