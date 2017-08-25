# ms-translate-cache
Microservice responsible to use an google api to translate text and save the results in cache

### Installation

ms-translate-cache use nvm to version control.
if you don't have nvm, install it [here](https://github.com/creationix/nvm/blob/master/README.md)

Run:

```
nvm use
```
Install the node package modules used on project:
```
npm install
```

Insert your google key on file ./path/to/keyfile.json

If you don't have a google key, you can create following this [google tutorial](https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/README.md) following Authentication > Elsewhere section

The last thing required is to run a local redis.

### Initialization

Start the micro service:

```
npm start
```

Run the command above to run unit tests:

```
npm test
```


### Dev

Run lint:

```
npm run lint
```