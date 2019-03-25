document.addEventListener("DOMContentLoaded", event => {
    const app=firebase.app();
    console.log(app);
    const db=firebase.firestore();
    const postsList=document.querySelector('#posts-list');
    const postForm=document.querySelector("#makePostsForm");
    function renderPost(doc)
    {
        let li=document.createElement('li');
        let title=document.createElement('span');
        let to=document.createElement('span');
        let cross=document.createElement('div');

        li.setAttribute('data-id',doc.id);
        title.textContent=doc.data().title;
        to.textContent=doc.data().to;
        cross.textContent='x';

        li.appendChild(title);
        li.appendChild(to);
        li.appendChild(cross);

        postsList.appendChild(li);

        cross.addEventListener('click',(e) => {
            e.stopPropagation();
            let id=e.target.parentElement.getAttribute('data-id');
            db.collection('posts').doc('id').delete();
        })
    }

    db.collection('posts').get().then(
        (snapshot)=>{

            //console.log(snapshot);
            snapshot.docs.forEach(doc =>{
                
                console.log(doc.data());
                renderPost(doc);
            })
           
        
        });

   
function googleLogin()
{
    const provider= new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
     .then(result =>{
       const user=result.user;
        document.write('<h1> Hello   '+result.user.displayName+" </h1>");
        console.log(user);
    })
    .catch(console.log);
    return;
}

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('posts').add({
        title:postForm.title.value,
        to:postForm.to.value
    })
    postForm.title.value='';
    postForm.to.value='';
})

})