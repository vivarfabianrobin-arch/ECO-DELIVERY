// ------------------------------
// 1. Validación de nombre
function validarNombre(nombre) {
  const regex = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
  return nombre.trim() !== "" && regex.test(nombre);
}

// 2. Validación de edad
function validarEdad(edad) {
  const num = parseInt(edad);
  if (isNaN(num)) throw new Error("Edad no válida");
  return num >= 18 && num <= 99;
}

// 3. Validación de correo
function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

// 4. try...catch para conversión errónea
function convertirNumero(valor) {
  try {
    const num = Number(valor);
    if (isNaN(num)) throw new Error("Valor no numérico");
    return num;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// 5. Validación de contraseña
function validarPassword(pass) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(pass);
}

// 6. Manejo de errores múltiples con finally
function validarFormularioCompleto(nombre, edad, correo, pass) {
  try {
    if (!validarNombre(nombre)) throw new Error("Nombre inválido");
    if (!validarEdad(edad)) throw new Error("Edad inválida");
    if (!validarCorreo(correo)) throw new Error("Correo inválido");
    if (!validarPassword(pass)) throw new Error("Contraseña inválida");
    return true;
  } catch (err) {
    alert("Error: " + err.message);
    return false;
  } finally {
    console.log("Validación finalizada.");
  }
}

// 7. Arreglo de nombres (>5 letras)
const nombres = ["Ana", "Roberto", "Carolina", "Luis", "Santiago"];
console.log("Nombres > 5 letras:");
for (let n of nombres) {
  if (n.length > 5) console.log(n);
}

// 8. Arreglo numérico (suma)
const numeros = [10, 20, 30, 40, 50];
const suma = numeros.reduce((acc, val) => acc + val, 0);
console.log("Suma total:", suma);

// 9. Arreglo con objetos (mayores de 18)
const usuarios = [
  { nombre: "Juan", edad: 17 },
  { nombre: "Lucía", edad: 22 },
  { nombre: "Pedro", edad: 30 }
];
console.log("Usuarios mayores de 18:");
usuarios.forEach(u => { if (u.edad > 18) console.log(u.nombre); });

// 10. Búsqueda en arreglo
function buscarElemento(array, valor) {
  const index = array.indexOf(valor);
  return index !== -1 ? index : "No encontrado";
}
console.log("Buscar 30:", buscarElemento(numeros, 30));

// 11. Ordenamiento de números
const desordenados = [9, 1, 5, 3, 7];
const ordenados = desordenados.sort((a, b) => a - b);
console.log("Ordenados:", ordenados);

// 12. Validación combinada simple
function validarSimple(nombre, correo, edad) {
  let mensaje = "";
  if (!validarNombre(nombre)) mensaje += "Nombre inválido. ";
  if (!validarCorreo(correo)) mensaje += "Correo inválido. ";
  if (!validarEdad(edad)) mensaje += "Edad inválida. ";
  return mensaje || "Formulario válido";
}

// 13. Control de errores en funciones
function calcularPromedio(arreglo) {
  try {
    if (!arreglo.length) throw new Error("El arreglo está vacío");
    const suma = arreglo.reduce((a, b) => a + b, 0);
    return suma / arreglo.length;
  } catch (err) {
    console.error("Error:", err.message);
  }
}
console.log("Promedio:", calcularPromedio([10, 20, 30]));

// 14. Arreglo dinámico con prompt
function ingresarNumeros() {
  const lista = [];
  let entrada;
  while ((entrada = prompt("Ingresa un número o 'fin' para terminar")) !== "fin") {
    const num = parseFloat(entrada);
    if (!isNaN(num)) lista.push(num);
  }
  alert("Promedio: " + calcularPromedio(lista));
}

// 15. Validación en tiempo real
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ecoRiderForm");
  const nombre = document.getElementById("nombre");
  const edad = document.getElementById("edad");
  const correo = document.getElementById("correo");
  const pass = document.getElementById("password");
  const mensaje = document.getElementById("mensaje");

  function mostrarError(id, texto) {
    document.getElementById(id).textContent = texto;
  }

  nombre.addEventListener("input", () =>
    mostrarError("error-nombre", validarNombre(nombre.value) ? "" : "Nombre inválido"));
  edad.addEventListener("input", () =>
    mostrarError("error-edad", validarEdad(edad.value) ? "" : "Edad inválida"));
  correo.addEventListener("input", () =>
    mostrarError("error-correo", validarCorreo(correo.value) ? "" : "Correo inválido"));
  pass.addEventListener("input", () =>
    mostrarError("error-password", validarPassword(pass.value) ? "" : "Contraseña débil"));

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (validarFormularioCompleto(nombre.value, edad.value, correo.value, pass.value)) {
      mensaje.style.color = "green";
      mensaje.textContent = "✅ Formulario válido. ¡Bienvenido Eco Rider!";
      form.reset();
    } else {
      mensaje.style.color = "red";
      mensaje.textContent = "❌ Corrige los errores antes de enviar.";
    }
  });
});