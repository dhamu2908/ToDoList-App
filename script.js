document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', function() {
            clearInterval(stopwatch.intervalId);
            li.parentNode.removeChild(li);
        });

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.classList.add('completeBtn');
        completeBtn.addEventListener('click', function() {
            li.classList.toggle('completed');
            pauseTimer(stopwatch); // Pause the stopwatch when task is completed
        });

        const stopwatchDisplay = document.createElement('span');
        stopwatchDisplay.textContent = '00:00:00';
        li.appendChild(stopwatchDisplay);
        li.appendChild(deleteBtn);
        li.appendChild(completeBtn);

        const startBtn = document.createElement('button');
        startBtn.textContent = 'Start';
        startBtn.classList.add('startBtn');
        startBtn.addEventListener('click', function() {
            startTimer(stopwatch);
        });

        const pauseBtn = document.createElement('button');
        pauseBtn.textContent = 'Pause';
        pauseBtn.classList.add('pauseBtn');
        pauseBtn.addEventListener('click', function() {
            pauseTimer(stopwatch);
        });

        li.appendChild(startBtn);
        li.appendChild(pauseBtn);

        taskList.appendChild(li);

        const stopwatch = {
            intervalId: null,
            seconds: 0,
            minutes: 0,
            hours: 0,
            isRunning: false
        };

        function startTimer(stopwatch) {
            if (!stopwatch.isRunning) {
                stopwatch.intervalId = setInterval(updateTimer, 1000);
                stopwatch.isRunning = true;
            }
        }

        function pauseTimer(stopwatch) {
            if (stopwatch.isRunning) {
                clearInterval(stopwatch.intervalId);
                stopwatch.isRunning = false;
            }
        }

        function updateTimer() {
            stopwatch.seconds++;
            if (stopwatch.seconds === 60) {
                stopwatch.seconds = 0;
                stopwatch.minutes++;
            }
            if (stopwatch.minutes === 60) {
                stopwatch.minutes = 0;
                stopwatch.hours++;
            }
            const formattedTime = `${pad(stopwatch.hours)}:${pad(stopwatch.minutes)}:${pad(stopwatch.seconds)}`;
            stopwatchDisplay.textContent = formattedTime;
        }

        function pad(num) {
            return num < 10 ? '0' + num : num;
        }
    }
});
