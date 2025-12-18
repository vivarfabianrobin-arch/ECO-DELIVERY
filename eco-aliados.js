// ====================================================
// ECO ALIADOS - MANEJO DE DATOS CON JSON Y AJAX
// ====================================================

// --- PETICIÓN GET: Cargar galería de aliados ---
function cargarAliados() {
    fetch('data/aliados.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar aliados');
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('galeriaAliados');
            container.innerHTML = '';
            
            data.aliados.forEach(aliado => {
                const card = `
                    <div class="vehicle-card fade-in-visible" style="text-align: left;">
                        <div class="vehicle-image" style="background: ${aliado.colorFondo};">
                            <img src="${aliado.logo}" alt="${aliado.nombre}" style="max-height: 150px;">
                        </div>
                        <h4 style="margin: 15px 0 10px;">${aliado.nombre}</h4>
                        <p style="color: #4a7c3a; font-size: 0.95rem; margin-bottom: 8px;">
                        </p>
                        <p style="color: #4a7c3a; font-size: 0.95rem; margin-bottom: 8px;">
                            <strong>Ubicación:</strong> ${aliado.ubicacion}
                        </p>
                        <p style="color: #2e7d32; font-size: 0.9rem; line-height: 1.6;">
                            ${aliado.descripcion}
                        </p>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('galeriaAliados').innerHTML = 
                '<p style="color:red; text-align:center;">Error al cargar aliados</p>';
        });
}

// --- PETICIÓN GET: Cargar testimonios ---
function cargarTestimonios() {
    fetch('data/testimonios-aliados.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar testimonios');
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('testimoniosAliados');
            container.innerHTML = '';
            
            data.testimonios.forEach(testimonio => {
                const card = `
                    <div class="benefit-card fade-in-visible">
                        <p style="font-style: italic; color: #2e7d32; line-height: 1.7; margin-bottom: 20px;">
                            "${testimonio.comentario}"
                        </p>
                        <h4 style="color: #1b5e20; margin-bottom: 5px;">${testimonio.nombre}</h4>
                        <p style="color: #4a7c3a; font-size: 0.9rem;">${testimonio.empresa}</p>
                        <p style="color: #66bb6a; font-size: 1.5rem; margin-top: 10px;">★★★★★</p>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('testimoniosAliados').innerHTML = 
                '<p style="color:red; text-align:center;">Error al cargar testimonios</p>';
        });
}

// --- PETICIÓN POST: Enviar formulario de aliado ---
function validarFormularioAliado(e) {
    e.preventDefault();
    
    const nombreNegocio = document.getElementById('nombreNegocio').value;
    const tipoNegocio = document.getElementById('tipoNegocio').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correoAliado').value;
    
    // Validaciones
    let errores = false;
    
    if (nombreNegocio.trim().length < 3) {
        document.getElementById('error-nombreNegocio').textContent = 'Nombre muy corto';
        errores = true;
    } else {
        document.getElementById('error-nombreNegocio').textContent = '';
    }
    
    if (!/^\d{7,15}$/.test(telefono)) {
        document.getElementById('error-telefono').textContent = 'Teléfono inválido (7-15 dígitos)';
        errores = true;
    } else {
        document.getElementById('error-telefono').textContent = '';
    }
    
    if (errores) {
        document.getElementById('mensajeAliado').style.color = 'red';
        document.getElementById('mensajeAliado').textContent = '❌ Corrige los errores';
        return;
    }
    
    // Crear objeto JSON
    const datosAliado = {
        nombreNegocio: nombreNegocio,
        tipoNegocio: tipoNegocio,
        telefono: telefono,
        correo: correo,
        fecha: new Date().toISOString()
    };
    
    // Petición POST simulada
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosAliado)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta:', data);
        document.getElementById('mensajeAliado').style.color = 'green';
        document.getElementById('mensajeAliado').textContent = '✅ Solicitud enviada correctamente';
        document.getElementById('aliadoForm').reset();
        
        // Guardar en localStorage
        let aliados = JSON.parse(localStorage.getItem('aliadosRegistrados') || '[]');
        aliados.push(datosAliado);
        localStorage.setItem('aliadosRegistrados', JSON.stringify(aliados));
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mensajeAliado').style.color = 'red';
        document.getElementById('mensajeAliado').textContent = '❌ Error al enviar';
    });
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    cargarAliados();
    cargarTestimonios();
    
    const form = document.getElementById('aliadoForm');
    form.addEventListener('submit', validarFormularioAliado);
});