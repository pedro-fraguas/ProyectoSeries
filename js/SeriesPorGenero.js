window.onload = function(){
  var generoID = new URLSearchParams(location.search).get('idGenero');
  var imagenes;
  var hipervinculos;

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
      imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
      hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
    }
  }
}
