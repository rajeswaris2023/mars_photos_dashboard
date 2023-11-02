const https = require('node:https');

class MarsApiHandler {
    /**
     * @description Formats common data from NASA API response
     * @param data
     * @returns {{data: {earth_date, camera: {full_name, name}, rover: {total_photos, name, launch_date, landing_date, status}}}}
     */
    static getCommonData(data) {
      return {
          data : {
              earth_date: data.earth_date,
              camera: {
                  name: data.camera.name,
                  full_name: data.camera.full_name
              },
              rover: {
                  name: data.rover.name,
                  launch_date: data.rover.launch_date,
                  landing_date: data.rover.landing_date,
                  status: data.rover.status,
                  total_photos: data.rover.total_photos
              }
          }
      };
    };

    /**
     * @description Parses data
     * @param data
     * @returns {any}
     */
    static parse(data) {
        return JSON.parse(data);
    }

    /**
     * @param data
     * @returns {any} photos
     */
    static photos(data) {
        return data.photos;
    }

    /**
     * @description Composes functions passed as parameters and invokes them from right to left
     * @param functions
     * @returns {function(*): *}
     */
    static compose = (...functions) => data =>
        functions.reduceRight((result, func) => func(result), data);

    /**
     * @description Takes first 4 photos from NASA API response
     * @param photos
     * @returns {*} object with photo details
     */
    static getPhotosData(photos) {
        return photos.slice(0, 4).map(photo => {
            return { sol: photo.sol, img_src: photo.img_src };
        })
    }

    /**
     * @description Concats photos to common data
     * @param commonData
     * @param photos
     * @returns {*} common data with concatenated photos
     */
    static concatPhotos(commonData, photos) {
        commonData.data.photos = photos;
        return commonData;
    };

    /**
     * @description Parses NASA API response and creates response to be sent
     * @param response
     * @returns {*} Response data
     */
    static getResponseData(response) {
        let parseData = MarsApiHandler.compose(MarsApiHandler.photos, MarsApiHandler.parse);
        const data = parseData(response);
        if(data.length === 0) {
            return data;
        }
        return MarsApiHandler.concatPhotos(MarsApiHandler.getCommonData(data[0]), MarsApiHandler.getPhotosData(data));
    };

    /**
     * @description Sends request to NASA API and handles response
     * @param https
     * @param url
     * @param options
     * @param responseObject
     * @returns {function(*): function(*): function(*): void}
     */
    static callApi(https, url, options, responseObject) {
        let apiResponse = '';
        https.get(url, options, (response) => {
            response.on('data', (data) => {
                apiResponse += data.toString();
            });

            response.on('end', () => {
                const finalData = MarsApiHandler.getResponseData(apiResponse);
                responseObject.setHeader('content-type', 'application/json; charset=utf-8');
                responseObject.send(JSON.stringify(finalData));
            });
        });
    };
}

module.exports = MarsApiHandler;