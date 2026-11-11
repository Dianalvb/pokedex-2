export function buscar(e, texto, setConsulta, setOffset) {

    e.preventDefault() //1. sin reiniciar cada que hay una busqueda
    setConsulta(texto.trim().toLowerCase()) //2. limpieza: quita del texto espacios, y mayusculas
    setOffset(0)
  }
  export function verTodos() {
    setTexto('')
    setConsulta('')
  }
      