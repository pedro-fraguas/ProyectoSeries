window.onload = function() {
  var datos = new URLSearchParams(location.search);
  var loBuscado = datos.get("buscador");

  fetch("https://api.giphy.com/v1/gifs/search?api_key=lp7wQ6914aPRmDI6HePRPpQeZXyxLFkU&q=" + loBuscado + "&limit=25&offset=0&rating=G&lang=en")
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
