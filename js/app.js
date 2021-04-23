// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    // Cundo agregas un curso presionanado 'Agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);
    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
       limpiarHTML(); //Se elimina todo el HTML
    })
}

//------------>Funciones<------------------------ 

function agregarCurso (e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
      const cursoSeleccionado = e.target.parentElement.parentElement;
      leerDatosCurso(cursoSeleccionado)
    } 
}

//Eliminar curso del carrito 

function eliminarCurso (e){
  e.preventDefault();
  if(e.target.classList.contains('borrar-curso')){
  const cursoId = e.target.getAttribute('data-id');
    //Eliminar del arreglo 
  articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId );
   
  carritoHTML(); //Iterando sobre el carrito y mostrando HTML
    
}

// Vaciar Carrito 


}
// Leer contenido HTML

function leerDatosCurso (curso){
  console.log(curso);
  // Creando un objeto de contenido del curso 
  const infoCurso = {
      imagen: curso.querySelector('img').src,
      titulo: curso.querySelector('h4').textContent,
      precio: curso.querySelector('.precio span').textContent,
      id: curso.querySelector('a').getAttribute('data-id'),
      cantidad: 1

  }
  //Revisar si un elemento existe en el carrito 

  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
   if(existe) {
    // Se actualiza la cantidad 
    const cursos  = articulosCarrito.map(curso => {
      if (curso.id === infoCurso.id){
        curso.cantidad++;
        return curso; //Retornamos el objeto actualizado
      }else {
        return curso; //Retornamos objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // Agregar curso al carrito
    articulosCarrito= [...articulosCarrito, infoCurso];
  }
   
  carritoHTML();  
}

// Mostrar carrito de compras en HTML 

function carritoHTML (){

  // Limpiando el HTML

  limpiarHTML();


  //Recorriendo elementos del acrrito y agregando contenido.
  articulosCarrito.forEach( curso => {
    console.log(curso);
    const {imagen, precio, titulo, cantidad, id} = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
      <img src = '${imagen}' width='100'>
    </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td>
       <a href="#" class="borrar-curso" data-id ="${id}"> X </a>
    </td>
    `;
//Agregar HTML del carrito en el tbody
  contenedorCarrito.appendChild(row)
  })
}

//Eliminar contenido del carrito 
function limpiarHTML(){
   while (contenedorCarrito.firstChild) {
     contenedorCarrito.removeChild(contenedorCarrito.firstChild)
     
   }
}