import React from 'react';

import PlayPause from './play-pause';
import TimeLine from './time-line';
import Stop from './stop';
import TrackName from './track-name';
import ElapsedTime from './elapsed-time';

class Controls extends React.Component {   
    render () {
        return (
            <div className="WALKMAN-controls">
                <PlayPause playing={this.props.playing}
                           buffer={this.props.activeBuffer}
                           pause={this.props.pause}
                           unpause={this.props.unpause}/>
                <Stop active={this.props.activeBuffer !== null} stop={this.props.stop}/>
                {" "}
                <TrackName buffer={this.props.activeBuffer}/>
                <div>
                    <div className="elapsed-time">
                        <ElapsedTime playing={this.props.activeBuffer !== null && !this.props.activeBuffer.getPaused()}
                                     buffer={this.props.activeBuffer}/>
                    </div>
                    {" "}
                    <div style={{width:"100%"}}>
                        <TimeLine playing={this.props.activeBuffer !== null && !this.props.activeBuffer.getPaused()}
                                  buffer={this.props.activeBuffer}
                                  seek={this.props.seek}/>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Controls;
