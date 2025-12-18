// ====================================================
// ECO EMPRESA - MANEJO DE DATOS CON JSON Y AJAX
// ====================================================

// --- PETICIÓN GET: Cargar beneficios desde JSON ---
function cargarBeneficios() {
    fetch('data/beneficios-empresas.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar beneficios');
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('beneficiosEmpresa');
            container.innerHTML = '';
            
            data.beneficios.forEach(beneficio => {
                const card = `
                    <div class="benefit-card fade-in-visible">
                        <div class="benefit-icon">
                            <img src="${beneficio.icono}" alt="${beneficio.titulo}">
                        </div>
                        <h4>${beneficio.titulo}</h4>
                        <p>${beneficio.descripcion}</p>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('beneficiosEmpresa').innerHTML = 
                '<p style="color:red; text-align:center;">Error al cargar beneficios</p>';
        });
}

// --- PETICIÓN GET: Cargar estadísticas desde JSON ---
function cargarEstadisticas() {
    fetch('data/estadisticas-empresas.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar estadísticas');
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('estadisticasEmpresas');
            container.innerHTML = '';
            
            data.estadisticas.forEach(stat => {
                const card = `
                    <div class="stat-card fade-in-visible">
                        <div class="stat-icon">${stat.icono}</div>
                        <h3 class="counter">${stat.valor}</h3>
                        <p>${stat.descripcion}</p>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('estadisticasEmpresas').innerHTML = 
                '<p style="color:red; text-align:center;">Error al cargar estadísticas</p>';
        });
}

// --- PETICIÓN POST: Enviar formulario de registro ---
function validarFormularioEmpresa(e) {
    e.preventDefault();
    
    const nombreEmpresa = document.getElementById('nombreEmpresa').value;
    const ruc = document.getElementById('ruc').value;
    const correo = document.getElementById('correoEmpresa').value;
    const sector = document.getElementById('sector').value;
    const volumen = document.getElementById('volumenMensual').value;
    
    // Validaciones
    let errores = false;
    
    if (nombreEmpresa.trim().length < 3) {
        document.getElementById('error-nombreEmpresa').textContent = 'Nombre muy corto';
        errores = true;
    } else {
        document.getElementById('error-nombreEmpresa').textContent = '';
    }
    
    if (!/^\d{9,11}$/.test(ruc)) {
        document.getElementById('error-ruc').textContent = 'RUC/NIT inválido (9-11 dígitos)';
        errores = true;
    } else {
        document.getElementById('error-ruc').textContent = '';
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        document.getElementById('error-correoEmpresa').textContent = 'Correo inválido';
        errores = true;
    } else {
        document.getElementById('error-correoEmpresa').textContent = '';
    }
    
    if (errores) {
        document.getElementById('mensajeEmpresa').style.color = 'red';
        document.getElementById('mensajeEmpresa').textContent = '❌ Corrige los errores';
        return;
    }
    
    // Crear objeto JSON para enviar
    const datosEmpresa = {
        nombreEmpresa: nombreEmpresa,
        ruc: ruc,
        correo: correo,
        sector: sector,
        volumenMensual: parseInt(volumen),
        fecha: new Date().toISOString()
    };
    
    // Simular petición POST (en producción iría a un servidor real)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosEmpresa)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        document.getElementById('mensajeEmpresa').style.color = 'green';
        document.getElementById('mensajeEmpresa').textContent = '✅ Solicitud enviada correctamente';
        document.getElementById('empresaForm').reset();
        
        // Guardar en localStorage para simulación
        let empresas = JSON.parse(localStorage.getItem('empresasRegistradas') || '[]');
        empresas.push(datosEmpresa);
        localStorage.setItem('empresasRegistradas', JSON.stringify(empresas));
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mensajeEmpresa').style.color = 'red';
        document.getElementById('mensajeEmpresa').textContent = '❌ Error al enviar';
    });
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    cargarBeneficios();
    cargarEstadisticas();
    
    const form = document.getElementById('empresaForm');
    form.addEventListener('submit', validarFormularioEmpresa);
});