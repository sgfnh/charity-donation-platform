const loginBtn = document.getElementById("loginBtn");


async function login(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!email && !password) {
        alert('Please fill all the fields')
        return;
    }
    const data = {
        email: email,
        password: password
    }
    const userExist = document.getElementById('user-exists');

    try {
        const response = await axios.post('http://localhost:7000/user/login', data)
        console.log(response.data);
        alert(response.data.message);
        console.log(response.data.token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/profile/profile.html'



    } catch (err) {
        console.log(err.message);
        userExist.innerHTML = err.message;
    }
}


loginBtn.addEventListener("click", login);