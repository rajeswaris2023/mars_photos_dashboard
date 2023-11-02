class HtmlHelper {
    /**
     * @description Creates div HTML element
     * @param parentContainer
     * @param elementId
     * @returns {function(*): HTMLDivElement}
     */
    static createDiv(parentContainer, elementId) {
        const divElement = document.createElement('div');
        divElement.id = elementId;
        parentContainer.appendChild(divElement);
        return divElement;
    };

    /**
     * @description Creates div HTML element with class name
     * @param parentContainer
     * @param elementClass
     * @returns {function(*): HTMLDivElement}
     */
    static createDivWithClass(parentContainer, elementClass) {
        const divElement = document.createElement('div');
        divElement.className = elementClass;
        parentContainer.appendChild(divElement);
        return divElement;
    };

    /**
     * @description Creates div HTML element with identifier and class name
     * @param parentContainer
     * @param identifier
     * @param elementClass
     * @returns {function(*): function(*): HTMLDivElement}
     */
    static createDivWithIDClass(parentContainer, identifier, elementClass) {
        const divElement = document.createElement('div');
        divElement.id = identifier;
        divElement.className = elementClass;
        parentContainer.appendChild(divElement);
        return divElement;
    };

    /**
     * @description Creates h1 element
     * @param parentContainer
     * @param text
     * @returns {(function(*): void)|*}
     */
    static createH1(parentContainer, text) {
        const h1Element = document.createElement('h1');
        h1Element.innerHTML = text;
        parentContainer.appendChild(h1Element);
    }

    /**
     * @description Creates span element
     * @param parentContainer
     * @param innerHtml
     * @returns {function(*): function(*): void}
     */
    static createSpan(parentContainer, elementClass, innerHtml) {
        const spanElement = document.createElement('span');
        spanElement.className = elementClass;
        spanElement.innerHTML = innerHtml;
        parentContainer.appendChild(spanElement);
    }

    /**
     * @description Creates anchor element
     * @param parentContainer
     * @param elementHref
     * @param identifier
     * @returns {function(*): function(*): HTMLAnchorElement}
     */
    static createAnchor(parentContainer, elementHref, identifier) {
        const anchorElement = document.createElement('a');
        anchorElement.href = elementHref;
        anchorElement.id = identifier;
        parentContainer.appendChild(anchorElement);
        return anchorElement;
    };

    /**
     * @description Creates img element
     * @param parentContainer
     * @param imageSource
     * @returns {function(*): HTMLImageElement}
     */
    static createImage(parentContainer, imageSource) {
        const imageElement = document.createElement('img');
        imageElement.src = imageSource;
        parentContainer.appendChild(imageElement);
        return imageElement;
    }
}