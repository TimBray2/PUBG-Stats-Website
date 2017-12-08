<?php
require('functions.php');
session_start();
//$user = $_POST['userName'];
$user = 'JustChillz';
$_SESSION['playerStats'] = getPlayerStats();
/*
-type e.g. 'stats'
- [0-x] season
- ['stats']
- [0 - x] is different stats e.g. 0 = KDR, 1 = winRatio

$result = json_decode($data, JSON_PRETTY_PRINT);
//print_r($result); //use if data is decoded ^^^
//echo "<pre>" . $data . "</pre>";
$section = $result['stats'][0]['stats'];
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
  <link href="css/stylesheet.css" rel="stylesheet" type="text/css">
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
</head>
<body onload="loadStats()">
  <div id="wrapper">
    <div id="content">
      <div id="searchSection">
          <h1>Search Users</h1>
          <form method="post" action="playerStats.php">
          Username: <input type="text" name="userName">
          <input type="submit">
          </form>
        </div>
      <div id="dataPicker">
        <h2>Selection Area</h2>
        <p>region / season / mode</p>
        <!-- selection tools  -->
      </div>
      <div id="resultsContent">
        <script>
          //function reqListener () {
          //  console.log(this.responseText);
          //}


      </script>
        <div id="playerStatsContent"></div>
        <div id="data"><?php //displayData($result); ?></div>
      </div>
    </div>
  </div>
  <script src="js/bundle.js"></script>
  <script src="js/getData.js"></script>
</body>
</html>
