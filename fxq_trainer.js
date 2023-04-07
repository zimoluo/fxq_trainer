// ==UserScript==
// @name         FXQ Trainer Silent
// @version      3
// @description  Replaces Math.random() with a fixed value
// @match        http://game.hullqin.cn/fxq/*
// @match        https://game.hullqin.cn/fxq/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define the default fixed value here
    let fixedValue = -1;

    // Save the original Math.random function
    const originalRandom = window.Math.random;

    // Replace Math.random with a function that returns fixedValue if it's between 0 and 1, otherwise use the original Math.random
    window.Math.random = function() {
        if (fixedValue >= 0 && fixedValue < 1) {
            return fixedValue;
        } else {
            return originalRandom();
        }
    }

    // Is listening to keyboard input
    let isListening = false;

    // Add a floating, hidden button for setting the value of fixedValue
    const button = document.createElement('button');
    const windowWidth = window.innerWidth;
    button.textContent = fixedValue;
    button.style.position = 'fixed';
    button.style.top = '9%';
    button.style.left = '-40px';
    button.style.width = `${windowWidth * 0.035}px`;
    button.style.height = `${windowWidth * 0.035}px`;
    button.style.borderRadius = '50%';
    button.style.backgroundColor = '#091D42';
    button.style.color = '#fff';
    button.style.fontSize = '16px';
    button.style.fontWeight = 'bold';
    button.style.zIndex = '9999';
    button.style.userSelect = 'none';
    button.style.outline = 'none';
    button.style.textAlign = 'center';
    button.style.opacity = '0';
    button.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    button.style.transition = 'left 0.25s';
    button.addEventListener('mouseenter', () => {
        button.style.opacity = !isListening ? '0.3' : '0.6';
        button.style.left = '-5px';
    });
    button.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
        button.style.left = '-40px';
    });

    const handleKeyPress = (event) => {
        if (event.key.length === 1 && !isNaN(event.key) && event.key !== " ") {
            let parsedValue = Math.floor(parseFloat(event.key));
            fixedValue = (parsedValue - 0.01) / 6;
            if (fixedValue < 0 || fixedValue >= 1) {
                fixedValue = -1;
                parsedValue = -1;
            }
            button.textContent = parsedValue;
        }
    };

    button.addEventListener('click', () => {
        isListening = !isListening;
        if (isListening) {
            button.style.opacity = '0.6';
            document.addEventListener('keypress', handleKeyPress);
        } else {
            button.style.opacity = '0.3';
            document.removeEventListener('keypress', handleKeyPress);
        }
    });

    document.body.appendChild(button);
})();
