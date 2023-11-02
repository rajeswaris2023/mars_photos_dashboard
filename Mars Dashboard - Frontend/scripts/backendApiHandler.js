class BackendApiHandler {
    #url = 'http://localhost:8080';
    #apiInput;

    /**
     * @description Represents API Handler
     * @param apiInput
     */
    constructor(apiInput) {
        this.#apiInput = apiInput;
    }

    /**
     * @description Add query parameters
     * @returns {`http://localhost:8080?rover=${*}&earthDate=${*}&camera=${*}`} request url
     */
    addQueryStrings() {
      return `${this.#url}?rover=${this.#apiInput.getRover()}&earthDate=${this.#apiInput.getEarthDate()}&camera=${this.#apiInput.getCamera()}`;
    }

    /**
     * @description Send request to API and handles response
     * @param apiUrl
     * @returns {Promise<any>} Response data
     */
    async callApi(apiUrl){
        const apiResponse = await fetch(apiUrl).catch((reason) => console.log(error));
        const responseJson = await apiResponse.json();
        return responseJson === undefined ? responseJson : responseJson.data;
    };

    /**
     * @description Prepares request and handles response data
     * @returns {Promise<*|PhotosData>} PhotosData
     */
    async getPhotosData() {
        const apiUrl = this.addQueryStrings();
        const responseData = await this.callApi(apiUrl);
        return responseData === undefined ? responseData
                : new PhotosData(responseData.earth_date, responseData.camera, responseData.rover, responseData.photos);
    }
}