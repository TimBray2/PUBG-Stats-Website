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
//react component - get player stats
var createReactClass = require('create-react-class');
var PlayerStats = createReactClass({
  getInitialState: function() {
    return {playerStats: Stats, count: 0};
  },
  HandleClick: function () {
    var newCount = this.state.count + 1;
    if (newCount == this.state.playerStats.stats.length) {
      newCount = 0;
    }
    this.setState({count: newCount});
  },
  render:function() {
    var dataRows = [];
    for (var i = 0; i < this.state.playerStats.stats.length; i++) {
      var stats = this.state.playerStats.stats[i].stats
      dataRows.push(
        <div className="dataRow" key={"datarow-"+i}>
          <div className="rowTitle" key={"datarowtitle-"+i}>
            Region: {this.state.playerStats.stats[i].region.toUpperCase()}  /
            Mode: {this.state.playerStats.stats[i].mode}  /
            Season: {this.state.playerStats.stats[i].season}
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
    return (
      //inline css styling in JSX double brackets style={{fontSize : "1em"}}
      <div className="playerStatsCollection">
        <button onClick={this.HandleClick}>Load Video</button>
        <div>{dataRows[this.state.count]}</div>
      </div>
    );
  }
});

ReactDOM.render(
  <PlayerStats />,
  document.getElementById('playerStatsContent')
);
