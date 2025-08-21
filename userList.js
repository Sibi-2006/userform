const con = document.getElementById('con');

const list = async () => {
    try {
        const res = await fetch('http://localhost:3500/api/userform');
        const result = await res.json(); 
        displayUser(result);
    } catch (err) {
        console.log(err);
        alert('something went wrong!!!!!');
    }
};

function displayUser(result) {
    con.innerHTML = "";
    result.map(res => {
        const userDiv = document.createElement('div'); 
        userDiv.id=userDiv;
        const userName = document.createElement('h4');
        const email = document.createElement('h4');
        const password = document.createElement('h4');
        const dob = document.createElement('h4');
        const gender = document.createElement('h4');
        const delBtn = document.createElement('button');
        const updateBtn = document.createElement('button');

        userName.textContent = `Name: ${res.userName}`;
        email.textContent = `Email: ${res.email}`;
        password.textContent = `Password: ${res.password}`;
        dob.textContent = `DOB: ${res.dob}`;
        gender.textContent = `Gender: ${res.gender}`;

        delBtn.textContent = "Delete";
        updateBtn.textContent = "Update";

        delBtn.addEventListener('click', () => delFunction(res.id, userDiv));
        updateBtn.addEventListener('click', () => updateFunction(res.id, userDiv, userName, email, password, dob, gender));

        userDiv.append(userName, email, password, dob, gender, delBtn, updateBtn);
        con.appendChild(userDiv);
    });
}


const delFunction = async (id, userDiv) => {
    try {
        const res = await fetch(`http://localhost:3500/api/userform/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            alert(`User with ID ${id} deleted successfully`);
            userDiv.remove(); 
        } else {
            alert('Failed to delete user');
        }
    } catch (err) {
        console.log(err);
        alert('Something went wrong, unable to delete the user');
    }
};



const updateFunction = async (id, userDiv, userName, email, password, dob, gender) => {

    const newName = prompt("Enter new name:", userName.textContent.replace("Name: ", ""));
    const newEmail = prompt("Enter new email:", email.textContent.replace("Email: ", ""));
    const newPassword = prompt("Enter new password:", password.textContent.replace("Password: ", ""));
    const newDob = prompt("Enter new DOB:", dob.textContent.replace("DOB: ", ""));
    const newGender = prompt("Enter new gender:", gender.textContent.replace("Gender: ", ""));

    const updatedUser = {
        userName: newName,
        email: newEmail,
        password: newPassword,
        dob: newDob,
        gender: newGender
    };

    try {
        const res = await fetch(`http://localhost:3500/api/userform/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        });

        if (res.ok) {
            alert(`User with ID ${id} updated successfully`);

            userName.textContent = `Name: ${newName}`;
            email.textContent = `Email: ${newEmail}`;
            password.textContent = `Password: ${newPassword}`;
            dob.textContent = `DOB: ${newDob}`;
            gender.textContent = `Gender: ${newGender}`;
        } else {
            alert('Failed to update user');
        }
    } catch (err) {
        console.log(err);
        alert('Something went wrong, unable to update the user');
    }
};




list();
