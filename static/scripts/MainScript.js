"use strict";

import BoxTextCreator from "./BoxTextCreator.js";
import HTMLgetter from "./HTMLgetter.js";

class MainScript{
    constructor(){

        document.getElementById("sceneBox").style.backgroundColor = "#14ffbd";

        this.number = 0;
        this.addEventsToButtons();
        this.addEventToHolst();
        this.addEventToOKbutton();

        this.mass = [];

        this.slide = 1;
        this.addListenersToSlideButtons();

        this.showFonOfTextOrNotShow();
        this.getHTMLcodeOfPresentation();

        this.addEventToCloseBTN();
    }

    addEventToCloseBTN(){
        document.getElementById("resultBTN").addEventListener("click", function(){
            document.getElementById("fullScreenBox").hidden = true;
            document.getElementById("resultBox").hidden = true;
        });
    }

    getHTMLcodeOfPresentation(){
        const t = this;
        document.getElementById("getHTMLbutton").addEventListener("click", function(){
             const htmlGetterObj = new HTMLgetter(t.mass);
        });
    }

    showFonOfTextOrNotShow(){
        const t = this;
        const obj = document.getElementById("showTextFonOnOff");
        obj.addEventListener("click", function () {
            if(obj.innerHTML === "Скрыть"){
                obj.innerHTML = "Показать";
                for(let i = 0; i < t.number; i++){
                    const box = document.getElementById("box" + i);
                    box.style.backgroundColor = null;
                }
            } else {
                obj.innerHTML = "Скрыть";
                for(let i = 0; i < t.number; i++){
                    const box = document.getElementById("box" + i);
                    box.style.backgroundColor = "Peru";
                }
            }
        });
    }

    changeSlide(){
        const t = this;

        document.getElementById("slideNumBox").innerHTML = t.slide.toString();
        document.getElementById("rightMenu").hidden = true;

        for(let i = 0; i < t.number; i++){
            const box = document.getElementById("box" + i);
            box.hidden = true;
        }

        for(let i = 0; i < t.number; i++){
            const box = document.getElementById("box" + i);
            if(t.mass[i] === t.slide){
                box.hidden = false;
            }
        }

    }



    addListenersToSlideButtons(){
        const t = this;

        document.getElementById("bL").addEventListener("click", function(){
            if(t.slide !== 1) {
                t.slide -= 1;
                t.changeSlide();
            }
        });

        document.getElementById("bR").addEventListener("click", function(){
            if(t.slide !== 80) {
                t.slide += 1;
                t.changeSlide();
            }
        });
    }

    addEventsToButtons() {
        const t = this;

        document.getElementById("btnText").addEventListener("click", function () {
            const boxTextCreator = new BoxTextCreator(t.number);
            let box = boxTextCreator.getElement(t.number);
            box.style.marginLeft = "0px";
            box.style.marginRight = "0px";
            box.style.width = "100px";
            box.style.height = "100px";
            box.style.fontSize = "20px";
            box.dx = 0;
            box.dy = 0;
            box.drag = false;
            t.mass.push(t.slide);

            const hideTypeString = document.getElementById("showTextFonOnOff").innerHTML.toString();
            if(hideTypeString === "Показать"){
                box.style.backgroundColor = null;
            }
            if(hideTypeString === "Скрыть"){
                box.style.backgroundColor = "Peru";
            }

            t.number += 1;
        });


        document.getElementById("btnFonColor").addEventListener("click", function () {
            document.getElementById("btnColor").click();
        });

        document.getElementById("btnColor").addEventListener("input", function(){
            document.getElementById("sceneBox").style.backgroundColor = document.getElementById("btnColor").value;
        });
    }


    setAllDragFalse(){
        const t = this;
        for(let i = 0; i < t.number; i++) {
            const box = document.getElementById("box" + i);
            box.drag = false;
        }
    }

    showBoxInfo(box){
        // show right menu
        document.getElementById("rightMenu").hidden = false;
        // get info about selected box and put it to textField
        document.getElementById("nowObj").innerHTML = box.id;
        document.getElementById("t1").value = parseInt(box.style.marginLeft);
        document.getElementById("t2").value = parseInt(box.style.marginTop);
        document.getElementById("t3").value = parseInt(box.style.width);
        document.getElementById("t4").value = parseInt(box.style.height);
        document.getElementById("t5").value = parseInt(box.style.fontSize);
        document.getElementById("t6").value = box.innerHTML;

    }

    addEventToOKbutton(){
        document.getElementById("btnOK").addEventListener("click", function() {
            const idString = document.getElementById("nowObj").innerHTML;
            const box = document.getElementById(idString);
            box.style.marginLeft = document.getElementById("t1").value + "px";
            box.style.marginTop = document.getElementById("t2").value + "px";
            box.style.width = document.getElementById("t3").value + "px";
            box.style.height = document.getElementById("t4").value + "px";
            box.style.fontSize = document.getElementById("t5").value + "px";
            box.innerHTML = document.getElementById("t6").value.toString();
        });
    }

    addEventToHolst(){
        const t = this;

        t.setAllDragFalse();

        document.getElementById("sceneBox").addEventListener("mousedown", function(event){
            const xMouse = event.pageX;
            const yMouse = event.pageY - 50;

            for(let i = 0; i < t.number; i++){
                const box = document.getElementById("box" + i);
                const xx = parseInt(box.style.marginLeft);
                const yy = parseInt(box.style.marginTop);
                const ww = parseInt(box.style.width);
                const hh = parseInt(box.style.height);

                if(box.hidden === false) {
                    if (xx < xMouse && xMouse < xx + ww) {
                        if (yy < yMouse && yMouse < yy + hh) {
                            t.setAllDragFalse();
                            box.drag = true;
                            box.dx = xMouse - xx;
                            box.dy = yMouse - yy;

                            t.showBoxInfo(box);
                        }
                    }
                }
            }
        });

        document.getElementById("sceneBox").addEventListener("mouseup", function(event){
            t.setAllDragFalse();
        });

        document.getElementById("sceneBox").addEventListener("mousemove", function(event){
            const xMouse = event.pageX;
            const yMouse = event.pageY - 50;
            for(let i = 0; i < t.number; i++){
                const box = document.getElementById("box" + i);
                if(box.hidden === false) {
                    if (box.drag === true) {
                        box.style.marginLeft = (xMouse - box.dx) + "px";
                        box.style.marginTop = (yMouse - box.dy) + "px";

                        t.showBoxInfo(box);
                    }
                }
            }
        });
    }
}

window.addEventListener("load", function(){
    const mainObj= new MainScript();
});

