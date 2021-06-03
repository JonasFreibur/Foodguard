class BLEDevice {

    constructor() {
        this.device = null;
        this.server = null;
    }

    static isWebBluetoothEnabled() {
        return navigator.bluetooth;
    }

    async connectGatt() {
        try {
            this.server = await this.device.gatt.connect();
        } catch(e) {
            console.log(e);
        }

        return this.server;
    }

    async disconnect() {
        try {
            await this.device.gatt.disconnect();
        } catch(e) {
            console.log(e);
        }
    }

    async readAvailableServices() {
        return await this.server.getPrimaryServices();
    }

    async readCharacteristic(serviceUuid, characteristicUuid) {
        let characteristic = null;

        try {
            const service = await this.server.getPrimaryService(serviceUuid)
            characteristic = await service.getCharacteristic(characteristicUuid);
        } catch(e) {
            console.log(e);
        }

        return characteristic;
    }

    async readCharacteristicDescriptor(serviceUuid, characteristicUuid) {
        let descriptorsUuid = null;

        try {
            const service = await this.server.getPrimaryService(serviceUuid)
            const characteristic = await service.getCharacteristic(characteristicUuid);
            const descriptors = await characteristic.getDescriptors();
            descriptorsUuid = descriptors.map(descriptor => descriptor.Uuid);
        } catch(e) {
            console.log(e);
        }

        return descriptorsUuid;
    }

    async readServiceCharacteristics(serviceUuid) {
        let serviceCharacteristics;

        try {
            const service = await this.server.getPrimaryService(serviceUuid)
            serviceCharacteristics = await service.getCharacteristics();
        } catch(e) {
            console.log(e);
        }

        return serviceCharacteristics;
    }

    readSupportedProperties(characteristic) {
        let supportedProperties = [];
        for (const p in characteristic.properties) {
            if (characteristic.properties[p] === true) {
                supportedProperties.push(p.toUpperCase());
            }
        }
        return '[' + supportedProperties.join(', ') + ']';
      }

    async request(options) {
        try {
            this.device = await navigator
                .bluetooth
                .requestDevice(options);
        }
        catch(e) {
            console.log(e);
        }

        return this.device;
    }

    async startNotification(serviceUuid, characteristicUuid, notificationHandler) {
        let characteristic = null;

        try {
            const service = await this.server.getPrimaryService(serviceUuid);
            characteristic = await service.getCharacteristic(characteristicUuid);
            await characteristic.startNotifications();
            characteristic.addEventListener('characteristicvaluechanged', notificationHandler);
        } catch(e) {
            console.log(e);
        }

        return characteristic;
    }

    async stopNotification(characteristic, notificationHandler) {
        try {
            characteristic.stopNotification();
            character.removeEventListener(notificationHandler);
        } catch(e) {
            console.log(e);
        }
    }

    async subscribe(characteristic, command, reference, resource) {
        let subscribeAccCmd = new Uint8Array([command, reference]);
        let subscribeRes =  new Uint8Array(new TextEncoder().encode(resource));
        let fullCommand = new Uint8Array(subscribeAccCmd.length + subscribeRes.length);
        fullCommand.set(subscribeAccCmd);
        fullCommand.set(subscribeRes, subscribeAccCmd.length);
        await characteristic.writeValue(fullCommand);
    }

    async unsubscribe(characteristic, command, reference) {
        let unsubscribeAccCmd = new Uint8Array([command, reference]);
        await characteristic.writeValue(unsubscribeAccCmd);
    }
}