const employeeList=document.querySelector(".employees");
const loggedinLinks=document.querySelectorAll('.logged-in');
const loggedoutLinks=document.querySelectorAll('.logged-out');

const setUpUI=(user)=>{
    if(user){
        loggedinLinks.forEach(item=>item.style.display='block');
        loggedoutLinks.forEach(item=>item.style.display='none');
    }
    else{
        
            loggedinLinks.forEach(item=>item.style.display='none');
            loggedoutLinks.forEach(item=>item.style.display='block');
        
    }
}

//create new guide
const createForm=document.querySelector('#create-form');
createForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('employees').add({
        name:createForm['name'].value,
        role:createForm['role'].value
    }).then(()=>{
        const modal=document.querySelector('#modal-create').close();
        createForm.reset();
    }).catch(err=>{
        console.log(err.message)
    });
});
//set up employee list
const setUpEmpLst=(data)=>{
    let html='';
    if(data.length)
    {
    data.forEach(doc => {

        const emp=doc.data();
        const empName=emp.name;
        const empRole=emp.role;
        console.log(emp);
        console.log(emp.name);
        console.log(emp.role);
        const li = `

        <li>
  
          <div class="collapsible-header grey lighten-4"> ${doc.data().name} </div>
  
          <div class="collapsible-body white"> ${doc.data().role} </div>
  
        </li>
  
      `;
       html+=li;
      
        
    });
    
     employeeList.innerHTML=html;
}
else{

    employeeList.innerHTML='<h5 align="center-align">Login to see the details</h5>';
}

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });