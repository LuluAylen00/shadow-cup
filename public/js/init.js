window.addEventListener("load", async ()=> {
    let data = await fetch('/api/show-data');
    let dataParsed = await data.json();
    
    if (verifyAdmin()) {
        console.log(dataParsed.data);
    }

    sessionStorage.setItem("data", JSON.stringify(dataParsed.data));
    // console.log(sessionStorage.getItem("data"));
})