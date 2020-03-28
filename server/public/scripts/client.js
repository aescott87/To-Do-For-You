$(document).ready(onReady);

function onReady() {
    console.log('jQuery is ready!');
    getTasks();
    $('#btn-add').on('click', addTask);
}

//Add new task
function addTask() {
    console.log('in addTask');
    //New task object
    let newTask = {
        task: $('#task-in').val(),
        due_date: $('#date-in').val()
    };
    //POST request to server
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask
    })
        .then((response) => {
            console.log('Got a response from server', response);
            getTasks();

            // Clear input fields on successful add
            $('#task-in').val('');
            $('#date-in').val('');

        })
        .catch((error) => {
            console.log('Got an error', error);
            alert(`Cannot add task at this time.`);
        });
}

//GET request to pull task list from server
function getTasks() {
    console.log('in getTasks');
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('Successful response', response);

        renderTasks(response)
    }).catch(function (err) {
        alert('Error retreiving task list. See console for details.');
        console.log(err);
    })

} // end getTasks

function renderTasks(tasks) {
    console.log('In renderTasks');
    $('#task-list').empty()
    for (let task of tasks) {
        let $tr = $('<tr scope="row"></tr>');
        const event = new Date(`${task.due_date}`);
        $tr.data('task', task);
        $tr.append(`<td>${task.id}</td>`);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append('<td>' + event.toDateString() + '</td>');
        $tr.append(`<td>${task.task_complete}</td>`);
        $tr.append(`<td><button class="btn-delete" data-id="${task.id}">Delete</button></td>`);
        //Conditional to add button if task is not complete
        if (task.task_complete === 'Incomplete') {
            $tr.append(`<td><button class="btn-complete">Completed</button></td>`);
            $tr.addClass('red');
        }
        else {
            $tr.append(`<td></td>`);
            $tr.addClass('green');
        }

        $('#task-list').append($tr);

    }
}