var myJsonObject;
var isRendered = 0; //Keep track if list are loaded or not.

function onPressingEnter(e) {
    //Checks if key pressed is 'Return/Enter' or not.
    if (e.keyCode == 13) {
        //To get value from input textbox.
        var inputText = document.getElementById("txtBox").value;
        //Allows adding data only if text is entered in the field.
        if (inputText != "") {
            //Calling function to store entered data;
            storeToJSON(inputText);
            //Changing value to 1 so same data wont be displayed multiple times.
            isRendered = 1;
            //Renders the list of TODOs.
            displayData();
            //resets the value of input field
            document.getElementById("txtBox").value = "";
        }
    }
}

function storeToJSON(dataToStore) {
    //This challenge works by making use of "Local Storage".
    //Getting value from Local Storage.
    var hasValue = localStorage.getItem("data");
    //Check if there are existing values. if there aren't any creates new JSON object and adds new data.
    if (hasValue == null) {
        var myJsonObject = {
            "data": [
                {
                    //                  "id": "0",
                    "status": "0",
                    "data": dataToStore
            }
        ]
        }
        localStorage.setItem("data", JSON.stringify(myJsonObject));
    } else {
        var jsonFromStorage = JSON.parse(hasValue);
        var daa = {
            //            'id': jsonFromStorage.data.length.toString(),
            'status': '0',
            'data': dataToStore
        };
        jsonFromStorage.data.push(daa);
        localStorage.setItem("data", JSON.stringify(jsonFromStorage));
    }
}

function displayData() {
    var hasValue = localStorage.getItem("data");
    var jsonFromStorage = JSON.parse(hasValue);
    var totalData = jsonFromStorage.data.length;
    if (isRendered == 0) {
        for (var i = 0; i < totalData; i++) {
            contentAdder(jsonFromStorage, i);
        }
    } else {
        totalData--;
        contentAdder(JSON.parse(hasValue), totalData)
    }

}

function contentAdder(jsonFromStorag, i) {

    var jsonFromStorage = jsonFromStorag;
    var statusCheck = jsonFromStorage.data[i].status;
    //console.log(statusCheck);

    //console.log("No Strike");
    var parent = document.getElementById("bottom");
    //first Div
    var checkBoxDiv = document.createElement("div");
    checkBoxDiv.style = 'width: 10%;float: left';
    var actualCheckbox = document.createElement("input");
    actualCheckbox.type = 'checkbox';
    actualCheckbox.setAttribute('id', jsonFromStorage.data.indexOf(jsonFromStorage.data[i]));
    actualCheckbox.setAttribute('onclick', "taskCompleted(this.id);");
    checkBoxDiv.appendChild(actualCheckbox);
    parent.appendChild(checkBoxDiv);
    //Second Div
    var taskTextDiv = document.createElement("div");
    taskTextDiv.style = 'width:60%;float:left;';
    var taskDiscription = document.createTextNode(jsonFromStorage.data[i].data);
    if (statusCheck == 1) {
        actualCheckbox.setAttribute("disabled", true);
        taskTextDiv.style = "width:60%;float:left;text-decoration:line-through";
    }
    taskTextDiv.appendChild(taskDiscription);
    parent.appendChild(taskTextDiv);
    //Third Div
    var deleteAnchorDiv = document.createElement("div");
    deleteAnchorDiv.style = 'width:30%;float: left';
    var deleteAnchor = document.createElement("a");
    deleteAnchor.setAttribute("href", "");
    deleteAnchor.setAttribute("id", jsonFromStorage.data.indexOf(jsonFromStorage.data[i]));
    deleteAnchor.setAttribute("onclick", "deleteData(this.id);");
    var deleteBtnTxt = document.createTextNode("Delete");
    deleteAnchor.appendChild(deleteBtnTxt);
    deleteAnchorDiv.appendChild(deleteAnchor);
    parent.appendChild(deleteAnchorDiv);

    //Clear Div
    var clearDiv = document.createElement("div");
    clearDiv.className = 'clear';
    parent.appendChild(clearDiv);

    //Hr Tag
    var hrTag = document.createElement("hr");
    parent.appendChild(hrTag);
}


function deleteData(id) {
    //alert(id);
    var hasValue = localStorage.getItem("data");
    var jsonFromStorage = JSON.parse(hasValue);
    var deletedItem = jsonFromStorage.data.splice(id, 1);
    localStorage.setItem("data", JSON.stringify(jsonFromStorage));
    //displayData();
}

function taskCompleted(id) {
    var hasValue = localStorage.getItem("data");
    console.log(hasValue);
    var jsonFromStorage = JSON.parse(hasValue);
    var markComplete = jsonFromStorage.data[id];
    var toremove = JSON.stringify(markComplete);

    if (typeof (toremove) != "undefined") {
        var replaceStatusCode = toremove.replace('"status":"0"', '"status":"1"');
        var rep = hasValue.replace(toremove, replaceStatusCode);
        console.log(rep);
        localStorage.setItem("data", rep);
    }
    location.reload();
}
