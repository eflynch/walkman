import React from 'react';

class TrackName extends React.Component {
    render () {
        if (this.props.activeBuffer === null){
            return <span className="disabled">---</span>;
        }
        return (
            <span>
                {this.props.activeBuffer.name.split('.')[0]}
            </span>
        );
    }
}

module.exports = TrackName;
