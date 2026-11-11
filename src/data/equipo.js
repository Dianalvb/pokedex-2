//Todo lo que habla con firestore
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import{db} from '../firebase'
import {validarEquipo} from '../logic/equipo'

/*Nombre de la tabla en firestor donde se guardarán 
todos los documentos de los equipos: */
const COLECCION ='equipos' 

/*
SEGUNDA PUERTA
Como es una operación que habla con la nube usa async/await
1. vuelve a pasar equipo por validarEquipo para asegurarse 
que no hay error

2. Limpia los datos quitando espacios (.trim()), recorre la 
lista de pokemon y extrae las propiedades esenciales (pokemones.map()), 
Le pide al servidor de firebase que guarde fecha y hora de cuando 
se creo el registro (creadoEn: serverTimestamp())

3. Sube el documento a la coleccion equipos con addDoc y devuelve un onjeto 
con el id unico que firebase le asignó a ese documento en la base de 
datos ({id: ref.id})
*/
export async function guardarEquipo(equipo){
    //1.
    const {valido, errores}= validarEquipo(equipo)
    if(!valido) throw new Error(`Equipo invalido: ${errores.join(', ')}`)
    
    //2.
    const documento ={
        nombre: equipo.nombre.trim(),
        pokemones: equipo.pokemones.map(({id, nombre, img, tipos})=>({id, nombre, img, tipos})),
        creadoEn:serverTimestamp()
    }

    //3.
    const ref = await addDoc(collection(db, COLECCION), documento)
    return {id: ref.id}
}

/* 
1. query() -> Le pide a firebase que traiga todos los documentosde 
la coleccionde equipos
orderBy() -> ordena los documentos de la coleccion equipos en orden 
descendiente

2. snap.docs.map() -> transforma los datos que devuelve firebase 
en arreglo limpio de js que la aplicación de react pueda leer facilmente.
A cada documento le extrae el id asignado por firebase y le junta todas
sus propiedades internas
*/

export async function cargarEquipos(){
    const snap = await getDocs(query(collection(db, COLECCION), orderBy('creadoEn', 'desc')))//1. 
    return snap.docs.map((d)=>({id:d.id, ...d.data()}))//2. 
}

/*
Recibe el identificador unico del equipo que s quiere eliminar

1. Localiza el documento dentro de la colección equpos usando ese id
y lo borra permanentemente de la base de datos.
*/
export async function borrarEquipo(id){
    await deleteDoc(doc(db,COLECCION,id))
}