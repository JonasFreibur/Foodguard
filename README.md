# Food guard - Web demo application

* Bach Jacques
* Freiburghaus Jonas

## Installation

As BLE is an experimental feature which require some amount of security our application needs to run with https.

We can generate a self-signed SSL certificate and key using the script `generate_ssl.sh`.

In a unix terminal run the following lines :

```bash
chmod u+x generate_ssl.sh
./generate_ssl.sh
```

Some information will be requested, you can fill it as you wish. The output should be the certificate `cert.pem` file and the key `key.pem`.


