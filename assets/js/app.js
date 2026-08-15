console.log("hello student crud");
const form = document.getElementById("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const tbody = document.getElementById("tbody");
const addStudentBtn = document.getElementById("addStudentBtn");
const updateStudentBtn = document.getElementById("updateStudentBtn");

let students = [
  {
    fname: "Syed",
    lname: "Haseeb",
    email: "haseeb@gmail.com",
    contact: 10045400000,
    stdId: "101",
  },
  {
    fname: "Shaikh",
    lname: "Azbar",
    email: "Azhar@gmail.com",
    contact: 10044660000,
    stdId: "102",
  },
  {
    fname: "Syed",
    lname: "shaibaz",
    email: "shaibaz@gmail.com",
    contact: 10456700000,
    stdId: "103",
  },
];

function showStudents(arr) {
  const tbody = document.getElementById("tbody");

  let res = ``;
  students.forEach((el, idx) => {
    res += `      <tr id=${el.stdId}>
                    <td>${idx + 1}</td>
                    <td>${el.fname}</td>
                    <td>${el.lname}</td>
                    <td>${el.email}@gmal.com</td>
                    <td>${el.contact}</td>
                    <td class="text-center"><i onclick="onEditHandler(this)" role="button" data-edit-id=${el.stdId} class="fa-regular fa-pen-to-square fa-2x  text-primary"></i></td>
                    <td class="text-center"><i onclick="onDeleteHandler(this)" role="button" data-delete-id=${el.stdId} class="fa-regular fa-trash-can fa-2x text-danger"></i></td>
                  </tr>`;
  });
  tbody.innerHTML = res;
}

showStudents(students);

// create
function onFormSubmit(event) {
  event.preventDefault();
  let stdObj = {
    fname: fname.value,
    lname: lname.value,
    email: email.value,
    contact: contact.value,
    stdId: Date.now().toString(),
  };
  form.reset();
  students.push(stdObj);
  console.log(students);

  let stdTr = document.createElement("tr");
  stdTr.setAttribute("id", stdObj.stdId);
  stdTr.innerHTML = `<td>${students.length}</td>
                    <td>${stdObj.fname}</td>
                    <td>${stdObj.lname}</td>
                    <td>${stdObj.email}</td>
                    <td>${stdObj.contact}</td>
                    <td class="text-center"><i onclick="onEditHandler(this)" role="button" data-edit-id=${stdObj.stdId} class="fa-regular fa-pen-to-square fa-2x  text-primary"></i></td>
                    <td class="text-center"><i onclick="onDeleteHandler(this)" role="button" data-delete-id=${stdObj.stdId} class="fa-regular fa-trash-can fa-2x text-danger"></i></td>`;

  tbody.append(stdTr);
  Swal.fire({
    text: `New student ${stdObj.fname} ${stdObj.lname} added succesfully`,
    icon: "success",
    timer: 2000,
  });
}

//edit and update
function onEditHandler(ele) {
  let edit_id = ele.dataset.editId;
  updateStudentBtn.setAttribute("data-edit-id", edit_id);
  let edit_obj = students.find((el) => el.stdId === edit_id);
  fname.value = edit_obj.fname;
  lname.value = edit_obj.lname;
  email.value = edit_obj.email;
  contact.value = edit_obj.contact;

  addStudentBtn.classList.add("d-none");
  updateStudentBtn.classList.remove("d-none");
}

//update
function onUpdateHandler() {
  let update_id = this.dataset.editId;
  console.log(update_id);

  let updated_obj = {
    fname: fname.value,
    lname: lname.value,
    email: email.value,
    contact: contact.value,
  };
  let update_idx = students.findIndex((el) => el.stdId === update_id);
  students[update_idx] = updated_obj;
  form.reset();
  let tds = document.getElementById(update_id).children;
  tds[1].innerText = updated_obj.fname;
  tds[2].innerText = updated_obj.lname;
  tds[3].innerText = updated_obj.email;
  tds[4].innerText = updated_obj.contact;

  Swal.fire({
    icon: "success",
    text: `student ${updated_obj.fname} ${updated_obj.lname} updated successfully`,
    timer: 2000,
  });
  updateStudentBtn.classList.add("d-none");
  addStudentBtn.classList.remove("d-none");
}


//delete
function onDeleteHandler(ele) {
  let delete_id = ele.dataset.deleteId;
  let dlt_idx = students.findIndex((el) => el.stdId === delete_id);
  let isConfirm = confirm("Are you sure you want to delete this todo");
  if (isConfirm) {
    students.splice(dlt_idx, 1);
    document.getElementById(delete_id).remove();
    Swal.fire({
    icon: "success",
    text: `Student with id : ${delete_id} deleted successfully`,
    timer: 2000,
  });
  }

  let tds = document.querySelectorAll("#tbody tr td:first-child");
  tds.forEach((el,idx) => el.innerText = idx + 1)
  console.log(tds);
  
}

form.addEventListener("submit", onFormSubmit);
updateStudentBtn.addEventListener("click", onUpdateHandler);
