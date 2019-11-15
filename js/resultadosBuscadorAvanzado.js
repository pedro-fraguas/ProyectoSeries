window.onload = function(){
  var datos = new URLSearchParams(location.search)
  var generoincluido = datos.get("generoincluido")
  var generoexcluido = datos.get("generoexcluido")
  var año = datos.get("añoestreno")
  var mostrar = datos.get("ordenresultados")
  var series;
  var imagenes;
  var contador = 1;
  var totalDeSeries;

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

  //Esto carga la primer tanda de resultados

  fetch("https://api.themoviedb.org/3/discover/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&sort_by="+ mostrar +"&first_air_date_year="+ año +"&page=1&with_genres="+ generoincluido +"&without_genres="+ generoexcluido)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      totalDeSeries = data.total_results;
      series = data.results;
      cargarSeries(series);
      if (imagenes.length >= totalDeSeries) {
        verMas.style.visibility = "hidden";
      }
    })
    .catch(function(error) {
      alert("Error");
    })

  function cargarSeries(series) {
    imagenes = document.querySelectorAll(".serieBuscada a img");
    var hipervinculos = document.querySelectorAll(".serieBuscada a");
    var titulos = document.querySelectorAll("article.serieBuscada");

    for (var i = 0; i < series.length; i++) {
      if (series[i].poster_path != null) {
        imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
      } else {
        titulos[i].innerHTML += "<div class='titulo-default'><h1>" + series[i].name + "</h1></div>";
      }
      hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i].id;
    }
    for (var i = series.length; i < imagenes.length; i++) {
      imagenes[i].src = "";
    }
  }

  //Scroll infinito

  var verMas = document.querySelector("main button");
  verMas.onclick = function() {
    var resultados = document.querySelector("div.resultados");
    resultados.innerHTML += "<article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article><article class='serieBuscada'><p></p><a href=''><img src='../img/poster-default.png' alt=''></a></article>";
    contador++;
    cargarMasSeries(series);

    if (imagenes.length >= totalDeSeries) {
      verMas.style.visibility = "hidden";
    }
  }

  function cargarMasSeries(series) {
    imagenes = document.querySelectorAll(".serieBuscada a img");
    var hipervinculos = document.querySelectorAll(".serieBuscada a");
    var titulos = document.querySelectorAll(".serieBuscada");

    fetch("https://api.themoviedb.org/3/discover/tv?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&sort_by="+ mostrar +"&first_air_date_year="+ año +"&page=" + contador + "&with_genres="+ generoincluido +"&without_genres="+ generoexcluido)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        series = data.results;
        for (var i = (contador - 1) * 20; i < (contador - 1) * 20 + series.length; i++) {
          if (series[i - (contador - 1) * 20].poster_path != null) {
            imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i - (contador - 1) * 20].poster_path;
          } else {
            titulos[i].innerHTML += "<div class='titulo-default'><h1>" + series[i - (contador - 1) * 20].name + "</h1></div>";
          }
          hipervinculos[i].href = "DetalleDeSerie.html?idSerie=" + series[i - (contador - 1) * 20].id;
        }
        for (var i = (contador - 1) * 20 + series.length; i < imagenes.length; i++) {
          imagenes[i].src = "";
        }

      })
      .catch(function(error) {
        alert("Error");
      })
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
