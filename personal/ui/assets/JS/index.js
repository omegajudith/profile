function compute()                                    
{ 
    var name = document.forms["RegForm"]["customer"];              
    var name = document.forms["RegForm"]["name"];    
    var state = document.forms["RegForm"]["state"];  
    var what =  document.forms["RegForm"]["part"];  
    var des = document.forms["RegForm"]["desc"];  
    var price = document.forms["RegForm"]["quantity"];  
    var price = document.forms["RegForm"]["price"]; 
   
    if (customer.value == "")                                  
    { 
        window.alert("Please enter your id."); 
        customer.focus(); 
        return false; 
    } 
   
    if (name.value == "")                               
    { 
        window.alert("Please enter your Name."); 
        name.focus(); 
        return false; 
    } 
       
    if (state.value == "")                                   
    { 
        window.alert("Please enter a state."); 
        state.focus(); 
        return false; 
    } 
   
    if (part.value == "")                 
    { 
        window.alert("Required."); 
        state.focus(); 
        return false; 
    } 
   
    if (desc.value == "")                 
    { 
        window.alert("Required"); 
        desc.focus(); 
        return false; 
    } 
   
    if (price.value == "")                           
    { 
        window.alert("Please Required."); 
        price.focus(); 
        return false; 
    }
    if (quantity.value == "")                 
    { 
        window.alert("Required"); 
        quantity.focus(); 
        return false; 
    }); 
    return false;