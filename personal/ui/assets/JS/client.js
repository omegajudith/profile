

  /* Name validation */
  function contact(){
    var errmessage ="";
    if(document.getElementById('name').value == ""){
        errmessage +='Name is missing \n';
        document.getElementById('name').style.borderColor = 'red';
    }
  
    /*email field validation */
    if(document.getElementById('email').value == ""){
        errmessage +='Email records required \n';
        document.getElementById('name').style.borderColor = 'red';
    }
    /*subject and below is a text area if condition*/
    if(document.getElementById('subject').value == ""){
        errmessage +='Subject helps us understand your chat content\n';
        document.getElementById('subject').style.borderColor = 'red';
    }
  
    if(document.getElementById('area').value == ""){
        errmessage +='A few lines from you would be great \n';
        document.getElementById('area').style.borderColor = 'red';
    }
  
    if(errmessage !="") {
        alert(errmessage);
        return false;
    }
  }

  contact();
  
  document.getElementById('form').addEventListener("submit", postFormData);
  
  function postFormData(event){
      event.preventDefault();
      
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("area").value;
    
      
        const formdata = {
         name,
         email,
         subject,
         message
      }
      console.log(formdata);
  
  
      fetch("http://localhost:8080/",{
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type':'application/json'
        },
        body:JSON.stringify(formdata)
      })
      .then((response) => response.json())
      .then((data) => {
     
        window.location.href = '../ui/contRes.html';
      })
  
    }
  
  document.getElementById('btn2').addEventListener('click', viewData)
  
  function viewData(){
    window.location.href = '../ui/contRes.html'
  }
