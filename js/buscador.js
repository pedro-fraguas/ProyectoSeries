window.onload = function() {
  var datos = new URLSearchParams(location.search);
  var loBuscado = datos.get("buscador");

  fetch("https://api.themoviedb.org/3/search/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
  .then(function(response) {
    return response.json();
  })
  .then(function(respuesta) {
    var series = respuesta.data;

    var imagenes = document.querySelectorAll(".serieBuscada img");


    for (var i = 0; i < 5; i++) {
      document.querySelector("h1").innerHTML = "Esto encontramos para tu busqueda de " + loBuscado + ":"
      serieBuscada[i].src = "https://api.themoviedb.org/3/search/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&query="+ loBuscado +"&page=1";
    }
  })
  .catch(function(error) {
    alert("Error, perdon, vuelva mas tarde")
  })
}
