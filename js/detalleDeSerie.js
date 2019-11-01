window.onload = function() {

  var serieID = new URLSearchParams(location.search).get('idSerie');

  fetch("https://api.themoviedb.org/3/tv/" + serieID + "?api_key=935b83cf932d87a1deec2a0108c3513e&language=en-US
")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

    })
    .catch(function(error) {
      alert("Error");
    })
}
