import React from 'react'
import ReactDOM from 'react-dom'

var Stats;
//react component
var oReq = new XMLHttpRequest(); //New request object
oReq.onload = function() {
    //This is where you handle what to do with the response.
    //The actual data is found on this.responseText
    setPlayerStats(this.responseText); //Will alert: 42
};
oReq.open("get", "data.php", false);
//                               ^ Don't block the rest of the execution.
//                                 Don't wait until the request finishes to
//                                 continue.
oReq.send();
function setPlayerStats(stats) {
  Stats = stats;
}
var createReactClass = require('create-react-class');
var PlayerStats = createReactClass({
  getInitialState: function() {
    return {playerStats: JSON.parse(Stats), count: 0};
  },
  HandleClick: function () {
    var newCount = this.state.count + 1;
    if (newCount == this.state.playerStats.stats.length) {
      newCount = 0;
    }
    this.setState({count: newCount});
    /*this.state.items = [];
    for (var i = 0; i < this.state.playerStats['stats'][i].length; i++) {
      this.state.items.push(
        <div className="statRow" key={i}>{this.state.playerStats['stats'][i]['stats']}</div>
      )
    }*/
  },
  render:function() {
    var dataRows = [];
    for (var i = 0; i < this.state.playerStats.stats.length; i++) {
      dataRows.push(
        <div className="dataRow" key={"datarow-"+i}>{this.state.playerStats.stats[i].mode}</div>
      )
    }
    return (
      //inline css styling in JSX
      <div style={{fontSize : "1em"}} className="commentBox">
        Enter a video: <input id="videoId"/><br />
        <button onClick={this.HandleClick}>Update Stats</button>
        <br />
        <div>{dataRows[this.state.count]}</div>
      </div>
    );
  }
});
//<iframe width="560" height="315" src="https://www.youtube.com/embed/uIS3ejRCwME?start=30" frameborder="0" allowfullscreen></iframe>
ReactDOM.render(
  <PlayerStats />,
  document.getElementById('playerStatsContent')
);
