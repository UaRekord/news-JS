import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'eebf7467d4ae4760ad6a36e5689b8e68', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
