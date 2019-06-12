function fetchData(){

    fetch("http://localhost:8000/",{
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
        <td>${result.customerID}</td>
        <td>${result.Name}</td>
        <td>${result.State}</td>
        <td>${result.partNumber}</td>
        <td>${result.Description}</td>
        <td>${"$"+result.pricePerPart}</td>
        <td>${result.quantity}</td>
        </tr>
    `
     })
    document.getElementById('toyota').innerHTML = table;
      
    })
    
  }

  fetchData()
  document.getElementById("btn1").addEventListener('click', toHomePage);
  document.getElementById("btn").addEventListener('click', toHomePage);

  function toHomePage(){
    window.location.href ='index.html'
  }