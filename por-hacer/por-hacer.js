const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    return new Promise((resolve, reject) => {
        fs.writeFile(`./db/data.json`, data, (err) => {
            if (err) reject(err)
            else
                resolve(`./db/data.json`);
        });
    });
}

cargardb = () => {

    try {

        listadoPorHacer = require('../db/data.json');

    } catch (error) {

        listadoPorHacer = [];

    }

}

let getListado = () => {
    try {

        listadoPorHacer = require('../db/data.json');
        return listadoPorHacer;

    } catch (error) {

        listadoPorHacer = [];

    }

}


const crear = (descripcion) => {


    cargardb();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    return porHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargardb();

    let index = listadoPorHacer.findIndex(lista => lista.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}
const borrar = (descripcion) => {

    cargardb();
    nuevoListado = listadoPorHacer.filter(borrados => borrados.descripcion !== descripcion)

    if (nuevoListado.length === listadoPorHacer.length) {
        return false
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    guardarDB,
    getListado,
    actualizar,
    borrar
}