const form = document.querySelector(".form")
const input = document.querySelector("#input")
const ul= document.querySelector(".list");


let todos = JSON.parse(localStorage.getItem("todos"));
for(let i=0; i<todos.length; i++){
	createTodos(todos[i])
}

form.addEventListener('click', (e) => {
	e.preventDefault();
	if(!input.value) return;
	createTodos()
})

function createTodos(todos) {
	let inputValue = input.value
	if(todos){
	   inputValue = todos.name
	}

	const liEl = document.createElement("li");
	liEl.classList.add("item")
	ul.appendChild(liEl)
	
	const textEl = document.createElement("p")
	textEl.innerText = inputValue
	liEl.appendChild(textEl)
	input.value = "";
	
	const editBtn = document.createElement("div");
	editBtn.innerHTML= `<i class="fa fa-pencil">`;
	const doneBtn = document.createElement("div");
	doneBtn.innerHTML= `<i class="fa fa-check">`;
	const delBtn = document.createElement("div");
	delBtn.innerHTML= `<i class="fa fa-trash">`;
	liEl.append(editBtn, doneBtn, delBtn)

	doneBtn.addEventListener('click', () => {
		liEl.classList.toggle('done');
		editBtn.toggleAttribute("disabled")
		setStorage()
	
	})

	editBtn.addEventListener('click', () => {
		if(!editBtn.hasAttribute("disabled")){
			const parent = editBtn.parentElement.firstChild;
			const currentValue = editBtn.parentElement.firstChild.innerText;
			const newValue = prompt(`Replace '${currentValue}'?`, `${currentValue}`);
			newValue ? parent.innerText = newValue : "";
		} 
	})

	delBtn.addEventListener('click', () => {
		if(confirm('Are you sure you want to delete the task?')){
			liEl.remove()
			setStorage()
		}
	})
	setStorage()
}

function setStorage () {
	const todosEl = document.querySelectorAll("li")
	todos = []
	todosEl.forEach(todo => {
		todos.push({
			name: todo.innerText,
		})
	})

	localStorage.setItem("todos", JSON.stringify(todos))
}
