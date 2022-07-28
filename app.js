console.log("hello");
showNotes();

let addBtn = document.getElementById("addBtn"); // assigning addBtn id to addBtn variable
addBtn.addEventListener("click", addNote); //adding eventlistner 'click' to addBtn var and calling function addNote

//Configuring the addNotes button
function addNote(e) {
  let addTxt = document.getElementById("addTxt"); //getting the Text Area where we write a note

  if (addTxt.value.length == 0) {
    alert("Note empty");
  } else {
    let notes = localStorage.getItem("notes"); //assingnig a localstorage which is null at the beigning

    if (notes == null) {
      notesObj = [];
    } // creating an array at the start
    // this else will run after the 1st note is added and when this function is called once again
    else {
      notesObj = JSON.parse(notes);
      //console.log(notesObj);
    }

    //console.log(addTxt.value);
    // pushing the text area value to the array
    notesObj.push(addTxt.value);

    //converting from array to string
    //console.log(typeof (JSON.stringify(notesObj)));
    localStorage.setItem("notes", JSON.stringify(notesObj));

    //emptying what was awritten in the text box after note is added
    addTxt.value = "";
  }

  // function to see notes which are added one by one
  showNotes();
}

//configuring the showNotes button
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = []; // creating an array at the start
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    let eq = index;
    html += `
        <div id = "${index}" class="noteCard my-2 mx-2 card" style="width: 18rem;">
            
            <div class="card-body" >
                <h5 class="card-title">Note ${index}</h5>
                <p class="card-text">${element}</p>
                <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                
                <button id = "${eq}" onclick = "markImportant(this.id)" class="btn btn-primary">Important</button>
            </div>

        </div>
        `;
  });

  // assigning the notes id to var notesElem to display the notes further
  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `You don't have any notes added`;
  }
}

//configuring the delete note button

function deleteNote(index) {
  //console.log("Deleting", index);
    
  markImportant(index);
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  //setting the local storage after deleting item from notesObj
  localStorage.setItem("notes", JSON.stringify(notesObj));
  //if shows notes not called then after delete we need to refresh

  showNotes();

  console.log(index);
}

//configuring the Mark as Important notes button

function markImportant(index) {
  localStorage.setItem("imp", JSON.stringify(index));
  document.getElementById(index).style.backgroundColor = "red";
  console.log(index);
}

//configuring the search bar

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function (e) {
  let inputValue = searchTxt.value.toLowerCase();
  console.log("Fire");

  let noteCard = document.getElementsByClassName("noteCard");
  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    console.log(cardTxt);

    if (cardTxt.includes(inputValue)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
