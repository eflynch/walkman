import React from 'react';

class TrackName extends React.Component {
    render () {
        if (this.props.buffer === null){
            return <span className="trackname disabled">---</span>;
        }
        return (
            <span className="trackname">
                {this.props.buffer.name.split('.')[0]}
            </span>
        );
    }
}

module.exports = TrackName;
