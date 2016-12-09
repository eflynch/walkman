class BufferWrapper {
    constructor(url, name, onended){
        this.url = url;
        this.name = name;
        this.audio = new Audio();
        this.audio.src = url;
        this.audio.controls = false;
        this.audio.onended = onended;
        document.body.appendChild(this.audio);
    }

    getDuration(){
        return this.audio.duration;
    }

    getTime(){
        return this.audio.currentTime;
    }

    getPaused(){
        return this.audio.paused;
    }

    play(){
        this.audio.play();
    }

    pause(){
        this.audio.pause();
    }

    seek(time){
        this.audio.currentTime = time;
    }

    setGain(gain){
        this.audio.volume = gain;
    }
}

var loadBufferList = function (directory, successHandler, errorHandler){
    var url = directory + "index.json";
    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function() {
        var status;
        var data;
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) { // `DONE`
            status = xhr.status;
            if (status == 200) {
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
}


module.exports ={
    loadBufferList: loadBufferList,
    BufferWrapper: BufferWrapper
}
