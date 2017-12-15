<?php
require('functions.php');
session_start();
//$user = $_POST['userName'];

if( isset($_POST['userName']) ){
    $user = $_POST['userName'];
}
else{
    $user = 'JustChillz';
}


$_SESSION['playerStats'] = getPlayerStats();
/*
-type e.g. 'stats'
- [0-x] season
- ['stats']
- [0 - x] is different stats e.g. 0 = KDR, 1 = winRatio
*/
//Sort using these from user input if not possible to use
$region = 'oc';
$season = '2017-pre5';
$result = json_decode($_SESSION['playerStats'], JSON_PRETTY_PRINT);
$prettyData = pretty_json($_SESSION['playerStats']);
$_SESSION['playerStats'] = $result;
//echo "<pre>" . $prettyData . "</pre>";
//sortStats($result);
//get the search filters
?>
<html>
<head>
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"
  rel="stylesheet" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb"
  crossorigin="anonymous">
  <link href="css/stylesheet.css" rel="stylesheet" type="text/css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <link href="css/jquery.circliful.css" rel="stylesheet" type="text/css" />
  <script src="js/jquery.circliful.min.js"></script>
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
</head>
<body>
  <div id="wrapper">
    <div id="content">
      <div id="searchSection">
        <div class="row">
                <div id="test-circle"></div>
        </div>
        <script>
            $( document ).ready(function() {
        	$("#test-circle").circliful({
                        animationStep: 5,
                        foregroundBorderWidth: 5,
                        backgroundBorderWidth: 15,
                        percent: 75
                   });
           });
        </script>
          <h1>Search Users</h1>
          <form method="post" action="playerStats.php">
          Username: <input type="text" name="userName">
          <input type="submit">
          </form>
          <h2>Stats For: <?php echo $user; ?></h2>
        </div>
      <div id="resultsContent">
        <div id="playerStatsContent"></div>
      </div>
    </div>
  </div>
  <script src="js/bundle.js"></script>
</body>
</html>
