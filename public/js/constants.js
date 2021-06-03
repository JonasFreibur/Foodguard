const SERVICES = [
    'battery_service',
    '34802252-7185-4d5d-b431-630e7050e8f0',
    '0000fdf3-0000-1000-8000-00805f9b34fb',
    '00001800-0000-1000-8000-00805f9b34fb',
    '0000180a-0000-1000-8000-00805f9b34fb',
    '0000180f-0000-1000-8000-00805f9b34fb',
    '00001801-0000-1000-8000-00805f9b34fb',
];

const CHARACTERISTICS = [
    '17816557-5652-417f-909f-3aee61e5fa85',
    '34800001-7185-4d5d-b431-630e7050e8f0',
    '34800002-7185-4d5d-b431-630e7050e8f0',
    '6b200001-ff4e-4979-8186-fb7ba486fcd7',
    '6b200002-ff4e-4979-8186-fb7ba486fcd7',
    '00002a00-0000-1000-8000-00805f9b34fb',
    '00002a01-0000-1000-8000-00805f9b34fb',
    '00002a04-0000-1000-8000-00805f9b34fb',
    '00002aa6-0000-1000-8000-00805f9b34fb',
    '00002a25-0000-1000-8000-00805f9b34fb',
    '00002a29-0000-1000-8000-00805f9b34fb',
    '00002a19-0000-1000-8000-00805f9b34fb',
    '00002a05-0000-1000-8000-00805f9b34fb',
];

const COMMANDS = {
    HELLO: 0,
    SUBSCRIBE: 1,
    UNSUBSCRIBE: 2
};

const REFERENCES = {
    HELLO: 123,
    ACCDATA: 99
};

const RESOURCES = {
    ACCELEROMETER: '/Meas/Acc/13',
    GYROMETER: '/Meas/Gyro/13',
    MAGNETOMETER: '/Meas/Magn/13',
    IMU6: '/Meas/IMU6/13',
    IMU6M: '/Meas/IMU6M/13',
    ECG: '/Meas/ECG/13'
};

const RESPONSES = {
    COMMAND_RESULT: 1,
    DATA: 2
}