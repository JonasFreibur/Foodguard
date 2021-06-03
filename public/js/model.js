class Model{

    constructor(modelHref='model/model.json') {
        this.modelHref = modelHref;
        this.model = null;
    }

    async fetch() {
        this.model = await tf.loadLayersModel('model/model.json');
    }

    async predict(tensor) {
        return await this.model.predict(tensor).data();
    }

}

class L2 {

    static className = 'L2';

    constructor(config) {
       return tf.regularizers.l2(config)
    }

}

tf.serialization.registerClass(L2);