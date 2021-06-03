const parseIMU6 = (value, pubSub, eventName) => {
    let timestamp = value.getUint32(2, true);

    let numOfSamples = (value.byteLength - 6) / (3 * 4 * 2);

    for (let i = 0; i < numOfSamples; i++)
    {
        let xAcc = value.getFloat32(6 + i * 12, true);
        let yAcc = value.getFloat32(6 + i * 12 + 4, true);
        let zAcc = value.getFloat32(6 + i * 12 + 8, true);

        // TODO : check is correct byte position
        let xGyro = value.getFloat32(6 + i * 12 + 12, true);
        let yGyro = value.getFloat32(6 + i * 12 + 16, true);
        let zGyro = value.getFloat32(6 + i * 12 + 20, true);

        pubSub.publish(eventName, {
            timestamp: timestamp,
            xAcc: xAcc,
            yAcc: yAcc,
            zAcc: zAcc,
            xGyro: xGyro,
            yGyro: yGyro,
            zGyro: zGyro
        });
    }
};