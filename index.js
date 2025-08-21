document.getElementById('myForm').addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
        userName: form.userName.value,
        email: form.email.value,
        password: form.password.value,
        dob: form.dob.value,
        gender: form.gender.value
    };

    let para = document.getElementById("msg");
    if (!para) {
        para = document.createElement("p");
        para.id = "msg";
        form.appendChild(para);
    }

    try {
        const res = await fetch('http://localhost:3500/api/userform', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log("server:", result);

        para.textContent = result.message;
        para.style.color = "green"; 
        reset();
    } catch (err) {
        console.error(err);
        para.textContent = 'Something went wrong!!!!!';
        para.style.color = "red"; 
    }

    function reset() {
        form.userName.value = '';
        form.email.value = '';
        form.password.value = '';
        form.dob.value = '';
        const radios = form.querySelectorAll('input[name="gender"]');
        radios.forEach(radio => radio.checked = false);
    }
});
