"use strict";

import BoxTextCreator from "./BoxTextCreator.js";

export default class JSONworker{
    constructor(){
        this.number = 0;
        this.mass = [];

        let s = this.getQuery();
        if(s.length > 0) {

            let number = 0;
            let mass = [];

            s = decodeURIComponent(s);
            let myJSON = JSON.parse(s);
            let objArr = myJSON.objArr;

            const fon = myJSON.fon;
            document.getElementById("sceneBox").style.backgroundColor = fon;

            for (let i = 0; i < objArr.length; i++) {
                const obj = objArr[i];
                console.log(obj);

                const boxTextCreator = new BoxTextCreator(number);
                let box = boxTextCreator.getElement(number);

                box.style.marginLeft = obj.xx;
                box.style.marginTop = obj.yy;
                box.style.width = obj.ww;
                box.style.height = obj.hh;
                box.style.fontSize = obj.ss;
                box.dx = 0;
                box.dy = 0;
                box.drag = false;

                box.innerHTML = obj.tt.toString();
                mass[number] = obj.slideNUm;

                box.hidden = true;

                number++;
            }

            this.number = number;
            this.mass = mass;
        }

        console.log("---");
        console.log("---");
        console.log("---");
    }

    getFieldNumber(){
        return this.number;
    }

    getFieldMass(){
        return this.mass;
    }

    getQuery(){
        let s = location.search.toString();
        let arr = s.split("");
        arr[0] = "";
        arr[1] = "";
        arr[2] = "";
        s = arr.join("");
        console.log(s);
        return s;
    }
}