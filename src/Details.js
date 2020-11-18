import './Details.css'
import React from 'react'

export default class Details extends React.Component {
    render() {
        console.log(this.props.data);
        return (
            <div className="details">
            </div>
        );
    }
}