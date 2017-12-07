import React from 'react'
import ReactDOM from 'react-dom'

//react component
var createReactClass = require('create-react-class');
var PlayerStats = createReactClass({
  getInitialState: function() {
    return {videoId: ""}
  },
  HandleClick: function () {
    var video = $('#videoId').val();
    var time = $('#startTime').val();
    this.setState({videoId: video, startTime: "?start=" + time});
  },
  render:function() {
    return (
      //inline css styling in JSX
      <div style={{fontSize : "30px"}} className="commentBox">
        Enter a video ID: <input id="videoId"/><br />
        Enter a start time: <input id="startTime"/>
        <button onClick={this.HandleClick}>Load Video</button>
        <br />
        {this.state.videoId ? <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + this.state.videoId + this.state.startTime} frameBorder="0" allowFullscreen></iframe> : ""}
      </div>
    );
  }
});
//<iframe width="560" height="315" src="https://www.youtube.com/embed/uIS3ejRCwME?start=30" frameborder="0" allowfullscreen></iframe>
ReactDOM.render(
  <PlayerStats />,
  document.getElementById('playerStatsContent')
);
