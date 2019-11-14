window.onload = function(){
  var datos = new URLSearchParams(location.search)
  var generoincluido = datos.get("generoincluido")
  var generoexcluido = datos.get("generoexcluido")
  var año = datos.get("añoestreno")
  var mostrar = datos.get("ordenresultados")

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

  fetch("https://api.themoviedb.org/3/discover/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&sort_by="+ mostrar +"&first_air_date_year="+ año +"&page=1&with_genres="+ generoincluido +"&without_genres="+ generoexcluido +")
    .then(function(response) {
      return response.json();
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
