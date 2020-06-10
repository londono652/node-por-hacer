const argv = require('./config/yargs').argv;

const porhacer = require('./por-hacer/por-hacer');

colors = require('colors');

let comando = argv._[0];

switch (comando) {

    case 'crear':
        let tarea = porhacer.crear(argv.descripcion);
        porhacer.guardarDB();
        console.log(tarea);
        break;
    case 'listar':

        let listado = porhacer.getListado();

        for (let tarea of listado) {
            console.log('===========Por hacer=============='.green);
            console.log(tarea.descripcion);
            console.log('Estado:', tarea.completado);
            console.log('=================================='.green);
        }
        break;
    case 'actualizar':

        let actualizado = porhacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porhacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando no válido');

}