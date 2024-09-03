
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("Registration-Form");
    
    
    const firstName = document.getElementById("firstname");
    const lastName=document.getElementById("lastname");
    const password=document.getElementById("password");
    const confirm_Password=document.getElementById("confirm-password");
    const email=document.getElementById("email");
    const mobile=document.getElementById("mobile-number");
    const gender=document.getElementsByName("gender");
    const country=document.getElementById("country");
    const state=document.getElementById("state");
    const city=document.getElementById("city");
    const pincode=document.getElementById("pincode");
    
    const firstNameErrorMsg = document.getElementById("fnameerrormsg");
    const lastNameErrorMsg= document.getElementById("lnameerrormsg");
    const passwordErrorMsg=document.getElementById("passworderrormsg");
    const confirm_PasswordErrorMsg=document.getElementById("confirmpassworderrormsg");
    const emailErrorMsg=document.getElementById("emailerrormsg");
    const mobileErrorMsg=document.getElementById("mobileerrormsg");
    const genderErrorMsg=document.getElementById("gendererrormsg");
    const countryErrorMsg=document.getElementById("countryerrormsg");
    const stateErrorMsg=document.getElementById("stateerrormsg");
    const cityErrorMsg=document.getElementById("cityerrormsg");
    const pincodeErrorMsg=document.getElementById("pincodeerrormsg");
    
    firstName.addEventListener("input", function() 
    { validate_Name(firstName, firstNameErrorMsg); 
    });


    lastName.addEventListener("input",function(){
        validate_Name(lastName, lastNameErrorMsg);
    });


    password.addEventListener("input",function(){
        validate_Password(password, passwordErrorMsg);
        validate_ConfirmPassword(password, confirm_Password, confirm_PasswordErrorMsg);
    });
    

    confirm_Password.addEventListener("input",function(){
        validate_ConfirmPassword(password, confirm_Password, confirm_PasswordErrorMsg);
    });

    email.addEventListener("input",function(){
        validate_email(email,emailErrorMsg);
    });

    mobile.addEventListener("input",function(){
        validate_mobile(mobile,mobileErrorMsg);
    });

    gender.forEach(genderInput =>{genderInput.addEventListener("change",function(){
        validate_gender(gender,genderErrorMsg);
    });

    });

    country.addEventListener("input",function(){
        validate_country(country,countryErrorMsg);
    });

    state.addEventListener("input",function(){
        validate_state(state,stateErrorMsg);
    });

    city.addEventListener("input",function(){
        validate_city(city,cityErrorMsg);
    });

    pincode.addEventListener("input",function(){
        validate_pincode(pincode,pincodeErrorMsg);
    });



    function formValidation(event) {
        event.preventDefault(); 
        let is_Valid = true;
 

        if (!validate_Name(firstName, firstNameErrorMsg)) {
        is_Valid = false;
        }

        if(!validate_Name(lastName,lastNameErrorMsg)){
            is_Valid=false;
        }

        if(!validate_Password(password,passwordErrorMsg)){
            is_Valid=false;
        }

        if(!validate_ConfirmPassword(password,confirm_Password,confirm_PasswordErrorMsg)){
            is_Valid=false;
        }

        if(!validate_email(email,emailErrorMsg)){
            is_Valid=false;
        }

        if(!validate_mobile(mobile,mobileErrorMsg)){
            is_Valid=false;
        }

        if(!validate_gender(gender,genderErrorMsg)){
            is_Valid=false;
        }

        if(!validate_country(country,countryErrorMsg)){
            is_Valid=false;
        }

        if(!validate_state(state,stateErrorMsg)){
            is_Valid=false;
        }

        if(!validate_city(city,cityErrorMsg)){
            is_Valid=false;
        }

        if(!validate_pincode(pincode,pincodeErrorMsg)){
            is_Valid=false;
        }


    

        if (is_Valid) {
            let users=JSON.parse(sessionStorage.getItem('users')) || [];

            const userData={
                firstName:firstName.value,
                lastName:lastName.value,
                password:password.value,
                confirm_Password:confirm_Password.value,
                email:email.value,
                mobile:mobile.value,
                gender:document.querySelector('input[name="gender"]:checked').value,
                country:country.value,
                state:state.value,
                city:city.value,
                pincode:pincode.value

            };

            addUser(userData);
       

    function addUser(user){
        fetch('userData.json')
        .then(response => response.json())
        .then(data =>{
            data.push(user);
            return fetch('userData.json',{
                method:'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });

        })
        .then(()=>{
            alert('user added successfully!');
            form.reset();
            clearValidationStates();
            window.location.href="login.html";
        })
        .catch(error =>{
            console.error('error addinding user:',error);
        });
    }


            // sessionStorage.setItem("firstname", firstName.value);
            // sessionStorage.setItem("lastname",lastName.value);
            // sessionStorage.setItem("password",password.value);
            // sessionStorage.setItem("confirm-password",confirm_Password.value);
            // sessionStorage.setItem("email",email.value);
            // sessionStorage.setItem("mobile-number",mobile.value);
            // sessionStorage.setItem("gender",document.querySelector('input[name="gender"]:checked').value);
            // sessionStorage.setItem("country",country.value);
            // sessionStorage.setItem("state",state.value);
            // sessionStorage.setItem("city",city.value);
            // sessionStorage.setItem("pincode",pincode.value);

           
           

            users.push(userData);

             sessionStorage.setItem('users',JSON.stringify(users));

            alert("Form submitted successfully! Redirecting to login page...");
            form.reset();
            clearValidationStates();
            window.location.href="login.html";
            //return true;     
        //}else{
        //return false;
        } 
    }
 


    function validate_Name(input, errorMsgElement) {
        const namePattern=/^[A-Za-z]+$/;

        if (input.value.trim() === "" || !namePattern.test(input.value.trim())) {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            errorMsgElement.style.display = "inline"; 
            return false;
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
            errorMsgElement.style.display = "none"; 
            return true;
        }
    }


    function validate_Password(input, errorMsgElement){
        const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if(!passwordPattern.test(input.value.trim()) || input.value[0] !== input.value[0].toUpperCase()){
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            errorMsgElement.style.display="inline";
            return false;
        }else{
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
            errorMsgElement.style.display="none";
            return true;
        }
    }


    function validate_ConfirmPassword(passwordInput, confirmPasswordInput, errorMsgElement){
        

        if(confirmPasswordInput.value.trim() !== passwordInput.value.trim()){
            confirmPasswordInput.classList.add("is-invalid");
            confirmPasswordInput.classList.remove("is-valid");
            errorMsgElement.style.display="inline";
            return false;
        }else{
            if(passwordInput.classList.contains("is-valid")){
            confirmPasswordInput.classList.remove("is-invalid");
            confirmPasswordInput.classList.add("is-valid");
            errorMsgElement.style.display="none";

            }else{
                confirmPasswordInput.classList.remove("is-valid");
                confirmPasswordInput.classList.add("is-invalid");
                errorMsgElement.style.display="inline";

            }
            return confirmPasswordInput.classList.contains("is-valid");
        }
    }

    function validate_email(input,errorMsgElement){
        const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if(!emailPattern.test(input.value.trim())){
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
                errorMsgElement.style.display = "inline"; 
                return false;
            } else {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
                errorMsgElement.style.display = "none"; 
                return true;
            }
        
        }

        function validate_mobile(input,errorMsgElement){
            const mobilePattern=/^\+91\d{10}$/;

            if(!mobilePattern.test(input.value.trim())){
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
                errorMsgElement.style.display="inline";
                return false;
            }else{
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
                errorMsgElement.style.display = "none"; 
                return true;
            }
        }


        function validate_gender(inputs, errorMsgElement){
            let selected=false;

            inputs.forEach(input=>{
                if(input.checked){
                    selected=true;
                    input.classList.add("is-valid");
                    input.classList.remove("is-invalid");
                    errorMsgElement.style.display="none";
                }
            });

            if(!selected){
                errorMsgElement.style.display="inline";
                return false;
            }else{
                return true;
            }
        }

        function validate_country(input,errorMsgElement){
            const countryPattern=/^[A-Za-z]+$/;

            if(input.value.trim()==="" || !countryPattern.test(input.value.trim())){
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
                errorMsgElement.style.display="inline";
                return false;

            }else{
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
                errorMsgElement.style.display="none";
                return true;
            }
        }

        function validate_state(input,errorMsgElement){
            const statePattern=/^[A-Za-z]+$/;

            if(input.value.trim() === "" || !statePattern.test(input.value.trim())){
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
                errorMsgElement.style.display="inline";
                return false;
            }else{
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
                errorMsgElement.style.display="none";
                return true;
            }
        }

        function validate_city(input,errorMsgElement){
            const cityPattern=/^[A-Za-z]+$/;

            if(input.value.trim() === "" || !cityPattern.test(input.value.trim())){
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
                errorMsgElement.style.display="inline";
                return false;
            }else{
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
                errorMsgElement.style.display="none";
                return true;
            }
        }

        function validate_pincode(input,errorMsgElement){
            const pincodePattern=/^[0-9]{6}$/;

            if(!pincodePattern.test(input.value.trim())){
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
                errorMsgElement.style.display="inline";
                return false;
            }else{
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
                errorMsgElement.style.display = "none"; 
                return true;
            }
        }

        function clearValidationStates(){
            const inputs=form.querySelectorAll("input");
            inputs.forEach(input=> {
                input.classList.remove("is-valid");
                input.classList.remove("is-invalid");
            });

            const errorMessages=form.querySelectorAll(".errormsg");
            errorMessages.forEach(msg =>{
                msg.style.display="none";
            });
        }

        
    
    
    
    form.addEventListener("submit", formValidation);   
});