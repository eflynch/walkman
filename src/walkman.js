import React from 'react';

import Controls from './controls';
import TrackList from './track-list';
import {loadBuffer, loadBufferList, BufferWrapper} from './lib';

class Walkman extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buffers: {},
            playing: false,
            activeBuffer: null,
            startTime: null,
            pausedTime: null
        };
        this.ctx = new AudioContext();

        this.onBufferLoad = this.onBufferLoad.bind(this);
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
                loadBuffer(this.ctx,
                           this.props.prefix + nextProps.tracks[i], 
                           nextProps.tracks[i],
                           this.onBufferLoad,
                           function(bufferURL){console.log("failed to load " + bufferURL);
                });
            }
        }
    }

    onBufferLoad(buffer){
        this.state.buffers[buffer.name] = buffer;
        this.setState({buffers: this.state.buffers});
    }

    pause(){
        if (!this.state.playing){
            return;
        }
        this.state.activeBuffer.stop(this.ctx);
        this.setState({
            playing: false,
            pausedTime: new Date() - this.state.startTime
        });
    }

    unpause(){
        if (this.state.playing){
            return;
        }
        this.state.activeBuffer.start(this.ctx, this.state.pausedTime / 1000, this.onEndedHandler);
        this.setState({
            playing: true,
            pausedTime: null,
            startTime: new Date() - this.state.pausedTime
        })
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
        if (this.state.playing){
            this.stop();
        }
        buffer.start(this.ctx, 0, this.onEndedHandler);
        this.setState({
            activeBuffer: buffer,
            playing: true,
            startTime: new Date()
        });
    }

    stop(){
        if (this.state.activeBuffer === null){
            return;
        }
        this.state.activeBuffer.stop(this.ctx);
        this.setState({
            activeBuffer: null,
            playing: false,
            startTime: null,
            pausedTime: null
        });
    }

    seek(time){
        if (this.state.activeBuffer === null){
            return;
        }
        if (this.state.playing){
            this.state.activeBuffer.stop(this.ctx);
            this.state.activeBuffer.start(this.ctx, time, this.onEndedHandler);
            this.setState({
                pausedtime: null,
                startTime: new Date() - (time * 1000)
            });
        } else {
            this.setState({pausedTime: time * 1000});
        }
    }

    render(){
        return (
            <div className="WALKMAN">
                <Controls activeBuffer={this.state.activeBuffer}
                          playing={this.state.playing}
                          now={this.props.now}
                          startTime={this.state.startTime}
                          pausedTime={this.state.pausedTime}
                          play={this.play}
                          pause={this.pause}
                          stop={this.stop}
                          seek={this.seek}
                          unpause={this.unpause}/>
                <div style={{height:20, width:20}}/>
                <TrackList tracks={this.props.tracks}
                           activeBuffer={this.state.activeBuffer}
                           startTime={this.state.startTime}
                           pausedTime={this.state.pausedTime}
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

export {Walkman, loadBuffer, loadBufferList, BufferWrapper};
export default Walkman;
