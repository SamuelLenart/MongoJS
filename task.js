//$(document).ready(()=>{});
function complete(element){
    console.log(element.value);
    $.ajax({
        url: "http://localhost:3000/task/done?_id="+element.value,
        type: "put",
        statusCode: {
            200: (result)=>{
                console.log("Task has been done");
                localtion.reload();
            }
        }
    })
}

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
                    let text = "<b>" + name + "</b>" + " (" + date + ") <br>";
                    text = text +  "<b> Priority </b>: " + priority;
                    if(price >= 0){
                        text = text + "<b> Price: </b>" + price+"€";
                    }
                    text = text + "<b> Done: </b>" + done;
                    if(done==false)
                    text = text+" <A> href=(Completed task)<A>";
                    console.log(text);
                    $("#mainContainer").append("<div>" +"<div class='center'>" + text + "</div>" + "</div> <br>");
                }
            },
       400: (err)=>{ console.log('Bad request, ')},
       400: (err)=>{console.log('Not found !')}
        },
    })
});
