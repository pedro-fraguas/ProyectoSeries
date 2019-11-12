window.onload = function() {

  //Esto carga los generos en el nav bar
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

  //Esto carga las series populares al carrousel
  fetch("https://api.themoviedb.org/3/tv/popular?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var series = data.results;

      var imagenes = document.querySelectorAll(".populares .uk-slider-items li img");
      var hipervinculos = document.querySelectorAll(".populares .uk-slider-items li a");

      for (var i = 0; i < imagenes.length; i++) {
        if (series[i].poster_path != null) {
          imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
        }
        hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
      }
    })
    .catch(function(error) {
      alert("Error");
    })

  //Esto carga las series mejor puntuadas al carrousel
  fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var series = data.results;

      var imagenes = document.querySelectorAll(".puntaje .uk-slider-items li img");
      var hipervinculos = document.querySelectorAll(".puntaje .uk-slider-items li a");

      for (var i = 0; i < imagenes.length; i++) {
        if (series[i].poster_path != null) {
          imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
        }
        hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
      }
    })
    .catch(function(error) {
      alert("Error");
    })

  //Esto carga las series al aire al carrousel
  fetch("https://api.themoviedb.org/3/tv/on_the_air?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var series = data.results;

      var imagenes = document.querySelectorAll(".al-aire .uk-slider-items li img");
      var hipervinculos = document.querySelectorAll(".al-aire .uk-slider-items li a");

      for (var i = 0; i < imagenes.length; i++) {
        if (series[i].poster_path != null) {
          imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
        }
        hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
      }
    })
    .catch(function(error) {
      alert("Error");
    })

}
