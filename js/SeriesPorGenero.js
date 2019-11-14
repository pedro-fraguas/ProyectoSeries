window.onload = function(){
  var generoID = new URLSearchParams(location.search).get('idGenero');
  var imagenes;
  var hipervinculos;

  //Esto carga los generos al nav bar
  fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var generos = data.genres;
      var listado = document.querySelectorAll("ul.listado-generos li a");

      for (var i = 0; i < listado.length; i++) {
        listado[i].innerHTML = generos[i].name;
        listado[i].href = "SeriesPorGenero.html?idGenero=" + generos[i].id;
      }
    })
    .catch(function(error) {
      alert("Error");
    })

  //Esto carga el titulo del genero al h3
  fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var listado = data.genres;
      for (var i = 0; i < listado.length; i++) {
        if (listado[i].id == generoID) {
          document.querySelector("h3.genero").innerHTML = listado[i].name;
          break;
        }
      }
    })
    .catch(function(error) {
      alert("Error");
    })

  //Esto carga los posters a los resultados
  fetch("https://api.themoviedb.org/3/discover/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=" + generoID + "&include_null_first_air_dates=false")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var series = data.results;
      cargarSeries(series);
    })
    .catch(function(error) {
      alert("Error");
    })

  function cargarSeries(series) {
    imagenes = document.querySelectorAll(".serieBuscada a img");
    hipervinculos = document.querySelectorAll(".serieBuscada a");

    for (var i = 0; i < imagenes.length; i++) {
      if (series[i].poster_path != null) {
        imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
      }
      hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
    }
  }

  //Esto revisa las condiciones para ejecutar la busqueda
  var buscador = document.querySelector("form.buscador");
  var input = document.querySelector("form.buscador input");
  buscador.onsubmit = function(event){
    if (input.value == "") {
      event.preventDefault();
    } else if (input.value.length < 3) {
      event.preventDefault();
      alert("Debe haber un minimo de 3 letras para buscar");
    }
  }
}
