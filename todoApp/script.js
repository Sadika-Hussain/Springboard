const submit = document.querySelector('input[type="submit"]');
const ul = document.querySelector('ul');
const input = document.querySelector('input[type="text"]');

if (localStorage.toDos) {
    const storedItems = JSON.parse(localStorage.toDos);
    if(storedItems.length === 0){
        localStorage.removeItem("toDos");
    }
    for (let item of storedItems) {
        const newLi = document.createElement('li');
        const { completed } = item;
        completed ? newLi.classList.add('completed') : newLi.classList.remove('completed');
        const content = item.text;
        newLi.innerText = content;
        appendDeleteBtn(newLi);
        ul.appendChild(newLi);
    }
}

submit.addEventListener('click', function(e) {
    e.preventDefault();
    const inputValue = input.value.trim(); 
    if (inputValue !== '') {
        const newLi = document.createElement('li');
        newLi.innerText = inputValue;
        appendDeleteBtn(newLi);
        ul.appendChild(newLi);
        saveToLocalStorage();
    }
    input.value = '';
});

ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
        saveToLocalStorage();
    }
    if (e.target.tagName === 'BUTTON') {
        const liToRemove = e.target.parentElement;
        const indexOfLi = Array.from(ul.children).indexOf(liToRemove);
        liToRemove.remove();
        removeFromLocalStorage(indexOfLi);
    }
});

function appendDeleteBtn (element) {
    const btn = document.createElement('button');
    btn.innerText = "Delete";
    element.appendChild(btn);
}

function saveToLocalStorage() {
    const items = [];
    for (let element of ul.children) {
        const text = element.firstChild.textContent;
        const item = {
            text: text,
            completed: false
        }; 
        if(element.classList.contains('completed')) {
            item.completed = true;
        }
        items.push(item);
    }
    localStorage.setItem('toDos', JSON.stringify(items));
}

function removeFromLocalStorage(index) {
    if (localStorage.toDos) {
        const storedItems = JSON.parse(localStorage.toDos);
        storedItems.splice(index, 1);
        localStorage.setItem('toDos', JSON.stringify(storedItems));
    }
}







 



