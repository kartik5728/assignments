// here we write hooks
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");
const msg = document.getElementById("msg");
const clearBtn = document.getElementById("clearBtn");
const emptyText = document.getElementById("emptyText");

// Build a local storage function
function loadStudents() {
    const data = localStorage.getItem("students");
    return data ? JSON.parse(data) : [];
    // what does Json.parse do? we instruct the computer to read the data that was saved in one single boring line and turn it back into the original inputted data 
}

function saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
    // what does Json.stringify do? we instruct the computer to save the data in one single boring line that brings together all the inputted data
}

//global students array
let students = loadStudents(); // load existing students from local storage or start with an empty array
renderStudents(); // initial render of the student list    

//show message
function showMessage(text, color) {
    msg.innerText = text;
    msg.style.color = color;

    //   setTimeout(() => {
    //     msg.innerText = "";
    //   }, 2000); // make the message disappear after a couple of seconds
}

//stage 3: we ant render the student list into a table

function renderStudents() {
    tableBody.innerHTML = ""; //clears the tavble first so that we do not double -paste
    if (students.length === 0) {
        emptyText.style.display = "block"; // show no students available yet
        return
    } else {
        emptyText.style.display = "none"; // hide no students available yet
    }

    students.forEach((student, index) => {
        const tr = document.createElement("tr"); // creates a new row inside the table

        // fillin the row with the data
        tr.innerHTML = `
                                <td>${index + 1}</td>
                                <td>${student.name}</td>
                                <td>${student.roll}</td>
                                <td>${student.course}</td>
                                <td>${student.gender}</td>
                                <td><button class="delete-btn" data-id="${student.id}">Delete</button></td>
                                `;

        tableBody.appendChild(tr); // put row into the table
    });

    const deleteButtons = document.getElementsByClassName('delete-btn');

    Array.from(deleteButtons).forEach(btn => {
        btn.addEventListener("click", () => {
            deleteStudent(Number(btn.dataset.id));
        });
    });

}
// Form submission handler

form.addEventListener("submit", function (e) {
    //STOP! do not refresh the page
    e.preventDefault(); // prevent the form from submitting normally")
    const name = document.getElementById("name").value.trim(); // get the name input value and remove extra spaces
    const roll = Number(document.getElementById("roll").value);
    const course = document.getElementById("course").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    if (!name || !roll || !course || !gender) {
        showMessage("Please fill in all fields", "error");
        return;
    } // exit early if they missed on something
    const newStudent = {

        id: Date.now(), // gives every student a unique id, based on the millisecond level time when they were added
        name, roll, course, gender
    };

    students.push(newStudent); // add new student to the list
    console.log(students);
    saveStudents(students); // save the updated list to local storage
    renderStudents(); // Redraws the table with the updated list
    form.reset(); // clears the form for the next entry

});



// Deleting the data
function deleteStudent(id) {
    // keeps everyone else apart from the person with specific id
    students = students.filter((student) => student.id !== id); // keep everyone else apart from the person with specific id
    console.log(students)
    saveStudents(students); // save the updated list to local storage
    renderStudents(); // Redraws the table with the updated list
    showMessage("student deleted", " #FF0000")
}

clearBtn.addEventListener('click', () => {
    students = [];
    saveStudents(students);
    renderStudents();
    showMessage("all data cleared", " #FF0000")
})