import React from 'react';

import PlayPause from './play-pause';
import TimeLine from './time-line';
import Stop from './stop';
import TrackName from './track-name';
import ElapsedTime from './elapsed-time';

class Controls extends React.Component {   
    render () {
        return (
            <div>
                <PlayPause playing={this.props.playing}
                           activeBuffer={this.props.activeBuffer}
                           buffer={this.props.activeBuffer}
                           pause={this.props.pause}
                           play={this.props.play}
                           unpause={this.props.unpause}/>
                <Stop playing={this.props.playing} stop={this.props.stop} pausedTime={this.props.pausedTime}/>
                {" "}
                <TrackName activeBuffer={this.props.activeBuffer}/>
                <div>
                    <div style={{display:"inline-block", width:400}}>
                        <TimeLine playing={this.props.playing}
                                  activeBuffer={this.props.activeBuffer}
                                  startTime={this.props.startTime}
                                  pausedTime={this.props.pausedTime}
                                  seek={this.props.seek}/>
                    </div>
                    {" "}
                    <div style={{display:"inline-block", width:200}}>
                        <ElapsedTime playing={this.props.playing}
                                     activeBuffer={this.props.activeBuffer}
                                     startTime={this.props.startTime}
                                     pausedTime={this.props.pausedTime}/>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Controls;
