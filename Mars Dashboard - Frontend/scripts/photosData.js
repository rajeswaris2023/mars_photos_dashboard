class PhotosData {
    #earthDate;
    #cameraInfo;
    #roverInfo;
    #photos;

    /**
     * @description Represents parsed and formatted photos data from api response
     * @param earthDate
     * @param cameraInfo
     * @param roverInfo
     * @param photos
     * @constructor
     */
    constructor(earthDate, cameraInfo, roverInfo, photos) {
        this.#earthDate = earthDate;
        this.#cameraInfo = cameraInfo;
        this.#roverInfo = roverInfo;
        this.#photos = photos;
    }

    /**
     * @returns earth date
     */
    getEarthData(){
        return this.#earthDate;
    }

    /**
     * @returns camera info
     */
    getCameraInfo(){
        return this.#cameraInfo;
    }

    /**
     * @returns rover info
     */
    getRoverInfo(){
        return this.#roverInfo;
    }

    /**
     * @returns photos
     */
    getPhotos() {
        return this.#photos;
    }
}