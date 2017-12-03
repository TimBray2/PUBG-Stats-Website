<?php
//header('Content-type: Application/JSON');
/* PRACTICE WITH FAKE DATA
//echo file_get_html('https://randomuser.me/api/?results=5');
$file = "https://randomuser.me/api/?results=2";
$data = file_get_contents($file);
//$data = mb_substr($data, strpos($data, '{'));
//$data = mb_substr($data, 0, -1);
$result = json_decode($data, true);
$people = $result['results'];
for ($i = 0; $i < count($people); $i++) {
  echo "Person " . ($i + 1) . ": " . $people[$i]['gender'] . "<br>";
}
$count = 0;
foreach ($people as $person) {
  echo "Person " . ($count + 1) . ": " . $people[$count]['gender'] . "<br>";
  $count++;
} */

//Retrieve data from PUBG stats
//setup the request, you can also use CURLOPT_URL
$ch = curl_init('https://api.pubgtracker.com/v2/profile/pc/JustChillz?region=oc&season=2017-pre5');
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

//Display the data
/*
-type e.g. 'stats'
-[0-x] season
- ['stats']
- [0 - x] is different stats e.g. 0 = KDR, 1 = winRatio
*/

/*$result = json_decode($data, JSON_PRETTY_PRINT);
//print_r($result); use if data is decoded ^^^ */
echo "<pre>" . $data . "</pre>";
$section = $result['stats'][0]['stats'];
for ($i = 0; $i < count($section); $i++) {
  echo $section[$i]['field'] . ": " . $section[$i]['displayValue'] . "<br>";
}
?>
