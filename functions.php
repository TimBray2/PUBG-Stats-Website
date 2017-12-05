<?php
$_SESSION['soloStats'] = [];
$_SESSION['duoStats'] = [];
$_SESSION['squadStats'] = [];
$_SESSION['solo-fppStats'] = [];
$_SESSION['duo-fppStats'] = [];
$_SESSION['squad-fppStats'] = [];

function getPlayerStats() {
  $queryString = "?region=oc"; //Need to figure out how to adjust results with more paramaters for performance
//  $_SESSION['season'] = 'season=2017-pre5';
  $_SESSION['region'] = 'oc';
  //$ch = curl_init('https://api.pubgtracker.com/v2/profile/pc/' . $GLOBALS['user'] . '/' . $queryString);
  $ch = curl_init('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=8658ACC40D6D808454C608996A43F787&steamid=76561197979947606');
  // Returns the data/output as a string instead of raw data
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  //Set your auth headers
  $apikey = '1898182c-6af2-4365-b957-382ad3f62e45';
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      'TRN-Api-Key: ' . $apikey
      ));
  // get stringified data/output. See CURLOPT_RETURNTRANSFER
  $data = curl_exec($ch);
  $info = curl_getinfo($ch);
  // close curl resource to free up system resources
  curl_close($ch);
  return $data;
}
/*
make master object for each game mode that carries running totals to display averages
*/
//Sort the stats by game mode
function sortStats($result) {
  $totalData = [];
  for ($i = 0; $i < count($result['stats']); $i++) {
    $dataRow = $result['stats'][$i];
    if ($dataRow['region'] == $_SESSION['region']) {
      $totalData[] = $dataRow;
      switch($dataRow['mode']) {
        case 'solo':
          $_SESSION['soloStats'] = $dataRow;
          break;
        case 'duo':
          $_SESSION['duoStats'] = $dataRow;
          break;
        case 'squad':
          $_SESSION['squadStats'] = $dataRow;
          break;
        case 'solo-fpp':
          $_SESSION['solo-fppStats'] = $dataRow;
          break;
        case 'duo-fpp':
          $_SESSION['duo-fppStats'] = $dataRow;
          break;
        case 'squad-fpp':
          $_SESSION['squad-fpp'] = $dataRow;
          break;
      }
    }
  }
  $_SESSION['displayStats'] = $totalData;
}
//Display the data
function displayData($result) {
  sortStats($result);
  //$filters = getFilters();
  //echo $filters;
  echo 'User: ' . $GLOBALS['user'];
  for ($k = 0; $k < count($_SESSION['displayStats']); $k++) {
    //print_r($_SESSION['displayStats'][$k]);
    //sort depending on what they want
    //getRegion(); getMode(); getSeason();
    //filter by these

    //$section = $result['stats'][$k]['stats'];
    //print_r($result['stats'][$k]);
    echo "<div class='dataRow'><div class='rowTitle'>" . 'Region: ' . strtoupper($_SESSION['displayStats'][$k]['region'])
      . " \nMode: " . $_SESSION['displayStats'][$k]['mode']
      . " \nSeason: " . $_SESSION['displayStats'][$k]['season'] . "</div>";
    $stats = $_SESSION['displayStats'][$k]['stats'];
    echo "<div class='rowData'>"
      . $stats[1]['label'] . ": " . $stats[1]['displayValue'] . " - "
      . $stats[11]['label'] . ": " . $stats[11]['displayValue'] . " - "
      . $stats[15]['label'] . ": " . $stats[15]['displayValue'] . " - "
      . $stats[0]['label'] . ": " . $stats[0]['displayValue'] . "</div></div>";
  }
}
