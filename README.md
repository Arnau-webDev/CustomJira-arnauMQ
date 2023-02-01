# Next.js CustomJira App
To start running locally, you will need the database to be running
```
docker-compose up -d
```

* Here the flag -d means __detached__

* MongoDB local URL:
```
mongodb://localhost:27017/entriesdb
```

## Configure env variables
Rename the file __.env.template__ to __.env__

## Fill database with sample information
Call:
```
    http://localhost:3000/api/seed
```