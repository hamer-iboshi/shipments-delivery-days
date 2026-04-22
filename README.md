# shipments-delivery-days

## Description

Endpoints:
```
POST /shipments 
BODY EXAMPLE: { "origin": "New York", "destination": "Los Angeles", "weight": 1000 }

GET /shipments/:id

PATCH /shipments/:id
BODY EXAMPLE: { status: 'In Transit' }

DELETE /shipments/reset
```

## Note

For this project, I limited origin and destination to 10 US states: ```["California","Texas","Florida","New York","Pennsylvania","Illinois","Ohio","Georgia","North Carolina"];```.

I got from Gemini a list of driving distances in kilometers between major metropolitan hubs in each state (e.g., NYC for New York, LA for California, Chicago for Illinois.
 ```src/files/distances.json````

Available shipping status to update status: ```["Pending", "In Transit", "Delivered"]```


## Installing

Clone the repository:

```git clone https://github.com/hamer-iboshi/shipments-delivery-days.git```

Change directory to the repository:

```cd shipments-delivery-days/```

Use [npm](https://www.npmjs.com/get-npm) to install the packages or [yarn](https://yarnpkg.com/en/docs/install) . 

Install [nvm](https://www.nvmnode.com/guide/download.html) and node24
```nvm install 24```

```nvm use```

```npm install```

Configure the file .env:
```cp .env.example .env```

Set the varibles in .env file:
```
PORT=8080
NODE_ENV=dev
```


Run application:
```npm run start```
or
```npm run dev```

## Testing instructions

Run tests:
```npm run test```
