import React from 'react';
import FontAwesome from 'react-fontawesome';

class PlayPause extends React.Component {
    render () {
        if (this.props.buffer === null || this.props.buffer === undefined){
            return <span className="disabled"><FontAwesome fixedWidth name="play"/></span>;
        }

        if (this.props.activeBuffer === this.props.buffer){
            if (this.props.playing){
                return <span onClick={this.props.pause}><FontAwesome fixedWidth name="pause"/></span>;
            }

            return <span onClick={this.props.unpause}><FontAwesome fixedWidth name="play"/></span>;
        }

        return <span onClick={function(){
            this.props.play(this.props.buffer, 0);
        }.bind(this)}><FontAwesome fixedWidth name="play"/></span> 
    }
}

module.exports = PlayPause;
