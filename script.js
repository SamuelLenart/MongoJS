const btn = document.getElementById("addTask");

btn.addEventListener("click", ()=>{
    const name = document.getElementById("taskanme").value;
    const priority = parseInt(document.getElementById("priority").value);
    const price = parseFloat(document.getElementById("price").value);
    console.log(name);
    if(price>0){
        object.price=price;
    }
    console.log(object);
    $.ajax({
        url: "http://localhost:3000/task/new",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: object,
        success: (result)=>{

        },
        error: (err)=>{
            console.log("Error: ",err);
        }
    })
    alert("Task has been added");
})