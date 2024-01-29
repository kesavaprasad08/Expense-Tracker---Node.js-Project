

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
        document.getElementById('signUpName').value='';
        document.getElementById('signUpPassword').value='';
        document.getElementById('signUpEmail').value='';
        
            

    }
    catch(e){
        // console.log(e);
            if (e.response.status=== 403){
                const ele = document.getElementById('ErorMessage');
                ele.className +='block';
            }
{}
    }
}

signUpSubmitForm.addEventListener('submit',signUpHandler);