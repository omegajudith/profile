



function validData(customerID, name, state, partNumber, description, pricePerPart, quantity){
  const fields= customerID && name && state && partNumber && description && pricePerPart && quantity;
  const validCustomerId = parseInt(customerID.toString().split(' ').join(''));
  

  if(!fields){
    alert('All fields are required')
    return false;
  }else if (typeof(CustomerID)!== Number && validCustomerId.toString() !==customerID.toString()){
    alert('Customer id can not contain spaces')
    return false;
  }else if(state.length !== 3){
    alert('state should be 3  characters long')
  }else if(pricePerPart <= 0){
    alert('price per part should be greater than zero')
  }else if(quantity <= 0){
    alert('Quantity should be greater than zero')
  }
  else{
    return true;
  }
}


document.getElementById('form').addEventListener("submit", postFormData);

function postFormData(event){
    event.preventDefault();
    const customerID = document.getElementById("customer").value;
    const name = document.getElementById("name").value;
    const  state = document.getElementById("state").value.toUpperCase();
    const partNumber = document.getElementById("part").value;
    const description = document.getElementById("desc").value;
    const pricePerPart = document.getElementById("price").value;
    const quantity =  document.getElementById("quantity").value;

    const cost = document.getElementById('cost')
    const tax = document.getElementById('sales')
    const ship = document.getElementById('shipping')
    const total = document.getElementById('total')

    const retail = document.getElementById('retail').checked;
    const oversize = document.getElementById('oversize').checked;

    const ups = document.getElementById('ups');
    const fedExGround = document.getElementById('fedExGround');
    const fedExAir = document.getElementById('fedExAir');
    const postalAir = document.getElementById('postalAir');
    // const check = document.querySelector('.choice')

    if (validData(customerID, name, state, partNumber, description, pricePerPart, quantity)){
      const formdata = {
        customerID,
        name,
        state,
        partNumber,
        description,
        pricePerPart,
        quantity
    }
   


    fetch("http://localhost:8000/toyota",{
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
      body:JSON.stringify(formdata)
    })
    .then((response) => response.json())
    .then((data) => {
      const checkedChoice = handleCheck(ups, postalAir, fedExAir, fedExGround);
      const FinalCosts = computeCost(quantity,pricePerPart);
      const FinalTax = computeTax(state,retail,quantity,pricePerPart);
      const finalShipping = overSize(oversize, quantity, checkedChoice)
      const finalTotal = parseInt(FinalCosts) + parseInt(FinalTax) + parseInt(finalShipping);
      

      console.log(handleCheck(ups, postalAir, fedExAir, fedExGround))
      cost.value = FinalCosts;
      tax.value = FinalTax;
      ship.value = finalShipping;
      total.value = finalTotal;
      

    }).catch(error => alert(`${error}`))

    } else{
      window.location.reload()
    }
  }

document.getElementById('btn2').addEventListener('click', viewData)

function viewData(){
  window.location.href = 'toyota.html'
}


/* toyota order computations */
function computeCost(quantity,price){
  return quantity * price
}

/*compute tax */

function computeTax(state,retail=true,quantity,price){
  if (retail){
    if(state.toUpperCase() === "KLA"){
      let tax = computeCost(quantity,price) * (10/100);
      return parseFloat(tax).toFixed(1);
  
    }else if(state.toUpperCase() === "MBR" || state.toUpperCase() === "EBB"){
      const tax =  computeCost(quantity,price) * (5/100);
      return parseFloat(tax).toFixed(1);
    }
    return 0;
  }
  return 0;
  
}

function handleShipping(quantity, service="UPS"){
  if(service==="UPS"){
    console.log(quantity * 7.00)
    return quantity * 7.00
  } else if(service==="US Postal Air"){
    return quantity * 8.50
  }
  else if(service==="Fed Ex Ground"){
    return quantity * 9.25
  }else if(service==="Fed Ex Air"){
    return quantity * 12.00
  }
  
}

function overSize(overSize, quantity, service){
  if (overSize){
    const oversizeCost = quantity * 5.00
    return oversizeCost + handleShipping(quantity, service)
  }
  return handleShipping(quantity, service)

}

function handleCheck(ups,postalAir, fedExAir, fedExGround){
  if (ups.checked){
    return ups.value;
  }else if (postalAir.checked){
    return postalAir.value;
  }else if (fedExAir.checked){
    return fedExAir.value;
  }else if (fedExGround.checked){
    return fedExGround.value;
  }
  
}
