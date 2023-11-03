class Controller {
    constructor() {
        this.view = new ListRecipesView();
    }

    initRecipePage() {
        this.view.displayRecipesInfos({ recipes });
    }
}

const controller = new Controller();
controller.initRecipePage();