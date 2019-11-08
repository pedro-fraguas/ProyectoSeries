window.onload = function() {

  var serieID = new URLSearchParams(location.search).get('idSerie');

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

  fetch("https://api.themoviedb.org/3/tv/" + serieID + "?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(serie) {
      document.querySelector(".poster").src = "https://image.tmdb.org/t/p/original" + serie.poster_path;
      document.querySelector(".tituloPelicula").innerHTML = serie.name;
      document.querySelector(".tituloDatos p.overview").innerHTML = serie.overview;
      document.querySelector(".tituloDatos h4.lenguajeOriginal").innerHTML += serie.original_language;
      document.querySelector(".tituloDatos h4.fechaEstreno").innerHTML += serie.first_air_date;

      var generos = document.querySelector(".tituloDatos p.generos");
      for (var i = 0; i < serie.genres.length; i++) {
        generos.innerHTML += "<a href='SeriesPorGenero.html?idGenero=" + serie.genres[i].id + "'>" + serie.genres[i].name +"</a><br>";
      }

    })
    .catch(function(error) {
      alert("Error");
    })

  fetch("https://api.themoviedb.org/3/tv/" + serieID + "/similar?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      var relacionadas = data.results;

      var imagenes = document.querySelectorAll(".relacionadas .uk-slider-items li img");
      var hipervinculos = document.querySelectorAll(".relacionadas .uk-slider-items li a");

      for (var i = 0; i < imagenes.length; i++) {
        imagenes[i].src = "https://image.tmdb.org/t/p/original" + relacionadas[i].poster_path;
        hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + relacionadas[i].id;
      }
    })
    .catch(function(error){
      alert("Error");
    })
}
