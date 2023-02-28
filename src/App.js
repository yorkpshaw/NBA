import React, {Component} from 'react';
import './App.css';
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerName: null,
      playerStats: {}
    }
  }

handleSubmit = (e) => { //What is e?
  e.preventDefault();
  this.getPlayerId()
  console.log(this.state.playerName)

}

// When you have a space, it replaces the space with an underscore for player names
handleChange = (event) => {
  // What is event?
  const replace = event.target.value.split(" ").join("_");
  if (replace.length > 0) {
    this.setState({ playerName: replace }) // This changes null to be what the player's name is
  } else {
    alert("Please type player's name!")
  }

};

  // This code searches for the players
  getPlayerId = () => {
    // Add variable to get dynamic names
    // Search for NBA player whose name matches query
    // Response object contains data (array of player objects)
    // and meta, an object that contains metadata about the response
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
      // console.log(res.data.data)
      // Fixes the "not defined" error
      // A player may be injured or hasn't played/too old/doesn't exist
      // Add the 0 index
      if (res.data.data[0] === undefined) {
        alert("This player is either injured or has not played.")
        // Name has been entered
      } else if (res.data.data.length > 1) {
        alert ("Please specify the name more!")
      } else {
        await this.getPlayerStats(res.data.data[0].id)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // This code returns the player stats
  getPlayerStats = (playerId) => {

    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=${playerId}`)
    .then(async res => {
      console.log(res.data.data)
      this.setState({ playerStats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }

  // Comment out so it doesn't automatically try to get a player
  // componentDidMount() {
  //   this.getPlayerId()
  //   this.getPlayerStats()
  // }

  render() {
  return (
    <div className="App">
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
        <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        placeholder="Please enter player's name"
        />
        </label>
        <input type="submit" value="Submit" />
      </form>
      Games Played: {this.state.playerStats["games_played"]}
      <br />
      Points Averaged: {this.state.playerStats["pts"]}
      <br />
      Rebounds Averaged: {this.state.playerStats["reb"]}
      <br />
      Assists Averaged: {this.state.playerStats["ast"]}
    </div>
  );
}
};

export default App;
