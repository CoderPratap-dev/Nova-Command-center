function updateClock(){
    const now = new Date();

    document.getElementById("clock").innerHTML = now.toLocaleTimeString();
    document.getElementById("date").innerHTML= now.toLocaleDateString();

    let hour = now.getHours();
    let greeting = "Good Evening";

    if(hour < 12){

        greeting = "Good Morning";

    }else if(hour < 17){

        greeting = "Good Afternoon";
    }

    document.getElementById("greeting").innerHTML = greeting;
}

updateClock();

setInterval(updateClock,1000);

document.getElementById("search").addEventListener("keydown",function(e){
    if(e.key==="Enter"){
        let query=this.value.trim();

        if (query1==""){
            windows.location.href="https://www.google.com/search?q="+encodeURIComponent(query);
        }
    }
});