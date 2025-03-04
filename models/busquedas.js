const axios = require('axios');
require('dotenv').config()

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San José'];

    constructor() {

    }

    get paramsMapbox() {
        return {
            'proximity': 'ip',
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY
        }
    }

    async ciudad(lugar = '') {

        try {

            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name_es,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));



            return [];

        } catch (err) {

            return [];

        }

    }
}

module.exports = Busquedas;