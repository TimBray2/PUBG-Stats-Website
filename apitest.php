<?php
//header('Content-type: Application/JSON');
//Retrieve data from PUBG stats
//setup the request, you can also use CURLOPT_URL
$user = 'VissGames';
function getPlayerStats() {
  $queryString = "?region=na&season=2017-pre4"; //Need to figure out how to adjust results with more paramaters for performance
  $ch = curl_init('https://api.pubgtracker.com/v2/profile/pc/' . $GLOBALS['user'] . '/' . $queryString);
  // Returns the data/output as a string instead of raw data
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  //Set your auth headers
  $apikey = '1898182c-6af2-4365-b957-382ad3f62e45';
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      'TRN-Api-Key: ' . $apikey
      ));
  // get stringified data/output. See CURLOPT_RETURNTRANSFER
  $data = curl_exec($ch);
  // get info about the request
  $info = curl_getinfo($ch);
  // close curl resource to free up system resources
  curl_close($ch);
  return $data;
}
$data = getPlayerStats();
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

$result = json_decode($data, JSON_PRETTY_PRINT);
$section = $result['stats'][0]['stats'];
//Display the data
function displayData($result) {
  echo 'User: ' . $GLOBALS['user'];
  for ($k = 0; $k < count($result['stats']); $k++) {
    //sort depending on what they want
    //getRegion(); getMode(); getSeason();
    //filter by these

    $section = $result['stats'][$k]['stats'];
    //print_r($result['stats'][$k]);
    echo "<br>------------------------------------------------------------------";
    echo "<h2>" . 'Region: ' . strtoupper($result['stats'][$k]['region'])
      . " \nMode: " . $result['stats'][$k]['mode']
      . " \nSeason: " . $result['stats'][$k]['season'] . " </h2>";
    for ($i = 0; $i < count($section); $i++) {
      echo "<p class='dataRow'>" . $section[$i]['field'] . ": " . $section[$i]['displayValue'] . "</p>";
    }
  }
}
?>
<html>
<head>
  <link rel="stylesheet" href="css/stylesheet.css">
</head>
<body>
  <div id="dataPicker">
    <h2>Selection Area</h2>
    <p>region / season / mode</p>
    <!-- selection tools  -->
  </div>
  <div id="resultsContent">
    <h2>Data</h2>
    <pre id="data"><?php displayData($result); ?></pre>
  </div>
</body>
</html>
