window.onload = function() {

  var serieID = new URLSearchParams(location.search).get('idSerie');

  fetch("https://api.themoviedb.org/3/tv/" + serieID + "?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(serie) {
      document.querySelector(".poster").src = "https://image.tmdb.org/t/p/original" + serie.poster_path;
      document.querySelector(".tituloPelicula").innerHTML = serie.name;
      document.querySelector(".tituloDatos p.overview").innerHTML = serie.overview;
      document.querySelector(".tituloDatos h4.lenguajeOriginal").innerHTML += serie.original_language;
      document.querySelector(".tituloDatos h4.fechaEstreno").innerHTML += serie.first_air_date;

      var generos = document.querySelector(".tituloDatos p.generos");
      for (var i = 0; i < serie.genres.length; i++) {
        generos.innerHTML += "<a href=''>"+ serie.genres[i].name +"</a><br>";
      }
    })
    .catch(function(error) {
      alert("Error");
    })
}
