class ContentCreator {
    /**
     * @returns {HTMLElement} content container
     */
    #getContentContainer(){
        return document.getElementById('content-container');
    };

    /**
     * @returns {{rover, earthDate}}
     */
    #getInputs() {
        return {
            rover: document.getElementById('rover').value,
            earthDate: document.getElementById('earth-date').value
        };
    };

    /**
     * @description Creates tabs container div
     * @param parentContainer
     * @returns {HTMLDivElement} tabs container
     */
    #createTabsContainer(parentContainer){
        return HtmlHelper.createDiv(parentContainer, 'tabs-container');
    };

    /**
     * @description Replaces underscore with hyphen in camera name
     * @param camera
     * @returns {*|string} Formatted camera name
     */
    #replaceUnderscore(camera) {
        const parts = camera.split('_');
        return parts.length === 1 ? parts[0] : `${parts[0]}-${parts[1]}`;
    };

    /**
     * @description Creates tab
     * @param parentContainer
     * @param camera
     * @returns {function(*): HTMLAnchorElement} tab link
     */
    #createTab(parentContainer, camera) {
        const tabElement = HtmlHelper.createDivWithIDClass(parentContainer, `${camera}-tab`, 'tab');
        const anchorElement = HtmlHelper.createAnchor(tabElement, '#', camera);
        const formattedCameraName = this.#replaceUnderscore(camera);
        HtmlHelper.createSpan(anchorElement, 'tab-name', formattedCameraName);
        return anchorElement;
    };

    /**
     * @description Differentiates active and inactive tab
     * @param camera
     * @param activate
     * @returns {(function(*): void)|*}
     */
   #manipulateTab(camera, activate) {
       let tabElement = document.getElementById(`${camera}-tab`);
       if(activate)
            tabElement.style.backgroundColor = 'lightgray';
       else
            tabElement.style.backgroundColor = 'cornsilk';
   };

    /**
     * @description Checks which camera tab is active and inactive and manipulates tab accordingly
     * @param camera
     */
    #inactivateOtherTabs(camera) {
        const camerasElement = document.getElementById('cameras');
        const cameras = camerasElement.value.split(',');
        cameras.forEach(currentCamera => {
           if(currentCamera !== camera)
               this.#manipulateTab(currentCamera, false);
        });
    };

    /**
     * @description removes tab content container
     */
    #removeTabContent() {
        const tabContentContainer = document.getElementById('tab-content-container');
        tabContentContainer.remove();
    };

    /**
     * @description Adds tab click event listener
     * @param parentContainer
     * @param element
     * @param camera
     * @returns {function(*): function(*): void}
     */
    #addClickEventListener(parentContainer, element, camera) {
        element.addEventListener('click', async event => {
            this.#manipulateTab(camera, true);
            this.#inactivateOtherTabs(camera);
            this.#removeTabContent();
            const inputs = this.#getInputs();
            const data = await this.#getData(inputs, camera);

            this.#createTabContent(parentContainer, camera, data);
        }, {
            capture: false
        });
    };

    /**
     * @description Concatenates camera names and stores in hidden element
     * @param cameras
     */
    #saveCameras(cameras) {
        const camerasElement = document.getElementById('cameras');
        let joinedValue = '';
        for(let index = 0; index < cameras.length; index++) {
            joinedValue += joinedValue === '' ? cameras[index] : `,${cameras[index]}`;
        }
        camerasElement.value = joinedValue;
    };

    /**
     * @description Creates tab and adds event listener
     * @param parentContainer
     * @returns {(function(*): void)|*}
     */
    #createTabs(parentContainer, cameras) {
        const tabsContainer = this.#createTabsContainer(parentContainer);
        cameras.forEach(camera => {
            const clickableElement = this.#createTab(tabsContainer, camera);
            this.#addClickEventListener(parentContainer, clickableElement, camera);
        });
    };

    /**
     * @param formInput
     * @param camera
     * @returns {function(*): ApiInput} ApiInput instance
     */
    #apiInput(formInput, camera) {
        return new ApiInput(formInput.rover, formInput.earthDate, camera);
    }

    /**
     * @description Gets common data as well as photos
     * @param formInput
     * @param camera
     * @returns {function(*): Promise<*|PhotosData>} Photos data
     */
    async #getData(formInput, camera) {
        const inputData = this.#apiInput(formInput, camera);
        const backendApi = new BackendApiHandler(inputData);
        return await backendApi.getPhotosData();
    };

    /**
     * @description Creates tab content
     * @param parentContainer
     * @param camera
     * @param data
     * @returns {function(*): function(*): void}
     */
    #createTabContent(parentContainer, camera, data) {
        const tabContent = new TabContentCreator(data);
        tabContent.createContent(parentContainer);
    };

    /**
     * @description Creates first tab content
     * @param inputs
     * @param container
     * @param camera
     * @returns {function(*): function(*): Promise<void>}
     */
    async #createFirstTabContent(inputs, container, camera) {
        const data = await this.#getData(inputs, camera);
        this.#createTabContent(container, camera, data);
    }

    /**
     * @description Creates content including tabs, tab content
     * @param cameras
     */
    createContent(cameras) {
        const container = this.#getContentContainer();
        const inputs = this.#getInputs();
        const selectedRoverCameras = cameras().get(inputs.rover);
        this.#saveCameras(selectedRoverCameras);
        this.#createTabs(container, selectedRoverCameras);
        this.#createFirstTabContent(inputs, container, selectedRoverCameras[0]);
        this.#manipulateTab(selectedRoverCameras[0], true);
    };
}