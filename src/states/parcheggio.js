import { ref, reactive } from 'vue'

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:3000`;
const API_URL = HOST + '/v1';
const PARK_URL = API_URL+'/parcheggio/';

// Inizalizzazione variabili per le funzioni che gestiscono le chiamate
const park = reactive([]);
const parkid = ref(null);
const parksearch = reactive([])
const error = ref(null);
const errorid = ref(null);
const errorsearch = ref(null);

/* Funzione che fa il fetch della GET su /parcheggio/ nel backend*/
async function fetchPark(){
    try{
        let data = await fetch(PARK_URL);
        if(!data.ok){
            throw new Error("Data not found");
        }
        data = await data.json();
        park.value = data.parcheggi;
    }catch(err){
        error.value = err.message;
    }
};

/** Funzione che fa il GET id su parcheggio/parcheggioId nel backend
* @param {String} parcheggioId id del parcheggio di cui si cercano maggiori informazioni
**/
async function fetchParkId(parcheggioId){
    try{
        let data = await fetch(PARK_URL + ":"  + parcheggioId);
        if(!data.ok){
            throw new Error("Data not found");
        }
        parkid.value = await data.json();
    }catch(err){
        errorid.value = err.message;
    }
};

/** Funzione che fa il GET ricerca per trovare il posto più vicino ad un parcheggio
* @param {int} lat latitudine della meta
* @param {int} long longitudine della meta
* @param {boolean} isCoperto booleano che indica se il parcheggio cercato è booleano o meno
* @param {string} comboPosti stringa che indica il tipo di posto che si cerca nel parcheggio
* @param {string} comboVeicolo stringa che indica il tipo di veicolo che si vuole parcheggiare
*/
async function fetchParkSearch(lat, long, isCoperto, comboPosti, comboVeicolo){
    let tipoUtente, tipoVeicolo;
    switch(comboPosti){
        case "Disabili":{
            tipoUtente = "disabile";
            break;
        }
        case "Donne in attesa":{
            tipoUtente = "gravidanza";
            break;
        }
        default:{
            tipoUtente = "default";
            break;
        }
    }
    switch(comboVeicolo){
        case "Auto":{
            tipoVeicolo = "auto";
            break;
        }
        case "Moto":{
            tipoVeicolo = "moto";
            break;
        }
        case "Furgone":{
            tipoVeicolo = "furgone";
            break;
        }
        case "Bus":{
            tipoVeicolo = "bus";
            break;
        }
        default:{
            tipoVeicolo = "default";
            break;
        }
    }
    try{
        const ricercaURL = PARK_URL + "ricerca?lat=" + lat + "&long=" + long + "&isCoperto=" + isCoperto + "&utente=" + tipoUtente + "&veicolo=" + tipoVeicolo;
        console.log(ricercaURL)
        let data = await fetch(ricercaURL);
        if(!data.ok){
            throw new Error("Data not found");
        }
        parksearch.value = await data.json();
    }catch(err){
        errorsearch.value = err.message;
    }
};

export { park,parkid,parksearch, error, errorid, errorsearch, fetchPark, fetchParkId,  fetchParkSearch};