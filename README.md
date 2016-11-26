# Raspberry Pi Monitor

A Node.js server that monitors the status and system information of a Raspberry
Pi.

## Features
- System information (hostname, OS, etc.)
- CPU info and readings
- Memory readings

## Features to be added
- CPU load
- Possible layer of controls (restart device, restart server, etc.)

## Development

### Requirements
- [Node.js](https://goo.gl/QXkkAl)
- [Yarn](https://goo.gl/QRG7dO) (optional, but significantly faster than `npm`)

To start developing, clone the repo and run the following:

```bash
# If you're using npm
$ npm install

# If you're using Yarn
$ yarn

# And now for the finishing touch
$ npm run dev
```

The server will now be listening on port 3000.