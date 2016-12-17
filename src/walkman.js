import React from 'react';

import Controls from './controls';
import TrackList from './track-list';
import {loadBufferList, BufferWrapper} from './lib';

class Walkman extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buffers: {},
            playing: false,
            activeBuffer: null
        };

        this.pause = this.pause.bind(this);
        this.unpause = this.unpause.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.seek = this.seek.bind(this);
        this.onEndedHandler = this.onEndedHandler.bind(this);
    }

    componentDidMount(){
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps){
        for (var i=0; i < nextProps.tracks.length; i++){
            if (this.state.buffers[nextProps.tracks[i]] === undefined){
                var newBuffer = new BufferWrapper(
                   this.props.prefix + nextProps.tracks[i], 
                   nextProps.tracks[i],
                   this.onEndedHandler);
                this.state.buffers[newBuffer.name] = newBuffer;
                this.setState({buffers: this.state.buffers});
            }
        }
    }

    pause(){
        if (this.state.activeBuffer === null || this.state.activeBuffer.getPaused()){
            return;
        }
        this.state.activeBuffer.pause();
        this.setState({playing: false});
    }

    unpause(){
        if (this.state.activeBuffer === null){
            return;
        }
        if (!this.state.activeBuffer.getPaused()){
            return;
        }
        this.state.activeBuffer.play();
        this.setState({playing: true});
    }

    onEndedHandler(e){
        var oldName = this.state.activeBuffer.name;
        for (var i=0; i < this.props.tracks.length - 1; i++){
            if (oldName === this.props.tracks[i]){
                this.play(this.state.buffers[this.props.tracks[i+1]]);
                return;
            }
        }
        this.stop();
    }

    play(buffer){
        if (buffer === undefined){
            return;
        }
        if (this.state.activeBuffer !== null){
            this.stop();
        }
        buffer.seek(0);
        buffer.play();
        this.setState({
            activeBuffer: buffer,
            playing: true
        });
    }

    stop(){
        if (this.state.activeBuffer === null){
            return;
        }
        this.state.activeBuffer.pause();
        this.setState({
            activeBuffer: null,
            playing: false
        });
    }

    seek(time){
        if (this.state.activeBuffer === null){
            return;
        }
        this.state.activeBuffer.seek(time);
    }

    render(){
        return (
            <div className="WALKMAN">
                <Controls activeBuffer={this.state.activeBuffer}
                          playing={this.state.playing}
                          play={this.play}
                          pause={this.pause}
                          stop={this.stop}
                          seek={this.seek}
                          unpause={this.unpause}/>
                <TrackList tracks={this.props.tracks}
                           activeBuffer={this.state.activeBuffer}
                           buffers={this.state.buffers}
                           playing={this.state.playing}
                           play={this.play}
                           pause={this.pause}
                           stop={this.stop}
                           seek={this.seek}
                           unpause={this.unpause}/>
            </div>
        );
    }
}

export {Walkman, loadBufferList, BufferWrapper};
export default Walkman;
