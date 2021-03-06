import React from 'react';

import PlayPause from './play-pause';

class Track extends React.Component {
    onClickHandler(e){
        this.props.play(this.props.buffer, 0);
        this.props.select(this.props.number);
    }
    render (){
        var className = "trackname";
        if (this.props.selected){
            className += " selected";
        }
        if (this.props.buffer === this.props.activeBuffer){
            className += " playing";
        }
        return (
            <li className={this.props.buffer === undefined ? "disabled" : ""}>
                {function(){
                    if (this.props.buffer === this.props.activeBuffer){
                        return <PlayPause buffer={this.props.buffer}
                           unpause={this.props.unpause}
                           pause={this.props.pause}
                           playing={this.props.playing}/>;
                    } 
                }.bind(this)()}
                <span className={className}
                      onClick={this.onClickHandler.bind(this)}>{this.props.number + ". " + this.props.name.split(".")[0]}</span>
            </li>
        );
    }
}


class TrackList extends React.Component {   
    constructor(props){
        super(props);
        this.state={selectedTrack:0};
    }
    componentWillMount(){
        document.onkeydown = function(e){
            if (e.key === "j" || e.key === "ArrowDown"){
                this.setState({selectedTrack: (this.state.selectedTrack + 1) % this.props.tracks.length});
            }
            if (e.key === "k" || e.key === "ArrowUp"){
                this.setState({selectedTrack: (this.state.selectedTrack - 1 + this.props.tracks.length) % this.props.tracks.length});
            }
            if (e.key === "h" || e.key === "ArrowLeft"){
                if (this.props.activeBuffer === null){
                    return;
                }
                this.props.seek(Math.max(this.props.activeBuffer.getTime() - 5,0));
            }
            if (e.key === "l" || e.key === "ArrowRight"){
                if (this.props.activeBuffer === null){
                    return;
                }
                this.props.seek(Math.min(this.props.activeBuffer.getTime() + 5,this.props.activeBuffer.getDuration()));
            }
            if (e.key === "Enter"){
                this.props.play(this.props.buffers[this.props.tracks[this.state.selectedTrack]], 0);
            }
            if (e.key === "s"){
                this.props.stop();
            }
            if (e.key === " "){
                if (this.props.activeBuffer === null){
                    this.props.play(this.props.buffers[this.props.tracks[this.state.selectedTrack]], 0);
                } else {
                    if (this.props.playing){
                        this.props.pause();
                    } else {
                        if (this.props.pausedTime !== null){
                            this.props.unpause();
                        } else {
                            this.props.play(this.props.buffers[this.props.tracks[this.state.selectedTrack]], 0);
                        }
                    }
                }
            }
        }.bind(this);
    }
    select(number){
        this.setState({selectedTrack: number});
    }
    componentWillUnmount(){
        document.onkeydown = null;
    }
    render () {
        return (
            <div>
                {this.props.tracks.map(function(name, i){
                    return <Track key={name} select={this.select.bind(this)} selected={i===this.state.selectedTrack} number={i} unpause={this.props.unpause} pause={this.props.pause} play={this.props.play} playing={this.props.playing} name={name} buffer={this.props.buffers[name]} activeBuffer={this.props.activeBuffer}/>;
                }.bind(this))}
            </div>
        );
    }
}

module.exports = TrackList;
