import regions from './regions.json'
import districts from './districts.json'

class Ubigeo {
  constructor () {
    this.data = regions.map(item => _format(item.region))
  }

  get () {
    return this.data
  }

  include () {
    let values = Object.values(arguments)

    if (values.includes('provincies') || values.includes('districts')) {
      this.data = this.data.map(item => {
        item.provincies = values.includes('provincies') ? _getProvincies(item.code) : _getProvinciesWithDistricts(item.code)
        return item
      })
    }

    return this
  }

  find (keys) {
    if (keys) {
      if ('name' in keys) {
        this.data = this.data.filter(item => item.name.toLowerCase() === keys.name.toLowerCase())
      } else if ('code' in keys) {
        this.data = this.data.filter(item => item.code === keys.code.toString())
      }
    }

    return this
  }
}

function _format (item) {
  let temp = item.split(/\s(.*)/)

  return {
    code: temp[0],
    name: temp[1]
  }
}

function _getProvincies (code) {
  return regions.find(item => _format(item.region).code === code).provincies
}

function _getProvinciesWithDistricts (code) {
  return districts.filter(item => _format(item.provincie).code === code)
    .map(item => {
      let formatProvincie = _format(item.provincie.split(' - ')[1])
      return {
        code: formatProvincie.code,
        name: formatProvincie.name,
        districts: item.districts
      }
    })
}

module.exports = new Ubigeo()
