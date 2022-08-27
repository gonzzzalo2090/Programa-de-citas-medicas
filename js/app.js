const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

/********************CLASSES************************************/
class Citas {
    constructor() {
        this.citas = [];
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas)
    }
    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id)
    }
}




class UI {
    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //agregar clase en base al tipo de error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-successs');
        }

        //mensaje de error
        divMensaje.textContent = mensaje;
        //agregar al dom
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('#agregar-cita'))
        //quitar la alerta
        setTimeout(()=>{
            divMensaje.remove()
        },3000);
    }    


    imprimirCitas({citas}){

        this.limpiarHTML();

        citas.forEach( cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3')//clase cita de css y p-3 de boots
            divCita.dataset.id = id;

            //scripting de la cita
            const mascotaParrafo = document.createElement('h3');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class='font-weight-bolder'> Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class='font-weight-bolder'> Telefono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class='font-weight-bolder'> Fecha de la cita: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class='font-weight-bolder'> Hora de la cita: </span> ${hora}hs`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class='font-weight-bolder'> Sintomas: </span> ${sintomas}`;


            //boton para eliminar las citas
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML= `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`;

          btnEliminar.onclick = () => eliminarCita(id)


            //agrego los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);


            //agrego divCita al html
            contenedorCitas.appendChild(divCita);
        })
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild) 
        }
    }
}


//instancias de las 2 classes
const ui = new UI();
const administrarCitas = new Citas();

/********************EVENTOS*************************************/
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

/*********************OBJETO PRINCIPAL*****************************/
const citaObj = {
    mascota : '',
    propietario: '',
    telefono: '', 
    fecha: '',
    hora: '',
    sintomas: '',
}


/****************FUNCIONES*************************************/
//Agrega datos al objeto de citaObj
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}



//Valida y agrega una nueva cita a la clase de citas,muestra el html
function nuevaCita(e){
    e.preventDefault();
    //extraer la info del obj de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    //validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ){
        ui.imprimirAlerta("Todos los campos son obligatorios", "error")
        return;
    }

    //crear un id unico
    citaObj.id = Date.now();
    //Creando una nueva cita
    administrarCitas.agregarCita({...citaObj});

    //reinicio el obj y el fomrulario
    reiniciarObjeto()
    formulario.reset();

    //Mostrar el html
    ui.imprimirCitas(administrarCitas);
}



//Reiniciar objeto
function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}



//Eliminar cita
function eliminarCita(id) {
    //eliminar cita
    administrarCitas.eliminarCita(id);
    //muestre un msj
    ui.imprimirAlerta("La cita fue eliminada", "error")
    //refrescar citas
    ui.imprimirCitas(administrarCitas);
}
