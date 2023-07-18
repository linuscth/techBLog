const signInFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();


    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' },

        })

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
}
const signUpFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#signUpEmail').value.trim();
    const name = document.querySelector('#signUpName').value.trim();
    const password = document.querySelector('#signUpPassword').value.trim();
    console.log(email);
    console.log(name);
    console.log(password);
    if (email && name && password) {

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                email,
                name,
                password
            }),
            headers: { 'Content-Type': 'application/json' },

        });
        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }

}

document.querySelector('.login-form').addEventListener('submit', signInFormHandler)
document.querySelector('.signUp-form').addEventListener('submit', signUpFormHandler)