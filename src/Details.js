/* Details page that shows the episode name, and rating upon a successful request*/

import './Details.css'
import React from 'react'

export default class Details extends React.Component {
    render() {
        return (
            <div className="details">
                S<span className="season-number">{this.props.data.season}</span>-E
                <span className="episode-number">{this.props.data.Episode}</span>
                &nbsp;<span className="title">{this.props.data.Title}</span>
                &nbsp;
                <a target="_blank" href={`https://www.imdb.com/title/${this.props.data.imdbID}/`}>
                    ({this.props.data.imdbRating}&#x2605;)
                </a>
            </div>
        );
    }
}