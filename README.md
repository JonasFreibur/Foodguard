# Food guard - Web demo application

* Bach Jacques
* Freiburghaus Jonas

## Introduction

This project aims at predicting if someone is eating too fast using the Suunto Movesense worn on the wrist.

A Convolutional recurrent neural network implemented with Tensorflow for python is trained on the (Wireless Sensor Data Mining) WISDM dataset.

```
Jennifer R. Kwapisz, Gary M. Weiss and Samuel A. Moore (2010). Activity Recognition using Cell Phone Accelerometers, Proceedings of the Fourth International Workshop on Knowledge Discovery from Sensor Data (at KDD-10), Washington DC.
```

The selected features are the accelerometer and gyroscope data. Both on the three axis (x, y, z). The model takes as input data recorded on a window of 2 seconds sampled at 20 Hz. Resulting in an input shape of (batch_size, n_timestamps, n_features) = (, 50, 6).

The model is then exported for later use with Tensorflow.js.

The web application is developed for use with the Suunto Movesense running the 2.0 preview firmware.

## Installation

As BLE is an experimental feature which require some amount of security our application needs to run with https.

We can generate a self-signed SSL certificate and key using the script `generate_ssl.sh`.

In a unix terminal run the following lines :

```bash
chmod u+x generate_ssl.sh
./generate_ssl.sh
```

Some information will be requested, you can fill it as you wish. The output should be the certificate `cert.pem` file and the key `key.pem`.

Then we need to install the required packages for Node.js using the command `npm install`.

To start the project `npm start`. Once the server is started you should be able to navigate to https://localhost:8000.


