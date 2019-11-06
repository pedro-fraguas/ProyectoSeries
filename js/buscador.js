window.onload = function() {
  var datos = new URLSearchParams(location.search);
  var loBuscado = datos.get("buscador");
  var series;
  var imagenes;

  fetch("https://api.themoviedb.org/3/search/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&query=" + loBuscado + "&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      series = data.results;
      document.querySelector("h1").innerHTML = "Esto encontramos para tu busqueda de '" + loBuscado + "':"
      cargarSeries(series);
    })
    .catch(function(error) {
      alert("Error, perdon, vuelva mas tarde")
    })

  function cargarSeries(series) {
    imagenes = document.querySelectorAll(".serieBuscada a img");
    var hipervinculos = document.querySelectorAll(".serieBuscada a");

    for (var i = 0; i < imagenes.length; i++) {
      imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
      hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
    }
  }

  var verMas = document.querySelector("main button");

  verMas.onclick = function() {
    var resultados = document.querySelector("div.resultados");
    resultados.innerHTML += "<article class='serieBuscada'><p></p><a href=''><img src='' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='' alt=''></a></article>";
    cargarSeries(series);
    if (imagenes.length >= series.length) {
      verMas.style.visibility = "hidden";
    }
  }

}
