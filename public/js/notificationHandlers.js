const handleSensorNotification = (event, eventName, pubSub, parser) => {
    let value = event.target.value;
    let uint8View = new Uint8Array(value.buffer);
    let response = uint8View[0];
    let reference = uint8View[1];

    console.log("Byte length: " + value.byteLength);

    if(response == RESPONSES.DATA && reference == REFERENCES.ACCDATA) {
        parser(value, pubSub, eventName);
    }
};