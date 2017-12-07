

function loadStats(data) {
  $("#test").val(data);
}

var statsData;
function setPlayerStats2(data) {
  statsData = data;
}

function getData() {
  return data;
}

/*$( document ).ready(function() {
  $.getJSON('http://localhost/PUBG-Stats-Website/data.php', function(data) {
    //console.log("hi" + data.length)
    setData(data);
  });
}); */
