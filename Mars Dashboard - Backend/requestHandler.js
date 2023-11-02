const ParamsApi = require('./apiParams');
class RequestHandler {
    /**
     * @description Extracts query parameters from request
     * @param request
     * @returns {ApiParams}
     */
    static extractParams(request) {
        const params = new ParamsApi(request.query.rover, request.query.earthDate, request.query.camera);
        return params;
    }

    /**
     * @description Creates NASA api url
     * @param initialUrl
     * @param params
     * @param apiKey
     * @returns {function(*): function(*): string}
     */
    static getUrl(initialUrl, params, apiKey) {
        return `${initialUrl}${params.getRoverName()}/photos?earth_date=${params.getEarthDate()}&camera=${params.getCamera()}&page=1&api_key=${apiKey}`;
    }

    /**
     * @returns {{port: number, host: string}}
     */
    static getOptions(){
        return {
            host: process.env.NASA_API,
            port: process.env.NASA_API_PORT
        };
    }
}

module.exports = RequestHandler;