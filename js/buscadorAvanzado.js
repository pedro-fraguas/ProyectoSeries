window.onload = function(){
  var generoID = new URLSearchParams(location.search).get('idGenero');

  fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var generos = data.genres;
      var listado = document.querySelectorAll("select.generos option.genero");
      var listado2 = document.querySelectorAll("select.generos2 option.genero2");

      for (var i = 0; i < listado.length ; i++) {
        listado[i].innerHTML = generos[i].name;
        listado2[i].innerHTML= generos[i].name;
      }
    })
    .catch(function(error) {
      alert("Error");
    })

    // js header

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

}