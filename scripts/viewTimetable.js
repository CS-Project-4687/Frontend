const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());

fetch("http://127.0.0.1:5000/get").then(response => response.json()).then(data => {
    data.find((element) => {
        document.getElementById('timetableTitle').textContent = element.date;
        if (element.unixID === params.id) {
            const timetableContainer = document.createElement('div');
            timetableContainer.className = 'timetableContainer';

            const timetableBox = document.createElement('div');
            timetableBox.className = 'timetableBox';

            const timetableDiv = document.createElement('div');
            timetableDiv.className = 'timetable';

            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';

            const taskTitleCell = document.createElement('div');
            taskTitleCell.className = 'cell titleCell';
            taskTitleCell.style.marginLeft = '2px';
            taskTitleCell.textContent = 'Task';

            const tasksDiv = document.createElement('div');
            tasksDiv.id = 'tasks';
            tasksDiv.className = 'tasks';

            element.timetable.forEach(item => {
                const taskCell = document.createElement('div');
                taskCell.className = 'taskCell cell';
                taskCell.textContent = item[0];
                tasksDiv.appendChild(taskCell);
            });

            taskDiv.appendChild(taskTitleCell);
            taskDiv.appendChild(tasksDiv);

            const timeSlotDiv = document.createElement('div');
            timeSlotDiv.className = 'timeSlot';

            const timeSlotTitleCell = document.createElement('div');
            timeSlotTitleCell.className = 'cell titleCell';
            timeSlotTitleCell.style.marginLeft = '2px';
            timeSlotTitleCell.textContent = 'Time Slot';

            const timeSlotsDiv = document.createElement('div');
            timeSlotsDiv.id = 'timeslots';
            timeSlotsDiv.className = 'timeslots';

            element.timetable.forEach(item => {
                const timeSlotCell = document.createElement('div');
                timeSlotCell.className = 'timeSlotCell cell';
                timeSlotCell.textContent = item[1];
                timeSlotsDiv.appendChild(timeSlotCell);
            });

            timeSlotDiv.appendChild(timeSlotTitleCell);
            timeSlotDiv.appendChild(timeSlotsDiv);

            timetableDiv.appendChild(taskDiv);
            timetableDiv.appendChild(timeSlotDiv);

            timetableBox.appendChild(timetableDiv);
            timetableContainer.appendChild(timetableBox);

            document.body.appendChild(timetableContainer);
        }
    });
}).catch(console.log);