export async function agregar(p, setEquipo, equipo, setErrorEquipo){
    if (equipo.length >= 6) return //1. cantidad: si es mayor a 6 no hace nada
    if (equipo.some((e) => e.id === p.id)) return //2. sin repetir: si un pokemon ya esta en el equipo no hace nada
    try {
      setErrorEquipo(null) //3. sin errores: elimina errores anteriores
      await setDoc(doc(db, 'equipo', String(p.id)), p) //4. guardar: guarda en la base de datos en la direccion doc(db, 'equipo, String(p.id)) y p es lo que se guarda
      setEquipo([...equipo, p]) //5. agregar a lista: copia con la lista que ya teniamos y se le agrega p
    } catch (err) {
      setErrorEquipo(`No se pudo guardar en el equipo: ${err.message}`) //6. mensaje error
    }
  }