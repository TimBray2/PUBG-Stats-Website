function getPlayerData() {
  $.ajax({
    type: 'POST',
    url: 'https://api.pubgtracker.com/v2/profile/pc/JustChillz?region=oc',
    headers: {
      "TRN-Api-Key":"1898182c-6af2-4365-b957-382ad3f62e45"
      // more as you need
    },
    async: false,
    success: function (data) {
      alert("success");
      $("#data").text(data);
      console.log("asdads")
    },
    error: function () {
      alert("Network error");
      console.log("hello")
    }
  });
}

function testAjax() {
    var result="";
    $.ajax({
      url: 'https://api.pubgtracker.com/v2/profile/pc/JustChillz?region=oc',
      headers: {
        "TRN-Api-Key":"1898182c-6af2-4365-b957-382ad3f62e45"
        // more as you need
      },
      async: false,
      success:function(data) {
         result = data;
         console.log("hello")
      }
   });
   $("#data").text("hello");
}

function loadStats(data) {
  $("#test").val(data);
}

var statsData;
function setData(data) {
  statsData = data;
}

$( document ).ready(function() {
  $.getJSON('http://localhost/APItest/data.php', function(data) {
    setData(data);
  });
});
