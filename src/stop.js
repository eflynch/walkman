import React from 'react';

import FontAwesome from 'react-fontawesome';

class Stop extends React.Component {
    render () {
        if (this.props.playing){
            return <span onClick={this.props.stop}><FontAwesome fixedWidth name="stop"/></span>;
        }

        if (this.props.pausedTime !== null){
            return <span onClick={this.props.stop}><FontAwesome fixedWidth name="stop"/></span>;
        }

        return <span className="disabled"><FontAwesome fixedWidth name="stop"/></span>;
    }
}

module.exports = Stop;
