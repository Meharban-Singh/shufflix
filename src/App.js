import './App.css'
import React from 'react'

import Details from './Details.js';
import config from './config.js'

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: '', seasons: '', result: '' };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSeasonsChange = this.handleSeasonsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSearchChange(event) {
        this.setState({ search: event.target.value });
    }

    handleSeasonsChange(event) {
        this.setState({ seasons: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        let query = encodeURI(this.state.search);
        let self = this;

        // GET show from the api
        fetch(`http://www.omdbapi.com/?apikey=${config.API_KEY}&t=${query}`)
            .then(res => res.json())
            .then(data => {

                // Check if the user entered valid seasons, only accpet valid seasons
                let totalSeasons = data.totalSeasons;
                let seasons = self.state.seasons.trim().split(/[ ]+/);

                // Filter those season numbers which exist. 
                seasons = seasons.filter(season => {
                    if (season === "") return false;

                    if (+season <= 0 || +season > totalSeasons) return false;

                    return true;
                })

                // Get a random season 
                let randomSeason = (
                        seasons.length === 0 
                        ? Math.floor(Math.random() * totalSeasons) + 1
                        : seasons[Math.floor(Math.random() * seasons.length)] 
                    );

                fetch(`http://www.omdbapi.com/?apikey=${config.API_KEY}&t=${query}&season=${randomSeason}`)
                    .then(res => res.json())
                    .then(data => {
                        // Get random episode
                        let allEpisodes = data.Episodes;
                        let randomEpisode = allEpisodes[Math.floor(Math.random() * allEpisodes.length)];
                        
                        self.setState({ result: randomEpisode });
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.search} onChange={this.handleSearchChange} />
                    <input type="text" value={this.state.seasons} onChange={this.handleSeasonsChange} />

                    <input type="submit" value="Submit" />
                </form>

                {this.state.result !== '' ? <Details data={this.state.result} /> : <div></div>}

            </div>
        );
    }
}