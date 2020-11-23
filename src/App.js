import './App.css'
import React from 'react'

import Details from './Details.js';
import config from './config.js'

export default class Form extends React.Component {

    /**
     * Constructor for Form class
     * 
     * @param {Object} props The React props object
     */
    constructor(props) {
        super(props);

        // Needed the search and seasons text from the input text files and need the result from API call
        this.state = { search: '', seasons: '', result: '' };

        // Bind all the functions to the class
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSeasonsChange = this.handleSeasonsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Handles the change of the seach input field - update state accordingly.
     * 
     * @param {Object} event The JS event object
     */
    handleSearchChange(event) {
        this.setState({ search: event.target.value });
    }
    
    /**
     * Handles the change of the seasons input field - update state accordingly.
     * 
     * @param {Object} event The JS event object
     */
    handleSeasonsChange(event) {
        this.setState({ seasons: event.target.value });
    }

    /**
     * Handles the click of the submit button - Request data from the server using input values, after 
     * randomizing the season numbers. 
     * 
     * @param {Object} event The JS event object
     */
    handleSubmit(event) {
        event.preventDefault(); //Prevent page reload 

        // Get the seach string from the user input. 
        let query = encodeURI(this.state.search);
        let self = this;

        // GET TV show from the API using the seach string
        fetch(`https://www.omdbapi.com/?apikey=${config.API_KEY}&t=${query}`)
            .then(res => res.json())
            .then(data => {

                // Get total seasons that the TV show has from API result
                let totalSeasons = data.totalSeasons;

                // Create array of all the values entered in the seasons input box 
                let seasons = self.state.seasons.trim().split(/[ ]+/);

                // Filter the season numbers array to exclude the number of seasons that the show never produced.
                seasons = seasons.filter(season => {
                    if (season === "") return false;

                    if (+season <= 0 || +season > totalSeasons) return false;

                    return true;
                })

                /**
                 * Get a random season
                 * If user input is empty, get a random number from all seasons form the TV show
                 * Else, get a random season the from seasons array 
                 */
                let randomSeason = (
                        seasons.length === 0 
                        ? Math.floor(Math.random() * totalSeasons) + 1
                        : seasons[Math.floor(Math.random() * seasons.length)] 
                    );

                // GET the details of the season from the server
                fetch(`https://www.omdbapi.com/?apikey=${config.API_KEY}&t=${query}&season=${randomSeason}`)
                    .then(res => res.json())
                    .then(data => {
                        // Generate a random episode from a list of all episodes in the season
                        let allEpisodes = data.Episodes;
                        let randomEpisode = allEpisodes[Math.floor(Math.random() * allEpisodes.length)];
                        
                        // Change state of the React app using the episode object from the server
                        self.setState({ result: {...randomEpisode, season: randomSeason} });
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <React.Fragment>
                <div className="donate-container">
                    <a className="donate-button" href="https://www.buymeacoffee.com/mrrobot">Support</a>
                </div>

                {
                    // Main section with user inputs
                }
                <div className="main">

                    <h1>Shufflix</h1>

                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="Enter TV show" className="show" type="text" value={this.state.search} onChange={this.handleSearchChange} />
                        <input placeholder="All Seasons" className="seasons" type="text" value={this.state.seasons} onChange={this.handleSeasonsChange} />
                        <input type="submit" value="Submit" />
                    </form>

                    {this.state.result !== '' ? <Details data={this.state.result} /> : <div></div>}

                </div>
                
                {
                    // Help section to guide the user on how to use the service
                }
                <div className="help">
                    <h2>How does this work?</h2>

                    <p>
                        This tool randomizes an episode from all the episodes in a TV show. Good while looking for a random episode to watch of <i>The Office</i> during lunch :)
                    </p>
                    
                    <p>
                        Enter a TV show name in the first box. Make sure to spell it correct.
                    </p>

                    <p>
                        (OPTIONAL) Enter season numbers you want to shuffle the episode from, separated by space. 
                        Example: 1 2 5 100 would randomize any episode within season 1, 2, 5 or 100. 
                        If left blank, system randomizes all episodes of the TV show.
                    </p>
                </div>
            </React.Fragment>
        );
    }
}