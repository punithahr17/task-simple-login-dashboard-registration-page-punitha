document.addEventListener('DOMContentLoaded', function(){
    const loginForm=document.getElementById('login-Form');


    const username=document.getElementById('username');
    const password=document.getElementById('password');

    const userNameErrorMsg=document.getElementById('usernameErrormsg');
    const passwordErrorMsg=document.getElementById('passwordErrormsg');
    const loginError=document.getElementById('loginError');



username.addEventListener('input',function(){
    validateUsername(username,userNameErrorMsg);
});

password.addEventListener('input',function(){
    validatePassword(password,passwordErrorMsg);
});



function loginFormValidation(event){
    event.preventDefault();

    let users = [{'username': 'Punitha','password':'Puneeta123#'}];
    sessionStorage.setItem("users", JSON.stringify(users));

    const isUsernameValid=validateUsername(username,userNameErrorMsg);
    const isPasswordValid=validatePassword(password,passwordErrorMsg);

    if(isUsernameValid && isPasswordValid){
    //const users=[{"username":"userOne","password":"Pass@123"},{"username":"userTwo","password":"Pass@123"}];
    const users=JSON.parse(sessionStorage.getItem('users')) || [];


    const user=users.find(user => user.username===username.value.trim()&& user.password===password.value.trim());

    if(user){
        sessionStorage.setItem('username',username.value.trim());
        sessionStorage.setItem('isLoggedIn','true');
        //alert("Login Successful!");
        window.location.href='dashboard.html';
    }else{
        loginError.style.display='block';
        //setTimeout(function(){
        //loginError.style.display='none';
       // },2000);
    }
}
}
    
    

function validateUsername(input,errorMsgElement){
    const usernamePattern=/^[A-Z][a-zA-Z]*$/;

    if(!usernamePattern.test(input.value.trim())){
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        errorMsgElement.style.display='block';
        return false;   
    }else{
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        errorMsgElement.style.display='none';
        return true;
    }
}

function validatePassword(input,errorMsgElement){
    const passwordPattern= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

    if(!passwordPattern.test(input.value.trim())){
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        errorMsgElement.textContent="Password must start with a capital letter,have atleast 8 characters,one uppercase,one lowercase,one special character and one digit."
        errorMsgElement.style.display='block';
        return false;   
    }else{
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        errorMsgElement.style.display='none';
        return true;
    }

}

loginForm.addEventListener("submit",loginFormValidation);
});

