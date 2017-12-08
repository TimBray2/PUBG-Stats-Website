import React from 'react'
import ReactDOM from 'react-dom'

var Stats;
//Retrieve JSON info from PHP
var oReq = new XMLHttpRequest(); //New request object
oReq.onload = function() {
    //The actual data is found on this.responseText
    setPlayerStats(JSON.parse(this.responseText));
};
oReq.open("get", "data.php", false); //wait until the request finishes to continue
oReq.send();

//Set player stats
function setPlayerStats(stats) {
  Stats = stats;
}
var allSeasons = {"2017-pre1": "Pre-Season 1", "2017-pre2": "Pre-Season 2",
"2017-pre3": "Pre-Season 3", "2017-pre4": "Pre-Season 4",
"2017-pre5": "Pre-Season 5", '2017-pre6': "Pre-Season 6"};
//react component - get player stats
var createReactClass = require('create-react-class');
var PlayerStats = createReactClass({
  getInitialState: function() {
    return {playerStats: Stats, seasonValue: '2017-pre3'};
  },
  changeSeason: function(event) {
    this.setState({seasonValue: event.target.value})
  },
  render:function() {
    //Set data to be displayed
    var dataRows = [], playerSeasons = [], inputSeasons = [];
    for (var i = 0; i < this.state.playerStats.stats.length; i++) {
      var stats = this.state.playerStats.stats[i].stats
      var season = this.state.playerStats.stats[i].season;
      if (playerSeasons.indexOf(season) == -1) {
        playerSeasons.push(season);
        inputSeasons.push(<option key={'seasonOption-'+season} value={season}>{allSeasons[season]}</option>)
      }
      if (season == this.state.seasonValue) {
        dataRows.push(
          <div className="dataRow" key={"datarow-"+i}>
            <div className="rowTitle" key={"datarowtitle-"+i}>
              Region: {this.state.playerStats.stats[i].region.toUpperCase()}  /
              Mode: {this.state.playerStats.stats[i].mode}  /
              Season: {allSeasons[season]}
             </div>
             <div className="rowData">
              {stats[1].label}: {stats[1].displayValue} -
              {stats[11].label}: {stats[11].displayValue} -
              {stats[15].label}: {stats[15].displayValue} -
              {stats[0].label}: {stats[0].displayValue}
             </div>
          </div>
        )
      }
    }
    return (
      //inline css styling in JSX double brackets style={{fontSize : "1em"}}
      <div className="playerStatsCollection">
        <select className="seasons" onChange={this.changeSeason} value={this.state.seasonValue}>
          {inputSeasons}
        </select>
        <div>{dataRows}</div>
      </div>
    );
  }
});

ReactDOM.render(
  <PlayerStats />,
  document.getElementById('playerStatsContent')
);
