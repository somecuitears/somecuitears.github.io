/*exported myFunction */
/*exported checkForData */
var ListCounter = 0;

function myFunction(e) {
    var fromStroage = localStorage.getItem('total');
    if (fromStroage == null) {
        fromStroage = 0;
    }
    if (ListCounter != fromStroage) {
        ListCounter = fromStroage;
    }
    if (e.keyCode == 13) {
        var s = document.getElementById("txtBox").value;
        if (s != "") {
            addData(s);
        }
        if (document.documentMode || /Edge/.test(navigator.userAgent)) {
            window.localStorage.setItem('mylist' + ListCounter, s);
        } else {
            localStorage.setItem('mylist' + ListCounter, s);
            ListCounter++;
            localStorage.setItem('total', ListCounter);
        }
        document.getElementById("txtBox").value = "";
    }
}

function checkForData() {
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
        var total = localStorage.getItem('total');
        for (var i = total; i >= 0; i--) {
            addData(localStorage.getItem('mylist' + i));
        }
    } else {
        // alert("this");
        var total = localStorage.getItem('total');
        if (total == null)
            total = 0;
        if (total != 0) {
            for (var i = total; i >= 0; i--) {
                var rema = localStorage.getItem('mylist' + i);
                if (rema != null) {
                    addData(rema, i);
                }
            }
        }
    }

}

function deleteL(id) {
    var toRemove = 'mylist'.concat(id);
    localStorage.removeItem(toRemove);
    //alert(toRemove);
    var nT = localStorage.getItem('total');
    nT--;
    localStorage.setItem('total', nT);
    location.reload();
}

function TaskComplete(id) {
    var inText = document.getElementById(id);
    inText.setAttribute("disabled", true);
    var nSib = inText.parentElement.nextElementSibling;
    nSib.innerHTML = "<del>" + nSib.innerText + "</del>"
}


function addData(s, valueOfTotalFromStorage) {

    var parent = document.getElementById("bottom");

    if (valueOfTotalFromStorage == null)
        valueOfTotalFromStorage = 0;

    //First Div. Checkbox
    var divCreator = document.createElement("div");
    divCreator.style = 'width: 10%;float: left';
    var nodeInput = document.createElement("input");
    nodeInput.setAttribute("id", "cb" + valueOfTotalFromStorage);
    nodeInput.type = 'checkbox';
    nodeInput.setAttribute("onclick", "TaskComplete(this.id)");
    divCreator.appendChild(nodeInput);
    parent.appendChild(divCreator);

    //Second Div. Todo Text.
    divCreator = document.createElement("div");
    divCreator.style = 'width: 60%;float: left';
    var nodeText = document.createTextNode(s);
    divCreator.appendChild(nodeText);
    parent.appendChild(divCreator);

    //Third Div. Delete anchor
    divCreator = document.createElement("div");
    divCreator.style = 'width:30%;float: left';

    var nodeA = document.createElement("a");
    nodeA.setAttribute("href", "");
    nodeA.setAttribute("onclick", "deleteL(this.name)");
    nodeA.setAttribute("name", valueOfTotalFromStorage);
    nodeText = document.createTextNode("Delete");
    nodeA.appendChild(nodeText);
    divCreator.appendChild(nodeA);
    parent.appendChild(divCreator);

    //Clear Div
    divCreator = document.createElement("div");
    divCreator.className = 'clear';
    parent.appendChild(divCreator);

    //Horizontal Line
    divCreator = document.createElement("hr");
    parent.appendChild(divCreator);
}
