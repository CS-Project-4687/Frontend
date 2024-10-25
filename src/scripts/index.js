const clickableDiv = document.querySelector('.promptBox');
const textBox = document.getElementById('prompt');
clickableDiv.addEventListener('click', function (event) {
    if (event.target !== textBox) {
        textBox.focus();
    }
});
let timetableData;
function req(){
  let loading = document.createElement('div');
  loading.classList.add('timetableContainer');
  loading.innerHTML = '<img src="./assets/loading.svg">';
  document.getElementById("mainContainer").appendChild(loading);
    fetch('http://127.0.0.1:5000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({prompt: textBox.value})
    }).then(response => response.json()).then(data => {
        timetableData = data;
        try {
        document.querySelector(".timetableContainer").remove();
        } catch {
            console.log('No timetableContainer found');
        };
        let timetableContainer = document.createElement('div');
        timetableContainer.classList.add('timetableContainer');
        let timetable = data.result;
        let timetableBox = document.createElement('div');
        timetableBox.classList.add('timetableBox');
        let timetableDiv = document.createElement('div');
        timetableDiv.classList.add('timetable');
        let task = document.createElement('div');
        task.classList.add('task');
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add('titleCell');
        cell.style.marginLeft = '2px';
        cell.innerHTML = 'Task';
        task.appendChild(cell);
        for(i in timetable){
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.marginLeft = '2px';
            cell.innerHTML = timetable[i][0];
            task.appendChild(cell);
        };
        timetableDiv.appendChild(task);
        let timeSlot = document.createElement('div');
        timeSlot.classList.add('timeSlot');
        let cell2 = document.createElement('div');
        cell2.classList.add('cell');
        cell2.style.marginLeft = '2px';
        cell2.classList.add('titleCell');
        cell2.innerHTML = 'Time Slot';
        timeSlot.appendChild(cell2);

        for(i in timetable){
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.marginLeft = '2px';
            cell.innerHTML = timetable[i][1];
            timeSlot.appendChild(cell);
        };
        timetableDiv.appendChild(timeSlot);
        timetableBox.appendChild(timetableDiv);
        let buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttonsContainer');
        let discard = document.createElement('div');
        discard.classList.add('discard');
        discard.classList.add('clickable');
        discard.classList.add('button');
        discard.innerHTML = 'Discard';
        buttonsContainer.appendChild(discard);
        let save = document.createElement('div');
        save.classList.add('save');
        save.classList.add('clickable');
        save.classList.add('button');
        save.innerHTML = 'Save';
        buttonsContainer.appendChild(save);
        timetableBox.appendChild(buttonsContainer);
        timetableContainer.appendChild(timetableBox);
        document.getElementById("mainContainer").appendChild(timetableContainer);
        discard.addEventListener('click', function(){
            timetableContainer.remove();
        });
        save.addEventListener('click', function(e){
          e.preventDefault();
          saveTT();
          return false;
        });
    });
}

function saveTT(){
  document.querySelector('.timetableContainer').remove();
  let loading = document.createElement('div');
  loading.classList.add('timetableContainer');
  loading.innerHTML = '<img src="./assets/loading.svg">';
  document.getElementById("mainContainer").appendChild(loading);
  fetch('http://127.0.0.1:5000/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({date: new Date().toDateString(), timetable: timetableData.result})
  }).then(response => {return response.json()}).catch(err => console.log(err));
  loading.innerHTML = '<div id="lottie-animation" style="height: 15rem; width: auto; margin-bottom: 10rem;"></div>';
  loading.style.marginBottom = '20rem';
  lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/ec80a6af-f622-4e3d-b20a-82dd831b7abb/HBHLDGIw59.json'
  });
  setTimeout(() => {
    loading.remove();
  }, 2500);
}