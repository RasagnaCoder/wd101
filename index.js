const registrationForm = document.getElementById("registration-form");
const userDataTable = document.getElementById('user-data');
const userDataTableBody = userDataTable.querySelector('tbody');
const dobInput = document.getElementById('dob');
const dobError = document.getElementById('dobError');

window.addEventListener('load', () => {
    updateUserDataTable();
});

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        dob: document.getElementById('dob').value,
        terms: document.getElementById('terms').checked
    };

    if (!validateUserData(userData)) {
        dobError.textContent = "Value must be 09/11/1967 or later";
        return;
    }

    dobError.textContent = "";
    saveUserData(userData);
    updateUserDataTable();
    clearForm();
});

function validateUserData(userData) {
    const minAge = 18;
    const maxAge = 55;
    const today = new Date();
    const birthDate = new Date(userData.dob);
    const age = today.getFullYear() - birthDate.getFullYear();

    return age >= minAge && age <= maxAge;
}

function saveUserData(userData) {
    const existingUserData = JSON.parse(localStorage.getItem('userList')) || [];
    existingUserData.push(userData);
    localStorage.setItem("userList", JSON.stringify(existingUserData));
}

function updateUserDataTable() {
    userDataTableBody.innerHTML = '';
    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    
    userList.forEach((userData) => {
        const userDataRow = createUserDataTableRow(userData);
        userDataTableBody.appendChild(userDataRow);
    });

    userDataTable.classList.toggle("hidden", userList.length === 0);
}

function createUserDataTableRow(userData) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.password}</td>
        <td>${userData.dob}</td>
        <td>${userData.terms ? "true" : "false"}</td>`;
    return row;
}

function clearForm() {
    registrationForm.reset();
}
