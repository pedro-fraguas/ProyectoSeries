window.onload = function() {

  var recuperoStorage = localStorage.getItem("seriesFavoritas");

  if (recuperoStorage == null) {
    seriesFavoritas = [];
  } else {
    seriesFavoritas = JSON.parse(recuperoStorage);
  }

  for (var i = 0; i < seriesFavoritas.length; i++) {
    fetch("https://api.themoviedb.org/3/tv/" + seriesFavoritas[i] + "?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.poster_path != null) {
          document.querySelector("section.series").innerHTML += "<article class='serie-favorita'><a href='DetalleDeSerie.html?idSerie=" + data.id + "'><img src='https://image.tmdb.org/t/p/original" + data.poster_path + "' alt=''></a></article>"
        } else {
          document.querySelector("section.series").innerHTML += "<article class='serie-favorita'><a href='DetalleDeSerie.html?idSerie=" + data.id + "'><img src='../img/poster-default.png' alt=''></a></article>"
        }
      })
      .catch(function(error) {
        alert("Error");
      })
  }
}
