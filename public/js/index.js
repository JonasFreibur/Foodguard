document.addEventListener('DOMContentLoaded', function() {
    let ble = new BLEDevice();

    let model = new Model();
    model.fetch();

    let hasBtCapacity = BLEDevice.isWebBluetoothEnabled();

    if(!hasBtCapacity) {
        console.error("Web bluetooth is not available in this browser");
    }

    let btnConnect = document.getElementById('connect');
    let btnDisconnect = document.getElementById('disconnect');

    let pStatus = document.getElementById('status');

    let ctxAccX = document.getElementById('chartAccX');
    let ctxAccY = document.getElementById('chartAccY');
    let ctxAccZ = document.getElementById('chartAccZ');
    let ctxGyroX = document.getElementById('chartGyroX');
    let ctxGyroY = document.getElementById('chartGyroY');
    let ctxGyroZ = document.getElementById('chartGyroZ');
    let ctxPred = document.getElementById('chartPrediction');

    let liveChartAccX = new LiveChart(ctxAccX, { min: -100, max: 100 });
    let liveChartAccY = new LiveChart(ctxAccY, { min: -100, max: 100 });
    let liveChartAccZ = new LiveChart(ctxAccZ, { min: -100, max: 100 });
    let liveChartGyroX = new LiveChart(ctxGyroX, { min: -1000, max: 1000 });
    let liveChartGyroY = new LiveChart(ctxGyroY, { min: -1000, max: 1000 });
    let liveChartGyroZ = new LiveChart(ctxGyroZ, { min: -1000, max: 1000 });
    let liveChartPrediction = new LiveChart(ctxPred, { min: 0, max: 1 });

    const options = {
        acceptAllDevices: true,
        optionalServices: SERVICES
    };

    btnConnect.addEventListener('click', async () => {
        const device = await ble.request(options);
        const server = await ble.connectGatt();

        device.addEventListener('gattserverdisconnected', () => {
            pStatus.innerHTML = 'No connected device';
        });

        pStatus.innerHTML = device.name;

        const services = await ble.readAvailableServices();
        services.forEach(async service => {
            const characteristics = await service.getCharacteristics();
            characteristics.forEach(async characteristic => {
                console.log('Service: ' + service.uuid);
                console.log('Characteristic: ' + characteristic.uuid);
                console.log('Properties: ' + ble.readSupportedProperties(characteristic));
                console.log('Descriptors: ' + await ble.readCharacteristicDescriptor(service.uuid, characteristic.uuid));
            });
        });

        let pubSub = new PubSub();

        let buffer = new DataBuffer(pubSub, 'fullBuffer');

        pubSub.subscribe('fullBuffer', async (buffer) => {
            let X = Object.keys(buffer[0])
                .filter(key => key !== 'timestamp')
                .map(key => buffer.map(data => data[key]));

            let tensor = tf.tensor(X).reshape([-1, 50, 6]);
            let prediction = await model.predict(tensor);
            console.log(prediction);
            liveChartPrediction.addData(prediction);
        });

        pubSub.subscribe('imu6', (data) => {
            buffer.push(data);

            liveChartAccX.addData(data.xAcc);
            liveChartAccY.addData(data.yAcc);
            liveChartAccZ.addData(data.zAcc);

            liveChartGyroX.addData(data.xGyro);
            liveChartGyroY.addData(data.yGyro);
            liveChartGyroZ.addData(data.zGyro);
        });

        await ble.startNotification(
            '34802252-7185-4d5d-b431-630e7050e8f0',
            '34800002-7185-4d5d-b431-630e7050e8f0',
            (event) => {
                handleSensorNotification(event, 'imu6', pubSub, parseIMU6);
            }
        );

        const sensorCharacteristic = await ble.readCharacteristic(
            '34802252-7185-4d5d-b431-630e7050e8f0',
            '34800001-7185-4d5d-b431-630e7050e8f0'
        );

        ble.subscribe(
            sensorCharacteristic,
            COMMANDS.SUBSCRIBE,
            REFERENCES.ACCDATA,
            RESOURCES.IMU6
        );
    });

    btnDisconnect.addEventListener('click', () => {
        ble.disconnect();
    });
});