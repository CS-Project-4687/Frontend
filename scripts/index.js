/*
Blueprint: 
<div class="timetableContainer">
  <div class="timetableBox">
    <div class="timetable">
      <div class="task">
        <div class="cell" style="margin-left: 2px;">Task</div>
        <div id="tasks" class="tasks">
          <div class="taskCell cell">Task 1</div>
        </div>
      </div>
      <div class="timeSlot">
        <div class="cell" style="margin-left: 2px;">Time Slot</div>
        <div id="timeslots" class="timeslots">
          <div class="timeSlotCell cell">9:00 - 9:30</div>
        </div>
      </div>
    </div>
    <div class="buttonsContainer">
      <div class="discard clickable button">Discard</div>
      <div class="save clickable button">Save</div>
    </div>
  </div>
</div>
*/
const clickableDiv = document.querySelector('.promptBox');
const textBox = document.getElementById('prompt');
clickableDiv.addEventListener('click', function (event) {
    if (event.target !== textBox) {
        textBox.focus();
    }
});

function req(){
    fetch('http://127.0.0.1:5000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({prompt: textBox.value})
    }).then(response => response.json()).then(data => {
        console.log(data);
        try{
        document.querySelector(".timetableContainer").remove();
        } catch {
            console.log('No timetableContainer found');
        }
        let timetableContainer = document.createElement('div');
        timetableContainer.classList.add('timetableContainer');
        let timetable = data.result
        let timetableBox = document.createElement('div');
        timetableBox.classList.add('timetableBox');
        let timetableDiv = document.createElement('div');
        timetableDiv.classList.add('timetable');
        let task = document.createElement('div');
        task.classList.add('task');
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.marginLeft = '2px';
        cell.innerHTML = 'Task';
        task.appendChild(cell);
        for(i in timetable){
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.marginLeft = '2px';
            cell.innerHTML = timetable[i][0];
            task.appendChild(cell);
        }
        timetableDiv.appendChild(task);
        let timeSlot = document.createElement('div');
        timeSlot.classList.add('timeSlot');
        let cell2 = document.createElement('div');
        cell2.classList.add('cell');
        cell2.style.marginLeft = '2px';
        cell2.innerHTML = 'Time Slot';
        timeSlot.appendChild(cell2);

        for(i in timetable){
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.marginLeft = '2px';
            cell.innerHTML = timetable[i][1];
            timeSlot.appendChild(cell);
        }
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
    });
}