"use strict";

export default class BoxTextCreator{
    constructor(number){
        const boxHTMLcode = "<div id = 'box" + number + "' style = 'position: absolute; height: 100px; width: 100px; cursor: move; background-color: Peru; font-size: 20px; margin-left: 0px; margin-top: 0px;'><h1>&nbsp;&nbsp;" + number + "</h1></div>";
        document.getElementById("sceneBox").innerHTML += boxHTMLcode;
    }

    getElement(number){
        return document.getElementById("box" + number);
    }
};

