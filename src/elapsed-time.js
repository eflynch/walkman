import React from 'react';

class ElapsedTime extends React.Component {
    constructor(props){
        super(props);
        this.state = {now: null};
    }
    componentWillReceiveProps(nextProps){
        if (this.props.playing === false && nextProps.playing === true){
            this.setState({now: new Date()});
            this.updateInterval = setInterval(function(){
                this.setState({now: new Date()});
            }.bind(this), 100);
        }
        if (this.props.playing === true && nextProps.playing === false){
            clearInterval(this.updateInterval);
            this.setState({now: null});
        }
    }
    formatTime(fseconds){
        var minutes = Math.floor(fseconds/60);
        var seconds = Math.floor(fseconds - minutes*60);
        if (seconds < 10){
            return minutes + ":0" + seconds;
        } else {
            return minutes + ":" + seconds;
        }
    }
    render (){
        if (this.props.buffer === null){
            return (
                <div> 00:00/00:00 </div>
            );
        }

        var elapsed = this.props.buffer.getTime();
        var total = this.props.buffer.getDuration();
        
        return (
            <div>{this.formatTime(elapsed)}/{this.formatTime(total)}</div>
        );

        
    }
}

module.exports = ElapsedTime;
