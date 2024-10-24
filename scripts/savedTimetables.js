fetch("http://127.0.0.1:5000/get").then(response => response.json()).then(data => {
    document.getElementById('timetablesContainer').innerHTML = '';
    for(i of data){
        document.getElementById('timetablesContainer').innerHTML += `
        <div class="timetableElement clickable">
            <div class="title">
                <p id="timetableTitle">${i.date}</p>
            </div>
        </div>
        `;
    }
}).catch(console.log);