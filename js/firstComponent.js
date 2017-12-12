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
      var region = this.state.playerStats.stats[i].region.toUpperCase()
      var mode = this.state.playerStats.stats[i].mode
      if (playerSeasons.indexOf(season) == -1) {
        playerSeasons.push(season);
        inputSeasons.push(<option key={'seasonOption-'+season} value={season}>{allSeasons[season]}</option>)
      }
      if (season == this.state.seasonValue) {
        dataRows.push(
          <div className="dataRow" key={"datarow-"+i}>
            <StatsTitleRow id={i} season={season} region={region} mode={mode} />
            <StatsSummaryRow stats={stats} />
          </div>
        )
      }
    }
    return (
      <div className="playerStatsCollection">
        <select className="seasons" onChange={this.changeSeason} value={this.state.seasonValue}>
          {inputSeasons}
        </select>
        <div>{dataRows}</div>
      </div>
    );
  }
});

function StatsTitleRow(props) {
  return (
  <div className="rowTitle" key={"datarowtitle-"+props.id}>
    <h2 className="rowHeader">Region: {props.region}</h2>
    <h2 className="rowHeader">Mode: {props.mode}</h2>
    <h2 className="rowHeader">Season: {allSeasons[props.season]}</h2>
  </div>
  )
}

function StatsSummaryRow2(props) {
  return (
   <div className="rowData">
     {props.stats[1].label}: {props.stats[1].displayValue} -
     {props.stats[11].label}: {props.stats[11].displayValue} -
     {props.stats[15].label}: {props.stats[15].displayValue} -
     {props.stats[0].label}: {props.stats[0].displayValue}
     <div>
     </div>
   </div>
  )
}

class StatsSummaryRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleShowLess = this.handleShowLess.bind(this);
    this.state = {showMore: false}
  }
  handleShowMore() {
    this.setState({showMore: true})
  }
  handleShowLess() {
    this.setState({showMore: false})
  }

  render() {
    const showMore = this.state.showMore;
    let dropDown = null;

    if (showMore) {
      dropDown = <div className="showMore">
          <ShowMoreStats onClick={this.handleShowLess} stats={this.props.stats}/>
          <button onClick={this.handleShowLess}>Show Less</button>
          </div>;
    } else {
      dropDown =  <div className="showMore">
          <button onClick={this.handleShowMore}>Show More</button>
          </div>;
    }
    return (
     <div className="rowData">
       {this.props.stats[1].label}: {this.props.stats[1].displayValue} -
       {this.props.stats[11].label}: {this.props.stats[11].displayValue}
       {this.props.stats[15].label}: {this.props.stats[15].displayValue} -
       {this.props.stats[0].label}: {this.props.stats[0].displayValue}
       <hr className="showMoreLineDivide"/>
       {dropDown}
     </div>
     )
   }
};
function ShowMoreStats(props) {
    var moreInfo = [];
    //moreInfo.push(<div className='moreStats'>);
    for (var i = 0; i < props.stats.length - 1; i++) {
      //if (i % 5 == 0 && i != 0) {
        //moreInfo.push(</div><div>);
      //}
      moreInfo.push(
        <p className="extraStatsItem">{props.stats[i].label}: {props.stats[i].displayValue}</p>
      )
    }
    //moreInfo.push(</div>)
    return moreInfo;
}

ReactDOM.render(
  <PlayerStats />,
  document.getElementById('playerStatsContent')
);
