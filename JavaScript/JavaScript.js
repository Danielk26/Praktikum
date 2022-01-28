window.onload = function () {

    var mydiv = document.getElementById("Feld");
    var mydivB = document.getElementById("Feld2");
    var Equal = document.getElementById("EqualButton");
    var ANS = document.getElementById("ANSButton");
    var deleteTextFromDisplayButton = document.getElementById("CButton");
    var Fortgeschritten = Array.from(document.getElementsByClassName("Fortgeschritten"));
    var Back = document.getElementById("Back");
    var allResults = [];
    var number = Array.from(document.getElementsByClassName("Numbers"));
    var operators = Array.from(document.getElementsByClassName("op"));
    var list = number.concat(Fortgeschritten);

    ANS.addEventListener('click', () => {
        if (!(allResults[allResults.length-2] === undefined)) {
            mydivB.innerText = allResults[allResults.length-2];
        }
    });

    list.forEach(function (item) {
        item.addEventListener('click', () => {
            const nummer = item.innerText;

            mydiv.innerText += nummer;
            calculate(mydiv.innerText);
        });
    });

    operators.forEach(function (item) {
        item.addEventListener('click', () => {
            var operator = item.innerText;

            if (mydiv.innerText !== "") {
                operator = '\u00A0' + operator + '\u00A0';
            }

            if (mydiv.innerText === "" && operator === "x") {
                operator = "";
            }

            if (mydiv.innerText === "" && operator === "÷") {
                operator = "";
            }

            if (mydivB.innerText !== "") {
                mydiv.innerText = mydivB.innerText;
            }
            mydiv.innerText += operator;
        });
    });

    var radiobutton1 = document.getElementById("b1");
    var radiobutton2 = document.getElementById("b2");

    radiobutton1.addEventListener('change', () => {
        Fortgeschritten.forEach(function (item) {
            item.disabled = true;
        });
    });

    Fortgeschritten.forEach(function (item) {
        item.disabled = true;

        radiobutton2.addEventListener('change', () => {
            Fortgeschritten.disabled = false;
            Fortgeschritten.forEach(function (item) {
                item.disabled = false;
            });
        });

        deleteTextFromDisplayButton.addEventListener('click', () => {
            mydiv.innerText = "";
            mydivB.innerText = "";
        });

    });

    Back.addEventListener('click', () => {
        mydiv.innerText = remove_last_child(mydiv.innerText);
    });

    Equal.addEventListener('click', () => {
        calculate(mydiv.innerText);
    });

    function remove_last_child(rechenString) {
        const text = rechenString;
        const editedText = text.slice(0, -1);
        return editedText;
    }

    function calculate(toCalculate) {
        var Divzahlen = toCalculate;
        var mydivB = document.getElementById("Feld2");
        var aufgeteilterString = Divzahlen.split('\u00A0');
        var calc = 0;

        if (aufgeteilterString[0] === "") {
            aufgeteilterString[0] = "0";
        }

        aufgeteilterString.forEach(function (item, idx) {

            if (item === '-') {
                calc += parseFloat(aufgeteilterString[idx - 1]) - parseFloat(aufgeteilterString[idx + 1]);
                mydivB.innerText = calc;
                if (!isNaN(calc)){
                    allResults.push(calc);
                }
            }

            if (item === '+') {
                calc += parseFloat(aufgeteilterString[idx - 1]) + parseFloat(aufgeteilterString[idx + 1]);
                mydivB.innerText = calc;
                if (!isNaN(calc)){
                    allResults.push(calc);
                }
            }

            if (item === 'x') {
                calc += parseFloat(aufgeteilterString[idx - 1]) * parseFloat(aufgeteilterString[idx + 1]);
                mydivB.innerText = calc;
                if (!isNaN(calc)){
                    allResults.push(calc);
                }
            }

            if (item === '÷') {
                calc += parseFloat(aufgeteilterString[idx - 1]) / parseFloat(aufgeteilterString[idx + 1]);
                mydivB.innerText = calc;
                if (!isNaN(calc)){
                    allResults.push(calc);
                }
            }

            if (item === '%'){
                calc += parseFloat(aufgeteilterString[idx - 1]) % parseFloat(aufgeteilterString[idx + 1]);
                mydivB.innerText = calc;
                if (!isNaN(calc)){
                    allResults.push(calc);
                }
            }

            if (isNaN(calc)) {
                mydivB.innerText = "Fehler, Berechnung konnte nicht durchgeführt werden! ";
            }
        });
    }
}
