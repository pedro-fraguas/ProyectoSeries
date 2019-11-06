window.onload = function() {
  var datos = new URLSearchParams(location.search);
  var loBuscado = datos.get("buscador");

  fetch("https://api.themoviedb.org/3/search/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&query=" + loBuscado + "&page=1")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var series = data.results;

    var imagenes = document.querySelectorAll(".serieBuscada a img");
    var hipervinculos = document.querySelectorAll(".serieBuscada a");

    document.querySelector("h1").innerHTML = "Esto encontramos para tu busqueda de '" + loBuscado + "':"

    for (var i = 0; i < imagenes.length; i++) {
      imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
      hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
    }
  })
  .catch(function(error) {
    alert("Error, perdon, vuelva mas tarde")
  })
}
