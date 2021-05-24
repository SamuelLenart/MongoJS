//$(document).ready( ()=>{ } );
// skratene
function complete(element){
    // console.log(element.value);
     $.ajax({
         url: "http://localhost:3000/task/done?_id="+element.value,
         type: "put",
         statusCode: {
             200: (result)=>{
                   location.reload();
             }
         }
 
     });
     
 }
 
 $( ()=>{
     console.log("Hello, your page is ready !");
     $.ajax({
         url: "http://localhost:3000/task",
         type: "get",
 
         statusCode: { 
             200: (result)=>{ //console.log(result); 
                 for(var index in result){
                     const id =result[index]._id;
                     const name =result[index].name;
                     const priority =result[index].priority;
                     const date =result[index].date;
                     const done =result[index].done;
                     const price =result[index].price;
                     var text = "<b><u>"+name+"</u></b> ("+date+") <br/>";
                     text = text + "Priority: "+priority;
                     if(result[index].price)
                         text=text + " Price: "+price;
 
                     text= text+ " <br/>Done: "+done;
                     if(done==false)
                              text=text+" <BUTTON onClick=\"complete(this)\" value=\""+id+"\">Completed</BUTTON>";
                     console.log(text);
                     var newElement = $("<div></div>").html(text);
                     var elementBR=$("<br/>");
                     $("#parrent").append(newElement, elementBR);    
                 }
             },
             400: (err)=>{ console.log('Bad request, ')},
             404: (err)=>{ console.log('Not found !')}
         },
      
     })
   
 });
 
 