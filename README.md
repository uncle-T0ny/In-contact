
# WARNING, IN PROGRESS

## Get started

### 1. Prepare front-end

install the dependencies
```
cd front
npm install
```

### 2. Prepare back-end

1) install the dependencies
```
cd back
npm install
```

2) create database
```
su - postgres (or user who manage databases)

createdb inconnect
```

2) set up database credentials in back/config/default.json
```
su - postgres (or user who manage databases)

createdb inconnect
```

### 3. run back-end server, and fron-end dev server

1) run back
```
cd back
npm run local
```

2) run front
```
cd front
npm run local
```


## TODO
- improve the contact list
- update delete operations with the contacts
- create docker container for application fast-run
- add tests for sagas
- create routes structure
- add fields validations