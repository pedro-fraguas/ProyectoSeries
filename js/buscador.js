window.onload = function() {
  var datos = new URLSearchParams(location.search);
  var loBuscado = datos.get("buscador");

  fetch("https://api.themoviedb.org/3/search/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&query="
  + loBuscado +"&page=1")
  .then(function(response) {
    return response.json();
  })
  .then(function(respuesta) {
    var gifs = respuesta.data;
    for (var i = 0; i < gifs.length; i++) {
      document.querySelector("ul").innerHTML += "<li><h3><a href=detalleGif.html?idGif=" + respuesta.data[i].id + ">" + respuesta.data[i].title + "</a></h3><img src=" + respuesta.data[i].images.original.url + "></li>";
    }
  })
  .catch(function(error) {
    alert("Error, perdon, vuelva mas tarde")
  })
}
