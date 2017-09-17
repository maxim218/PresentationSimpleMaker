/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BoxTextCreator_js__ = __webpack_require__(1);




class MainScript{
    constructor(){
        this.number = 0;
        this.addEventsToButtons();
        this.addEventToHolst();
        this.addEventToOKbutton();
    }

    addEventsToButtons() {
        const t = this;

        document.getElementById("btnText").addEventListener("click", function () {
            const boxTextCreator = new __WEBPACK_IMPORTED_MODULE_0__BoxTextCreator_js__["a" /* default */](t.number);
            let box = boxTextCreator.getElement(t.number);
            box.style.marginLeft = "0px";
            box.style.marginRight = "0px";
            box.style.width = "100px";
            box.style.height = "100px";
            box.style.fontSize = "20px";
            box.dx = 0;
            box.dy = 0;
            box.drag = false;
            t.number += 1;
        });

        document.getElementById("btnImage").addEventListener("click", function () {

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

                if(xx < xMouse && xMouse < xx + ww){
                    if(yy < yMouse && yMouse < yy + hh){
                        t.setAllDragFalse();
                        box.drag = true;
                        box.dx = xMouse - xx;
                        box.dy = yMouse - yy;

                        t.showBoxInfo(box);
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
                if(box.drag === true) {
                    box.style.marginLeft = (xMouse - box.dx) + "px";
                    box.style.marginTop = (yMouse - box.dy) + "px";

                    t.showBoxInfo(box);
                }
            }
        });
    }
}

window.addEventListener("load", function(){
    const mainObj= new MainScript();
});



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class BoxTextCreator{
    constructor(number){
        const boxHTMLcode = "<div id = 'box" + number + "' style = 'position: absolute; height: 100px; width: 100px; cursor: move; background-color: Peru; font-size: 20px; margin-left: 0px; margin-top: 0px;'><h1>&nbsp;&nbsp;" + number + "</h1></div>";
        document.getElementById("sceneBox").innerHTML += boxHTMLcode;
    }

    getElement(number){
        return document.getElementById("box" + number);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoxTextCreator;
;



/***/ })
/******/ ]);