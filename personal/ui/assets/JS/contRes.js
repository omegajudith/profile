function fetchData(){

    fetch("http://localhost:8080/",{
      method:'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      }
    
    })
    .then((response) => response.json())
    .then((data) => {
      let table = '';
    //   alert(data);
    console.log(data)
     data.data.forEach(result =>{
         table +=
        `<tr>
        <td>${result.Name}</td>
        <td>${result.Email}</td>
        <td>${result.Subject}</td>
        <td>${result.message}</td>
        </tr>
    `
     })
    document.getElementById('contact').innerHTML = table;
      
    })
    
  }

  fetchData()
  document.getElementById("btn1").addEventListener('click', toHomePage);
  document.getElementById("btn").addEventListener('click', toHomePage);

  function toHomePage(){
    window.location.href ='../ui/contactme.js'
  }