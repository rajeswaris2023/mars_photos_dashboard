class TabContentCreator {
    #dataInfo;
    #noPhotoText = "No photos to display for this camera";

    /**
     * @description Represents tab content creator
     * @param data
     * @constructor
     */
    constructor(data) {
        this.#dataInfo = data;
    }

    /**
     * @description Creates tab content container
     * @param parentContainer
     * @returns {HTMLDivElement}
     */
    #createContainer(parentContainer) {
        return HtmlHelper.createDiv(parentContainer, 'tab-content-container');
    };

    /**
     * @description Formats tab content message
     * @returns {string} message
     */
    #getMessage() {
        const data = this.#dataInfo;
        const photos = data.getPhotos();
        const rover = data.getRoverInfo();
        return `${rover.name} rover was launched on ${rover.launch_date} and landed on Mars on ${rover.landing_date}.
                This rover has taken around ${rover.total_photos} photos and is ${rover.status}. These photos were taken on 
                ${photos[0].sol} Martian sol.`;
    };

    /**
     * @description Creates message container
     * @param parentContainer
     */
    #createMessageContainer(parentContainer) {
        const messageContainer = HtmlHelper.createDiv(parentContainer, 'message-container');
        const message = this.#getMessage();
        HtmlHelper.createSpan(messageContainer, 'tab-message', message);
    };

    /**
     * @description Creates photos container with photos in tiles
     * @param parentContainer
     */
    #createPhotosContainer(parentContainer) {
        const photosContainer = HtmlHelper.createDiv(parentContainer, 'photos-container');
        this.#dataInfo.getPhotos().forEach(photo => {
            const photoContainer = HtmlHelper.createDivWithClass(photosContainer, 'photo-container');
            HtmlHelper.createImage(photoContainer, photo.img_src);
        });
    };

    /**
     * @description Creates no photo container
     * @param parentContainer
     */
    #createNoPhotoContainer(parentContainer) {
        const noPhotoContainer = HtmlHelper.createDiv(parentContainer, 'no-photo-container');
        HtmlHelper.createH1(noPhotoContainer, this.#noPhotoText);
    };

    /**
     * @description Creates content
     * @param parentContainer
     */
    createContent(parentContainer) {
        const container = this.#createContainer(parentContainer);
        if(this.#dataInfo === undefined) {
            this.#createNoPhotoContainer(container);
        }
        else {
            this.#createMessageContainer(container);
            this.#createPhotosContainer(container);
        }
    };
}