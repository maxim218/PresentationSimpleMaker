"use strict";

export default class HTMLgetter{
    constructor(mass){

        this.mass = mass;
        this.slidesArr = [];

        for(let i = 0; i < 100; i++){
            this.slidesArr.push("<div hidden id = 'slide_" + i + "'>");
        }

        this.visitAllBoxes();

        for(let i = 0; i < 100; i++){
            this.slidesArr[i] += "</div>";
        }



        let answer = "";

        let colorString = document.getElementById("sceneBox").style.backgroundColor.toString();

        answer = answer + "<!DOCTYPE html>";
        answer = answer + "<html>";
        answer = answer + "<head>";
        answer = answer + "<meta charset='UTF-8'>";
        answer = answer + "<title>Презентация</title>";
        answer = answer + "<style> body { font-family: Geneva, Arial, Helvetica, sans-serif; background-color: " + colorString + ";} </style>";
        answer = answer + "</head>";
        answer = answer + "<body>";

        for(let i = 0; i < 100; i++){
            answer = answer + this.slidesArr[i].toString();
        }

        answer += "<script> function hideAll(){for(let i = 0; i < 100; i++) document.getElementById('slide_' + i).hidden = true; }; </script>";
        answer += "<script> let n = 0; window.onclick = function(){ n++; hideAll(); document.getElementById('slide_' + n).hidden = false; }; </script>";

        answer += "</body>";
        answer += "</html>";

        console.log(answer);
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

            let s = "<div id = 'box" + i + "' style = 'position: absolute; margin-left: " + xx + "px; margin-top: " + yy + "px; width: " + ww + "px; height: " + hh + "px; font-size: " + ss + "px;'>" + tt + "</div>";
            this.slidesArr[slide] += s;
        }
    }

}