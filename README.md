# Raspberry Pi Monitor

A Go server using React for monitoring the status and system information of
a Raspberry Pi.

## Features
- System information (hostname, OS, etc.)
- CPU info and readings
- Memory readings
- Live charts for monitoring

## Features to be added
- Possible layer of controls (restart device, reading refresh rate, etc.)

## Development

### Requirements
- [Go](https://golang.org/)
- [Node.js](https://goo.gl/QXkkAl)

To start developing, clone the repo and run the following:

```bash
$ npm install
$ npm run build/watch
$ go run app.go
```

The server will now be listening on port 3000 for production, or 4000 for
development.