//Funciones puras

export const MAX_EQUIPO = 6

export const MENSAJES = {
    SIN_NOMBRE: 'Ponle nombre a tu equipo',
    VACIO: 'agrega al menos un pokemon',
    DEMASIADOS: `Un equipo tiene máximo ${MAX_EQUIPO} Pokemon`
}
export function crearEquipo(){
    return {nombre:'', pokemones:[]}
}

/*revisa mediante el método .some() 
    si un pokemon identificado por su id 
    ya forma parte del equipo para evitar
    duplicados: */
export function estaEnEquipo(equipo, id){
    return equipo.pokemones.some((p)=>p.id === id)
}

export function estaLleno(equipo){
    return equipo.pokemones.length >= MAX_EQUIPO//comprueba si el equipo alcanzó el limite de pokemones
}

/*Si el equipo esta lleno o si el id del 
pokemon ya esta te devuelve el equipo sin cambios */
export function agregarPokemon(equipo, pokemon){
    if(estaLleno(equipo) || estaEnEquipo(equipo, pokemon.id))return equipo
    const {id, img, nombre, tipos} = pokemon
    return {...equipo, pokemones:[...equipo.pokemones, {id, nombre, img, tipos}]} //devuelve una copia exacta del equipo anterior, pero con su lista de pokemon actualizada al final de este nuevo arreglo
}

/*.filter() -> crea un nuevo arreglodescartando los 
elementos que no cumplan la condicion 

(p) => !== id -> quedate con los pokemones con ide diferente al id que euiero eliminar
*/
export function quitarPokemon(equipo,id){
    return {...equipo, pokemones: equipo.pokemones.filter((p)=>p.id !== id)}
}

/*Actualiza o pone nombre, manteniendo las 
propiedades intactas */
export function ponerNombre(equipo, nombre){
    return {...equipo, nombre}
}

/*Revisa si el equipo cumple con todas las reglas 
antes de guardarlo o enviarlo a la base de datos
.trim() -> le quita los espacios
 */
export function validarEquipo(equipo){
    const errores = []
    if(equipo.nombre.trim()==='') errores.push('SIN_NOMBRE')
    if(equipo.pokemones.length===0) errores.push('VACIO')
    if(equipo.pokemones.length > MAX_EQUIPO) errores.push('DEMASIADOS')
    
    return{valido: errores.length ===0, errores}
}