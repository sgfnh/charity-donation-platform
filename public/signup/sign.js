const signBtn = document.getElementById('signBtn')
async function handle(event) {
    event.preventDefault()
    let name = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('tel').value;
    let password = document.getElementById('password').value;


    const data = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };
    const userExist = document.getElementById('user-exists');

    try {
        const response = await axios.post('http://localhost:7000/user/userR', data)

        alert("Signup Successfully")
        window.location.href = "/login/login.html";


    } catch (err) {
        userExist.innerHTML = err.response.data;

        console.log('err', err.response.data);
    }
}
signBtn.addEventListener('click', handle)