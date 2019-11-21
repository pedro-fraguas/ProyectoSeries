window.onload = function(){
  var generoID = new URLSearchParams(location.search).get('idGenero');

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



  fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var generos = data.genres;

      var listado = document.querySelector("select.generos");
      var listado2 = document.querySelector("select.generos2");

      for (var i = 0; i < generos.length ; i++) {
        listado.innerHTML += "<option value='" + generos[i].id + "'>" + generos[i].name + "</option>";
        listado2.innerHTML += "<option value='" + generos[i].id + "'>" + generos[i].name + "</option>";
      }
    })
    .catch(function(error) {
      alert("Error");
    })

    var avanzado = document.querySelector("form.buscador-avanzado")
    var ano = document.querySelector("form.buscador-avanzado input.ano")
    avanzado.onsubmit = function(event){

      if (ano.value.length != 4 || ano.value > 2023){
        event.preventDefault();
        alert("Ingrese un año valido")
      }

    }

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
