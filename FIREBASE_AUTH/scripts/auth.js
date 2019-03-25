




//listen for auth change

auth.onAuthStateChanged(user =>{
    if(user)
    {
        db.collection('employees').get ().then(snapshot => {
            //console.log(snapshot.docs);
            setUpEmpLst(snapshot.docs);
            setUpUI(user);
        })
        console.log('user logged in :',user);
    }else{
        setUpEmpLst([]);
        setUpUI();
        console.log('user logged out');
    }
})

const signupForm=document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    const email=signupForm['signup-email'].value;
    const password=signupForm['signup-password'].value;



     // sign up the user

  auth.createUserWithEmailAndPassword(email, password).then(cred => {

    console.log(cred.user);

    // close the signup modal & reset form

    const modal = document.querySelector('#modal-signup');

    M.Modal.getInstance(modal).close();

    signupForm.reset();

  });

})
//logout
const logout=document.querySelector('#logout');
logout.addEventListener('click',(e) => {

    e.preventDefault();
    auth.signOut().then(()=>{
        console.log("user signed out");

    });

    //login form
    const loginForm=document.querySelector("#login-form");
    loginForm.addEventListener('submit',(e) => {
        e.preventDefault();
       
            const email=loginForm['login-email'].value;

            const password=loginForm['login-password'].value;
            auth.signInWithEmailAndPassword(email, password).then(cred=>{
                console.log(cred.user);
                //close the login model and reset the form
                const modal = document.querySelector('#modal-login');

                M.Modal.getInstance(modal).close();
                loginForm.reset();
            });

       
    })
})