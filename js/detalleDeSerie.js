window.onload = function() {

  var serieID = new URLSearchParams(location.search).get('idSerie');

  //Esto carga los generos al nav bar
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

  //Esto carga el poster y los datos de la serie
  fetch("https://api.themoviedb.org/3/tv/" + serieID + "?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(serie) {

      if (serie.poster_path != null) {
        document.querySelector(".poster").src = "https://image.tmdb.org/t/p/original" + serie.poster_path;
      }

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

  //Esto carga las series relacionadas
  fetch("https://api.themoviedb.org/3/tv/" + serieID + "/similar?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      var relacionadas = data.results;

      var imagenes = document.querySelectorAll(".relacionadas .uk-slider-items li img");
      var hipervinculos = document.querySelectorAll(".relacionadas .uk-slider-items li a");

      for (var i = 0; i < imagenes.length; i++) {
        if (relacionadas[i].poster_path != null) {
          imagenes[i].src = "https://image.tmdb.org/t/p/original" + relacionadas[i].poster_path;
        }
        hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + relacionadas[i].id;
      }
    })
    .catch(function(error){
      alert("Error");
    })

  //Esto deberia cargar el trailer
  fetch("https://api.themoviedb.org/3/tv/" + serieID + "/videos?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].type == "Trailer") {
          var video = document.querySelector("div.trailer");
          // video.innerHTML = "<iframe src='https://www.youtube.com/watch?v=" + data.results[i].key + "' width='' height=''></iframe>"
        video.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data.results[i].key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        }
      }
    })
    .catch(function(error){
      alert("Error");
    })

  //Esto muestra series relacionadas
  boton = document.querySelector("main button.series-relacionadas");
  boton.onclick = function() {
    boton.style.display = "none";
    document.querySelector("div.relacionadas").style.display = "block";
  }

  //Series favoritas
  var recuperoStorage = localStorage.getItem("seriesFavoritas");

  if (recuperoStorage == null) {
    seriesFavoritas = [];
  } else {
    seriesFavoritas = JSON.parse(recuperoStorage);
  }

  if (seriesFavoritas.includes(serieID)) {
    document.querySelector("button.favorito").innerHTML = "QUITAR DE FAVORITOS";
  }

  document.querySelector("button.favorito").onclick = function() {
    if (seriesFavoritas.includes(serieID)) {
      var index = seriesFavoritas.indexOf(serieID);
      seriesFavoritas.splice(index, 1);
      document.querySelector("button.favorito").innerHTML = "AGREGAR FAVORITO";
    } else {
      seriesFavoritas.push(serieID);
      document.querySelector("button.favorito").innerHTML = "QUITAR DE FAVORITOS";
    }

    var infoParaStorage = JSON.stringify(seriesFavoritas);
    localStorage.setItem("seriesFavoritas", infoParaStorage);
    console.log(localStorage);
  }

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
}
