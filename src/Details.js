import './Details.css'
import React from 'react'

export default class Details extends React.Component {
    render() {
        console.log(this.props.data);
        return (
            <div className="details">
                <span className="season-number">{this.props.data.season}</span>
                <span className="episode-number">{this.props.data.Episode}</span>
                <span className="title">{this.props.data.Title}</span>
                <a href={`https://www.imdb.com/title/${this.props.data.imdbID}/`}>IMDB - {this.props.data.imdbRating}</a>
            </div>
        );
    }
}