window.addEventListener("load", () => {

  var boton = document.getElementById("boton");

  let temperatura_valor = document.getElementById("temperatura-valor");
  let temperatura_descripcion = document.getElementById(
    "temperatura-descripcion"
  );

  let ubicacion = document.getElementById("ubicacion");
  let pais = document.getElementById("pais");
  let icono_animado = document.getElementById("icon-animado");

  let viento_velocidad = document.getElementById("viento-velocidad");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      longitud = posicion.coords.latitude;
      latitud = posicion.coords.latitude;
      let city 
      boton.addEventListener("click", function (e) {
        city = document.getElementById("ciudad").value;
        console.log(city.length);

        if (city.length === 0) {
          city = 'chiclayo'
        }
        
        //UBICACION POR CIUDAD
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=12aed61611293ad921d4bfb099b43cc8`;
   
        fetch(url)
          .then((response) => {
            return response.json();
          })

          .then((data) => {
            let temperatura = Math.round(data.main.temp);
            temperatura_valor.textContent = `${temperatura} °C`;

            let clima = data.weather[0].description;
            temperatura_descripcion.textContent = clima.toUpperCase();

            let city = data.name;
            ubicacion.textContent = city.toUpperCase();

            let paisCLima = data.sys.country;
            pais.textContent = paisCLima;

            let velocidadViento = data.wind.speed;
            viento_velocidad.textContent = `${velocidadViento} m/s`;

            switch (data.weather[0].main) {
              case "Clear":
                icono_animado.src = "animated/cloudy-day-2.svg";
                break;

              case "Clouds":
                icono_animado.src = "animated/cloudy-night-3.svg";
                break;

              case "Rain":
                icono_animado.src = "animated/rainy-4.svg";
                break;

              case "Fog ${||} Mist":
                icono_animado.src = "animated/cloudy.svg";
                break;

              case "Thunderstorm":
                icono_animado.src = "animated/thunder.svg";
                break;

              case "Snow":
                icono_animado.src = "animated/snowy3.svg";
                break;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }
});
