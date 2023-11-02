const cameras = () => Immutable.Map({
    curiosity: Array.of('navcam', 'mast', 'mahli', 'mardi'),
    opportunity: Array.of('navcam', 'pancam', 'minites'),
    spirit: Array.of('navcam', 'pancam', 'minites'),
    perseverance: Array.of('navcam_left', 'navcam_right', 'skycam', 'sherloc_watson')
});

const clearContentArea = () => {
    const defaultContentElement = document.getElementById('default-content-area');
    if(defaultContentElement !== null) {
        defaultContentElement.remove();
        return;
    }
    const tabsContainer = document.getElementById('tabs-container');
    if(tabsContainer !== null) {
        tabsContainer.remove();
    }
    const tabContentContainer = document.getElementById('tab-content-container');
    if(tabContentContainer !== null) {
        tabContentContainer.remove();
    }
}

const createContent = () => {
    return new ContentCreator().createContent(cameras);
}

addEventListener('load', async (event) => {
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', async (event) => {
       clearContentArea();
       createContent();

       event.preventDefault();
    }, {
        capture: false
    });
});