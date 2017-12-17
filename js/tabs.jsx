import React from 'react'
import ReactDOM from 'react-dom'
//import PlayerStats from './firstComponent'
var PlayerStats = require('./firstComponent.js');

class Tabs extends React.Component{
    constructor () {
        super()
        this.state = {
            selected: 0
        }
    }

    handleClick(index, event) {
        event.preventDefault();
        this.setState({
            selected: index
        });
    }
    _renderTitles() {
        function labels(child, index) {
            let activeClass = (this.state.selected === index ? 'active' : '');
            return (
                <li key={index}>
                    <a href="#"
                       className={activeClass}
                       onClick={this.handleClick.bind(this, index)}>
                        {child.props.label}
                    </a>
                </li>
            );
        }
        return (
            <ul className="tabs__labels">
                {this.props.children.map(labels.bind(this))}
            </ul>
        );
    }
    _renderContent() {
        return (
            <div className="tabs__content">
                {this.props.children[this.state.selected]}
            </div>
        );
    }
    render() {
        return (
            <div className="tabs">
                {this._renderTitles()}
                {this._renderContent()}
            </div>
        );
    }
}

class Pane extends React.Component{
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

class App extends React.Component{
    render() {
        return (
            <div>
                <Tabs selected={0}>
                    <Pane label="Tab 1">
                        <h1>PUBG Stats.mlg</h1>
                    </Pane>


                    <Pane label="Tab 2">
                        <div id="content">
                            <div id="searchSection">
                                <div className="row">
                                    <div id="test-circle"></div>
                                </div>
                                <script>
                                    $( document ).ready(function() {
                                    $("#test-circle").circliful({
                                    animationStep: 5,
                                    foregroundBorderWidth: 5,
                                    backgroundBorderWidth: 15,
                                    percent: 75
                                    })
                                    };
                                </script>
                                <h1>Search Users</h1>
                                <form method="post" action="playerStats.php">
                                    Username: <input type="text" name="userName"></input>
                                    <input type="submit"></input>
                                </form>
                                {/*<h2>Stats For: <script><?php echo $user; ?></script></h2>*/}
                            </div>
                            <div id="resultsContent">
                                <PlayerStats />
                            </div>
                        </div>
                    </Pane>


                    <Pane label="Tab 3">
                        <div>This is my tab 3 contents!</div>
                    </Pane>
                </Tabs>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('tabContent')
);

