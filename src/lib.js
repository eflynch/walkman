class BufferWrapper {
    constructor(name, buffer, gain){
        this.name = name;
        this.buffer = buffer;
        this.gain = gain;
        this.srcNode = false;
        this.gainNode = false;
    }

    start(ctx, time, callback){
        var srcNode = ctx.createBufferSource();
        var gainNode = ctx.createGain();
        srcNode.buffer = this.buffer;
        srcNode.loop = false;
        srcNode.onended = callback || function(){};
        srcNode.connect(gainNode);
        gainNode.connect(ctx.destination);
        gainNode.gain.value = this.gain;
        srcNode.start(ctx.currentTime,time);
        this.srcNode = srcNode;
        this.gainNode = gainNode;
    }

    stop(ctx){
        if (this.srcNode){
            this.srcNode.onended = null;
            this.srcNode.stop();
            this.srcNode = false;
            this.gainNode = false;
        }
    }

    setGain(gain){
        this.gain = gain;
        if (this.gainNode){
            this.gainNode.gain.value = gain;
        }
    }
}

var loadBuffer = function (ctx, bufferURL, name, onSuccess, onFail) {
    var req = new XMLHttpRequest();
    req.open("GET", bufferURL, true);
    req.responseType = "arraybuffer";
    req.onload = function (e) {
        if (this.status == 200){
            ctx.decodeAudioData(req.response, (buffer) => {
                onSuccess(new BufferWrapper(name, buffer, 1.0));
            });
        } else {
            onFail(name);
        }
    }
    req.send();
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
    loadBuffer: loadBuffer,
    loadBufferList: loadBufferList,
    BufferWrapper: BufferWrapper
}