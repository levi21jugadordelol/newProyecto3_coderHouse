const d = document;
const $formulario = d.querySelector("#formulario");

const resultados = d.getElementById("resultados_alumnos");
const salon = [];

d.addEventListener("DOMContentLoaded", () => {
  cagarSalon();
  enviandoDatos();
});

class Alumno {
  constructor(nombre, codigo, asistencia, nota1, nota2, nota3) {
    this.nombre = nombre;
    this.codigo = codigo;
    this.asistencia = asistencia;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
  }
}

const infoAlumno = () => {
  const infoAlumno = {
    nombre: d.getElementById("nombre_alumno").value,
    codigo: d.getElementById("codigo_alumno").value,
    nota1: d.getElementById("nota_1").value,
    nota2: d.getElementById("nota_2").value,
    nota3: d.getElementById("nota_3").value,
  };
  // console.log(infoAlumno);

  salon.push({ ...infoAlumno });
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

    celdaNombre.textContent = e.nombre;
    celdaCodigo.textContent = e.codigo;
    celdaNota1.textContent = e.nota1;
    celdaNota2.textContent = e.nota2;
    celdaNota3.textContent = e.nota3;

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaCodigo);
    fila.appendChild(celdaNota1);
    fila.appendChild(celdaNota2);
    fila.appendChild(celdaNota3);

    tabla.appendChild(fila);
    console.log(e);
  });
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
