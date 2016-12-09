import React from 'react';

class TimeLine extends React.Component {
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
    onClick(e){
        if (this.props.activeBuffer === null){
            return;
        }
        var time = e.clientX / e.currentTarget.offsetWidth * this.props.activeBuffer.buffer.duration;
        this.props.seek(time);
    }
    render (){
        if (this.props.playing){
            var elapsed = ((this.state.now - this.props.startTime) / 1000);
            var width = 100 * elapsed / this.props.activeBuffer.buffer.duration;
            return (
                <div onClick={this.onClick.bind(this)} style={{display:"inline-block", width: "100%", height: 10}}>
                    <div>
                        <div style={{width: width +"%", height: 4, borderBottom: "solid 1px white", display:"inline-block"}}/>
                        <div style={{width: (100-width) + "%", height: 4, borderBottom: "solid 1px gray", display:"inline-block"}}/>
                    </div>
                    <div/>
                </div>
            );
        }

        if (this.props.pausedTime !== null){
            var elapsed = this.props.pausedTime / 1000;
            var width = 100 * elapsed / this.props.activeBuffer.buffer.duration;
            return (
                <div onClick={this.onClick.bind(this)} style={{display:"inline-block", width: "100%", height: 10}}>
                    <div>
                        <div style={{width: width +"%", height: 4, borderBottom: "solid 1px white", display:"inline-block"}}/>
                        <div style={{width: (100-width) + "%", height: 4, borderBottom: "solid 1px gray", display:"inline-block"}}/>
                    </div>
                    <div/>
                </div>
            );
        }

        return (
            <div onClick={this.onClick.bind(this)} style={{display:"inline-block", width: "100%", height: 10}}>
                <div>
                    <div style={{width: "100%", height: 4, borderBottom: "solid 1px gray", display:"inline-block"}}/>
                </div>
                <div/>
            </div>
        );
    }
}

module.exports = TimeLine;
