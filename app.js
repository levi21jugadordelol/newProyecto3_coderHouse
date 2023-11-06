const d = document;
const $formulario = d.querySelector("#formulario");
const modal = d.getElementById("modal");
const resultados = d.getElementById("resultados_alumnos");
const inputs = d.querySelectorAll("input");
const close = d.querySelector(".close");

const botonActualizar = d.querySelector(".actualizar");
let alumnoOriginal; // vartiable para almacenar la copia del objeto
let salon = [];

d.addEventListener("DOMContentLoaded", () => {
  cagarSalon();
  enviandoDatos();
});

class Alumno {
  constructor(nombre, codigo, nota1, nota2, nota3) {
    this.nombre = nombre;
    this.codigo = codigo;

    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
    this.validarNombre(nombre);
  }

  validarCadena(valor) {
    if (!valor) return console.warn("el valor esta vacio");
    if (typeof valor !== "string")
      return console.error("el valor debe ser una cadena de texto");
    return true;
  }

  validarNombre(nombre) {
    this.validarCadena(nombre);
  }
}

d.addEventListener("click", (e) => {
  if (e.target.matches(".enviar")) {
    e.preventDefault();

    infoAlumno();
  }
  if (e.target.matches(".close")) {
    modal.classList.toggle("translate");
  }
});

const infoAlumno = () => {
  const nombreInput = d.getElementById("nombre_alumno");
  const codigoInput = d.getElementById("codigo_alumno");
  const nota1Input = d.getElementById("nota_1");
  const nota2Input = d.getElementById("nota_2");
  const nota3Input = d.getElementById("nota_3");

  const nombre = nombreInput.value;
  const codigo = codigoInput.value;
  const nota1 = parseFloat(nota1Input.value);
  const nota2 = parseFloat(nota2Input.value);
  const nota3 = parseFloat(nota3Input.value);

  if (!nombre || !codigo || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
    alert(
      "Por favor, complete todos los campos y asegúrese de que las notas sean números válidos."
    );
    return;
  }

  const nuevaInstancia = new Alumno(nombre, codigo, nota1, nota2, nota3);

  salon.push({ ...nuevaInstancia });

  $formulario.reset();

  console.log(nuevaInstancia); // Mostrará la nueva instancia de la clase Persona
  enviandoDatos();
};

const enviandoDatos = () => {
  let tabla = d.getElementById("resultado_Alumnos");
  while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild);
  }
  salon.forEach((e) => {
    const fila = d.createElement("tr");
    const celdaNombre = document.createElement("td");
    const celdaCodigo = document.createElement("td");
    const celdaNota1 = document.createElement("td");
    const celdaNota2 = document.createElement("td");
    const celdaNota3 = document.createElement("td");
    const celdaAcciones = d.createElement("td");

    celdaNombre.textContent = e.nombre;
    celdaCodigo.textContent = e.codigo;
    celdaNota1.textContent = e.nota1;
    celdaNota2.textContent = e.nota2;
    celdaNota3.textContent = e.nota3;

    const botonEditar = d.createElement("button");
    botonEditar.setAttribute("class", "click_editar");
    botonEditar.style.backgroundColor = "green";
    botonEditar.style.color = "white";
    botonEditar.textContent = "editar";

    botonEditar.addEventListener("click", () => {
      openModal(e);
    });

    const botonEliminar = d.createElement("button");
    botonEliminar.style.backgroundColor = "red";
    botonEliminar.style.color = "white";
    botonEliminar.style.marginLeft = "5px";
    botonEliminar.textContent = "eliminar";

    botonEliminar.addEventListener("click", (e) => {
      eliminar(e.celdaCodigo);
    });

    celdaAcciones.appendChild(botonEditar);
    celdaAcciones.appendChild(botonEliminar);

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaCodigo);
    fila.appendChild(celdaNota1);
    fila.appendChild(celdaNota2);
    fila.appendChild(celdaNota3);
    fila.appendChild(celdaAcciones);

    tabla.appendChild(fila);
  });
  console.log(salon); // Agrega el console.log aquí para verificar el arreglo actualizado
};

// const getData = () => {
//   const datos = new FormData($formulario); //Los objetos FormData le permiten compilar un conjunto de pares clave/valor para enviar mediante XMLHttpRequest
//   const datoProcesados = Object.fromEntries(datos.entries());

//   $formulario.reset();
//   return datoProcesados;
// };

// const postData = async () => {
//   const newUser = getData();

//   try {
//     const response = await fetch("http://localhost:3000/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newUser),
//     });
//     if (response.ok) {
//       const jsonResponse = await response.json();
//       const { nombre, codigo, nota1, nota2, nota3 } = jsonResponse;
//     }
//   } catch (error) {}
// };

// const guardarSalon = () => {
//   //aca es para convetir el array en un cadenajson
//   const salonJson = JSON.stringify(salon);
//   localStorage.setItem("salon", salonJson);
// };

// //aca es para cargar el salon desde el localStorage
// const cagarSalon = () => {
//   const salonJson = localStorage.getItem("salon");
//   if (salonJson) {
//     salon = JSON.parse(salonJson);
//   }
// };

// $formulario.addEventListener("submit", (e) => {
//   e.preventDefault();
//   infoAlumno();
//   enviandoDatos();
//   guardarSalon();
// });

const openModal = (alumno) => {
  alumnoOriginal = { ...alumno }; // Hacer una copia del objeto original. Resto del código para abrir la ventana modal y cargar los datos.

  actualizarDato = alumno;
  const modalNombre = d.getElementById("modal_nombre");
  const modalCodigo = d.getElementById("modal_codigo");
  const modalNota1 = d.getElementById("modal_nota_1");
  const modalNota2 = d.getElementById("modal_nota_2");
  const modalNota3 = d.getElementById("modal_nota_3");

  modalNombre.value = alumno.nombre;
  modalCodigo.value = alumno.codigo;
  modalNota1.value = alumno.nota1;
  modalNota2.value = alumno.nota2;
  modalNota3.value = alumno.nota3;

  botonActualizar.addEventListener("click", (e) => {
    e.preventDefault();
    actualizarTabla(alumno);
  });

  modal.classList.toggle("translate");
};

//este es para actualizar los datos en la ventana modal
const actualizarTabla = (alumno) => {
  // alumno.nombre = d.getElementById("modal_nombre").value;
  // alumno.codigo = d.getElementById("modal_codigo").value;
  // alumno.nota1 = d.getElementById("modal_nota_1").value;
  // alumno.nota2 = d.getElementById("modal_nota_2").value;
  // alumno.nota3 = d.getElementById("modal_nota_3").value;
  // enviandoDatos();
  // modal.classList.toggle("translate");

  // Obtener los nuevos valores de la ventana modal.
  const nuevoNombre = d.getElementById("modal_nombre").value;
  const nuevoCodigo = d.getElementById("modal_codigo").value;
  const nuevaNota1 = d.getElementById("modal_nota_1").value;
  const nuevaNota2 = d.getElementById("modal_nota_2").value;
  const nuevaNota3 = d.getElementById("modal_nota_3").value;

  // Comparar los valores originales con los nuevos.
  if (
    alumnoOriginal.nombre !== nuevoNombre ||
    alumnoOriginal.codigo !== nuevoCodigo ||
    alumnoOriginal.nota1 !== nuevaNota1 ||
    alumnoOriginal.nota2 !== nuevaNota2 ||
    alumnoOriginal.nota3 !== nuevaNota3
  ) {
    // Algunos valores han cambiado, actualiza el objeto en el array.
    alumno.nombre = nuevoNombre;
    alumno.codigo = nuevoCodigo;
    alumno.nota1 = nuevaNota1;
    alumno.nota2 = nuevaNota2;
    alumno.nota3 = nuevaNota3;

    // Luego, actualiza la tabla y cierra la ventana modal.
    enviandoDatos();
    modal.classList.toggle("translate");
  }
};

// botonActualizar.addEventListener("click", (e) => {
//   e.preventDefault();
//   actualizarTabla();
// });

const eliminar = (id) => {
  let dni = salon.findIndex((alumno) => alumno.id == id);

  let validar = confirm("desea borrar los datos");

  if (validar) {
    salon.splice(dni, 1);
    enviandoDatos();
  }
};

const guardarSalon = () => {
  //aca es para convetir el array en un cadenajson
  const salonJson = JSON.stringify(salon);
  localStorage.setItem("salon", salonJson);
};

//aca es para cargar el salon desde el localStorage
const cagarSalon = () => {
  const salonJson = localStorage.getItem("salon");
  if (salonJson) {
    salon = JSON.parse(salonJson);
  }
};

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  infoAlumno();
  enviandoDatos();
  guardarSalon();
});
