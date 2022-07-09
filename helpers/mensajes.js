const { resolve } = require('path');

require('colors');


const mostrarMenu = () =>{

    return new Promise(resolve =>{
        
        console.clear();
        console.log('======================================'.red)
        console.log('       Selecciona una Opcion')
        console.log('======================================\n'.red)

        console.log(`${'1.'.blue} Crear tarea`);
        console.log(`${'2.'.blue} Listar tarea`);
        console.log(`${'3.'.blue} Listar tareas completadas`);
        console.log(`${'4.'.blue} Listar tareas pendientes`);
        console.log(`${'5.'.blue} Completar tarea`);
        console.log(`${'6.'.blue} Borrar tarea`);
        console.log(`${'0.'.blue} Salir\n`);

        const readline = require('readline').createInterface({
            input : process.stdin,
            output : process.stdout
        });

        readline.question('Seleccione una opcion : ',(opt) =>{
            readline.close();
            resolve(opt);
        });
    })

    
}

const pausa = () =>{

    return new Promise(resolve =>{
        const readline = require('readline').createInterface({
            input : process.stdin,
            output : process.stdout
        });
    
        readline.question( `\n Presione ${'ENTER'.red} para continuar\n`,(opt) =>{
            readline.close();
            resolve();
        });
    })

   
}

module.exports={
    mostrarMenu,
    pausa
}