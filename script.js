let nameField = document.getElementById("name");
let ageField = document.getElementById("age");
let genderField = document.getElementById("gender");
let proceedBtn = document.getElementById("proceedBtn");
let errorMessage = document.getElementById("error-message");

// Initial button style
proceedBtn.style.backgroundColor = "grey";
proceedBtn.style.cursor = "not-allowed";

proceedBtn.addEventListener("click", () => {
  if (
    nameField.value.trim() === "" ||
    ageField.value.trim() === "" ||
    genderField.value === ""
  ) {
    // Agar koi field empty hai to error show kare
    errorMessage.style.display = "block";
  } else {
    // Agar sab filled hain to error hatao aur next page pe le jao
    errorMessage.style.display = "none";
    window.location.href = "home.html"; // ✅ Redirect
  }
});

// Input bharte hi error hata do aur button active karo
function checkFields() {
  if (
    nameField.value.trim() !== "" &&
    ageField.value.trim() !== "" &&
    genderField.value !== ""
  ) {
    errorMessage.style.display = "none";
    proceedBtn.style.backgroundColor = "green";
    proceedBtn.style.cursor = "pointer";
  } else {
    proceedBtn.style.backgroundColor = "grey";
    proceedBtn.style.cursor = "not-allowed";
  }
}

// Input/change events
nameField.addEventListener("input", checkFields);
ageField.addEventListener("input", checkFields);
genderField.addEventListener("change", checkFields);



// let helloUser = document.getElementById("hello-user");

// let name = document.getElementById("name");

// helloUser.innerHTML = `Hello + ${name.value}`


function saveName(){
    let name = document.getElementById("name").value;
    localStorage.setItem("userName" , name);
    console.log(name)
}
