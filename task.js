//$(document).ready(()=>{});

$(()=>{
    console.log("Your page is ready")
    $.ajax({
        url: "http://localhost:3000/task",
        type: "get",

       statusCode: {
            200: (result)=>{
                for(var index in result){
                    const id = result[index]._id;
                    const name = result[index].name;
                    const priority = result[index].priority;
                    const date = result[index].date;
                    const done = result[index].done;
                    const price = result[index].price;
                    var text = name+" ("+date+") \n";
                    text = text + "Priority: "+priority;
                    if(result[index].price)
                        text=text + " Price: "+price;

                    text= text+ " \nDone: "+done;
                    console.log(text);
                    var newElement = $("<div></div>").text(text);
                    var elementBR=$("<br/>");
                    $("#parrent").append(newElement, elementBR);    
            }
        },
       400: (err)=>{ console.log('Bad request, ')},
       400: (err)=>{console.log('Not found !')}
        },
    })
});
