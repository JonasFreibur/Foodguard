class Model{

    constructor(modelHref='model/model.json') {
        this.modelHref = modelHref;
        this.model = null;
    }

    async fetch() {
        this.model = await tf.loadLayersModel('model/model.json');
        console.log(this.model);
    }

}