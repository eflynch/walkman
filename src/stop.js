import React from 'react';

import FontAwesome from 'react-fontawesome';

class Stop extends React.Component {
    render () {
        if (this.props.active){
            return <span onClick={this.props.stop}><FontAwesome fixedWidth name="stop"/></span>;
        }

        return <span className="disabled"><FontAwesome fixedWidth name="stop"/></span>;
    }
}

module.exports = Stop;
