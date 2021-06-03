const parseIMU6 = (value, pubSub, eventName) => {
    let timestamp = value.getUint32(2, true);

    let numOfSamples = (value.byteLength - 6) / (3 * 4 * 2);

    const RAD = Math.PI / 180;

    for (let i = 0; i < numOfSamples; i++)
    {
        let xAcc = value.getFloat32(6 + i * 12, true);
        let yAcc = value.getFloat32(6 + i * 12 + 4, true);
        let zAcc = value.getFloat32(6 + i * 12 + 8, true);

        let xGyro = value.getFloat32(6 + (i + numOfSamples) * 12, true);
        let yGyro = value.getFloat32(6 + (i + numOfSamples) * 12 + 4, true);
        let zGyro = value.getFloat32(6 + (i + numOfSamples) * 12 + 8, true);

        pubSub.publish(eventName, {
            timestamp: timestamp,
            xAcc: xAcc,
            yAcc: yAcc,
            zAcc: zAcc,
            xGyro: xGyro * RAD,
            yGyro: yGyro * RAD,
            zGyro: zGyro * RAD
        });
    }
};