//ID PARA LAS SECCIONES QUE SE VAN A MODIFICAR
const modificarCiudad = document.getElementById('ciudad')
const modificarPais = document.getElementById('pais')
const modificarCodigo = document.getElementById('codigo')
//ID DEL INPUTO PARA BUSCAR LA CIUDAD
const buscarNombre = document.getElementById('nombreBuscar')
//ID BANDERA
const cuadroBandera = document.getElementById('bandera')
//altiud y longitud
const modificarLatitud = document.getElementById('latitud')
const modificiarLongitud = document.getElementById('longitud')
//modificar la temperatura
const modificarTemp = document.getElementById('temp')

//Ni puta idea de como se ponen los ` ` en el teclado
//`Asigna los puntos (${jugador.puntoslibres})`
//MUSICA
const musica = document.getElementById('musica')

window.addEventListener('click', function() {
    musica.play()
}, {once:true}) 

async function datosPais(){

    const nombreCiudad = buscarNombre.value 

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${nombreCiudad}&count=1&language=en&format=json`

    const res = await fetch(url)
    const datos = await res.json()

    const datosUbiacion = datos.results[0]
    //extraer la ciudad, pais y el codigo del pais para la bandera
    const ciudadAPI = datosUbiacion.name
    const paisAPI = datosUbiacion.country
    //A minuscula para coincidir con el nombre del archivo
    const banderaAPI = datosUbiacion.country_code.toLowerCase()
    //Extraer latitud y longitud para usarlo en el api del clima
    const latitud = datosUbiacion.latitude
    const longitud = datosUbiacion.longitude
    //Modificar los datos al presionar buscar
    modificarCiudad.innerText = ciudadAPI
    modificarPais.innerText = paisAPI
    modificarLatitud.innerText = latitud
    modificiarLongitud.innerText = longitud
    cuadroBandera.innerHTML = `<img src='./Banderas/${banderaAPI}.svg'>`

    //La fakin temperatura

    const latitudAPI = latitud
    const longitudAPI = longitud

    const climaURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitudAPI}&longitude=${longitudAPI}&current=temperature_2m&timezone=auto&forecast_days=1`

    const res2 = await fetch(climaURL)
    const datos2 = await res2.json()

    const tempActual = datos2.current.temperature_2m
    const unidadMedida = datos2.current_units.temperature_2m

    modificarTemp.innerText = `${tempActual}${unidadMedida}`


}


