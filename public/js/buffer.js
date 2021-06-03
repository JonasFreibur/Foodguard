class DataBuffer {

    constructor(pubSub, eventName, maxSize = 50) {
        this.pubSub = pubSub;
        this.eventName = eventName;
        this.maxSize = maxSize;
        this._buffer = [];
    }

    push(data) {
        if(this._buffer.length >= 50) {
            this.pubSub.publish(this.eventName, this._buffer);

            this._buffer = [];
        }

        this._buffer.push(data);
    }

}