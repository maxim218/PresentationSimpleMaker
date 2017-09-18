"use strict";

export default class HTMLgetter{
    constructor(mass){

        document.getElementById("fullScreenBox").hidden = false;
        document.getElementById("resultBox").hidden = false;

        document.getElementById("resultTTT").value = "";


        this.mass = mass;
        this.slidesArr = [];

        for(let i = 0; i < 100; i++){
            this.slidesArr.push("\n<div hidden id = 'slide_" + i + "'>\n");
        }

        this.visitAllBoxes();

        for(let i = 0; i < 100; i++){
            this.slidesArr[i] += "</div>\n";
        }

        let answer = "";

        let colorString = document.getElementById("sceneBox").style.backgroundColor.toString();

        answer = answer + "<!DOCTYPE html> \n";
        answer = answer + "<html> \n";
        answer = answer + "<head> \n";
        answer = answer + "   <meta charset='UTF-8'> \n";
        answer = answer + "   <title>Презентация</title> \n";
        answer = answer + "   <style> \n      body { \n            font-family: Geneva, Arial, Helvetica, sans-serif; \n            background-color: " + colorString + ";\n      } \n   </style> \n";
        answer = answer + "</head> \n";
        answer = answer + "<body> \n";

        for(let i = 0; i < 100; i++){
            if(this.slidesArr[i].toString().length >= 50) {
                answer = answer + this.slidesArr[i].toString();
            }
        }

        answer += "\n<script src = 'jquery-3.2.1.min.js'></script>\n";
        answer += "\n<script src = 'presentationCode.js'></script>\n";

        answer += "\n</body>\n";
        answer += "</html>\n\n";

        document.getElementById("resultTTT").value = answer.toString();
    }

    visitAllBoxes(){
        for(let i = 0; i < this.mass.length; i++){
            const box = document.getElementById("box" + i);
            const slide = this.mass[i];

            const xx = parseInt(box.style.marginLeft);
            const yy = parseInt(box.style.marginTop);
            const ww = parseInt(box.style.width);
            const hh = parseInt(box.style.height);
            const ss = parseInt(box.style.fontSize);
            const tt = box.innerHTML;

            let s = "\n<div id = 'box" + i + "' style = 'position: absolute; margin-left: " + xx + "px; margin-top: " + yy + "px; width: " + ww + "px; height: " + hh + "px; font-size: " + ss + "px;'>\n" + tt + "\n</div>\n\n";
            this.slidesArr[slide] += s;
        }
    }

}