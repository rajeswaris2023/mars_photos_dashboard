class ApiParams {
    #roverName;
    #earthDate;
    #camera;

    /**
     * @description Represents API Query params
     * @param rover
     * @param earthDate
     * @param camera
     * @constructor
     */
    constructor(rover, earthDate, camera) {
        this.#roverName = rover;
        this.#earthDate = earthDate;
        this.#camera = camera;
    }

    /**
     * @returns {*} this rover name
     */
    getRoverName() {
        return this.#roverName;
    }

    /**
     * @returns {*} this earth date
     */
    getEarthDate() {
        return this.#earthDate;
    }

    /**
     * @returns {*} this camera name
     */
    getCamera() {
        return this.#camera;
    }
}

module.exports = ApiParams;