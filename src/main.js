import React from 'react';
import {render} from 'react-dom';

import Walkman from './walkman';
import {loadBufferList} from './lib';

document.addEventListener("DOMContentLoaded", function (){
    
    var directory = "audio/";

    var successHandler = function(data){
        var content = document.getElementById("content");
        render(<Walkman prefix={directory} tracks={data.tracks}/>, content);
    }

    var errorHandler = function(){
        console.log("Dude, that sucks!");
    }
    
    loadBufferList(directory, successHandler, errorHandler);
});
