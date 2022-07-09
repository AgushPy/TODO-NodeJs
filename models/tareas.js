import { leerDB } from "../helpers/guardarArchivo.js";
import { Tarea } from "./tarea.js";

export class Tareas{

    _listado = {};

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });


        return listado;

    }


    constructor(){
        this._listado ={};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTarea(tareas = []){
        
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
        return this._listado;
    }

    crearTarea(desc = ''){
        
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        //  let listado = this.listadoArr;

        //  for (let i = 1; i < listado.length; i++) {
        //     console.log(`${`${i}`.red} ${ listado[i].desc} fail`)
            
        //  }
        console.log();
        this.listadoArr.forEach((tarea,i)=>{
            const idx = `${i +1}`.green ;
            const {desc , completadoEn} = tarea;
            const estado = (completadoEn)
                                    ?'Completada'.green
                                    :'Pendiente'.red;
            console.log(` ${idx} ${desc} :: ${estado} `)
        })
    }

    listarCompletadasPendientes(completadas = true){
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea)=>{
            const {desc , completadoEn} = tarea;
            if(completadas){
                if(completadoEn){
                    contador += 1;
                    let estado = 'Completada'.green
                    console.log(` ${contador.toString().red}. ${desc} :: ${completadoEn} `)
                }
            }else{
                if(!completadoEn){
                    let estado = 'Pendiente'.red
                    console.log(`${contador.toString().red}. ${desc} ${completadoEn}`);
                }
            }
            
                                    
        })
    }

    toggleCompletadas(ids = []){
        ids.forEach(id =>{

            const tarea = this._listado[id];
            if( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach(tarea => {
            
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null                
            }

        });
    }
}