// const  {inquirerMenu}  = require ('./helpers/inquirer');
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import {inquirerMenu , pausa, leerInput,listadoTareasBorrar,confirmar,mostrarListadoCheckList} from './helpers/inquirer.js';
import('colors');
import {Tarea} from './models/tarea.js';
import { Tareas } from './models/tareas.js';
console.clear();


const main = async() =>{

    let opt = '';
    
    const tareas = new Tareas();
    const tareasDB = leerDB();
    
    if(tareasDB ){
        //Establecer tareas
        const listadoTareas =  tareas.cargarTarea(tareasDB);
        // console.log(listadoTareas);
    }
    

    do {
        //Imprime el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                    // crear opcion
                    const desc = await leerInput('Descripcion : ');
                    tareas.crearTarea(desc);
                break;
            case '2':
                // console.log(tareas.listadoArr);
                console.log(tareas.listadoCompleto())
                break;
            case '3':
                tareas.listarCompletadasPendientes(true)
                break;
            case '4':
                tareas.listarCompletadasPendientes(false)
                break;
            case '5'://completado o pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': //Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id!== '0'){
                    const ok = confirmar('¿Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                
        }
        guardarDB(tareas.listadoArr);

        await pausa();
    } while (opt !== '0');


}

main();