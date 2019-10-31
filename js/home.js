window.onload = function() {

  /* Header search
  searchBar = document.querySelector(".fas fa-search")

  searchBar.onclick = function (){

    document.querySelector("li.searchBar").style.visibility = "show"
  }
  */
  fetch("https://api.themoviedb.org/3/tv/popular?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var series = data.results;

      var imagenes = document.querySelectorAll(".popular img");
      var titulos = document.querySelectorAll(".popular p");

      for (var i = 0; i < imagenes.length; i++) {
        imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
        titulos[i].innerHTML = series[i].name;
      }
    })
    .catch(function(error) {
      alert("Error");
    })

  fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var series = data.results;

      var imagenes = document.querySelectorAll(".puntaje img");
      var titulos = document.querySelectorAll(".puntaje p");

      for (var i = 0; i < imagenes.length; i++) {
        imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
        titulos[i].innerHTML = series[i].name;
      }
    })
    .catch(function(error) {
      alert("Error");
    })

  fetch("https://api.themoviedb.org/3/tv/on_the_air?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var series = data.results;

      var imagenes = document.querySelectorAll(".aire img");
      var titulos = document.querySelectorAll(".aire p");

      for (var i = 0; i < imagenes.length; i++) {
        imagenes[i].src = "https://image.tmdb.org/t/p/original" + series[i].poster_path;
        titulos[i].innerHTML = series[i].name;
      }
    })
    .catch(function(error) {
      alert("Error");
    })

}
