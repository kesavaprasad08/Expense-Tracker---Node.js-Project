const signUpSubmitForm = document.getElementById('signUpForm');

const signUpHandler = async(e) =>{
    e.preventDefault();
    try{
    const name =document.getElementById('signUpName').value;
    const password=document.getElementById('signUpPassword').value;
    const email =document.getElementById('signUpEmail').value;

const response = await axios.post(`http://localhost:3000/user/signup`,{
    name,
    password,
    email
})

    console.log(response.data);
    }
    catch(e){
        console.log(e);
    }
}

signUpSubmitForm.addEventListener('submit',signUpHandler);