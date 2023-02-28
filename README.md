-Two functions. One grabs the player's ID, one grabs the statistics.
-Install axios

-Query parameters code:
  getPlayerId = () => {
    axios.get("https://www.balldontlie.io/api/v1/players?search=lebron") // Query parameter url
    .then(async res => {
      console.log(res.data.data) // I don't quite understand res.data.data
    }).catch(err => {
      console.log(err)
    })
  }


API: balldontlie.io/home.html#players
