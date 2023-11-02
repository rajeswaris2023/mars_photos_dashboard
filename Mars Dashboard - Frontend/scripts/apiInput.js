class ApiInput {
    #rover;
    #earthDate;
    #camera;

    /**
     * @description Represents API Input
     * @param rover
     * @param earthDate
     * @param camera
     * @constructor
     */
    constructor(rover, earthDate, camera) {
        this.#rover = rover;
        this.#earthDate = earthDate;
        this.#camera = camera;
    }

    /**
     * @returns {*} rover
     */
    getRover() {
        return this.#rover;
    }

    /**
     * @returns {*} earth data
     */
    getEarthDate() {
        return this.#earthDate;
    }

    /**
     * @returns {*} camera
     */
    getCamera() {
        return this.#camera;
    }
}