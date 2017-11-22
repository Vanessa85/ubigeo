# Ubigeo
Provides data about regions, provincies and districts of the country Peru.

Ubigeo son las siglas oficiales para Código de UBIcación GEOgráfica, que usa el INEI para codificar las circunscripciones territoriales del Perú ([wikipedia](https://es.wikipedia.org/wiki/Ubigeo)).


## Install
```sh
npm install --save ubigeo
yarn add ubigeo
```

## Usage
```js
const ubigeo = require('ubigeo')

let regions = ubigeo.data
let regions_provincies = ubigeo.include('provincies').data
let regions_districts = ubigeo.include('districts').data

let ucayali = ubigeo.find({ name: 'ucayali' }).data // {code: 'xxx'} or {name: 'xxx'}
let ucayali_provincies = ubigeo.find({ name: 'ucayali' }).include('provincies').data
let ucayali_districts = ubigeo.find({ name: 'ucayali' }).include('districts').data

console.log(ucayali_provincies)
/*
[
 {
  "code": "25",
  "name": "Ucayali",
  "provincies": [
   {
    "code": "01",
    "provincie": "Coronel Portillo"
   },
   {
    "code": "02",
    "provincie": "Atalaya"
   },
   {
    "code": "03",
    "provincie": "Padre Abad"
   },
   {
    "code": "04",
    "provincie": "Purús"
   }
  ]
 }
]
*/
```

Inserting into an existing table using Sequelize

```js
const ubigeo = require('ubigeo')
const Sequelize = require('sequelize')

const db = new Sequelize('postgres://user:pass@example.com:5432/dbname', {
  define: {
    timestamps: false
  }
})

const Region = db.define('region', {
  code: Sequelize.STRING,
  name: Sequelize.STRING
})

Region.bulkCreate(ubigeo.data)
  .then(() => {
    return Region.findAll({ raw: true });
  }).then( regions => {
    console.log(regions)
    db.close()
  })
```

## License
MIT
