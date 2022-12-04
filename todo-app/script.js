window.onload = function() {
    console.log('script loaded');
    
    let todos = [];
    let addFirst = false;

    function generateUniqueId(){
        return Date.now();
    }

    function clearInput(){
        const inputEl = document.getElementById("todo-input");
        inputEl.value = "";
    }

    function getAllTodos(){
        return todos;
    }

    function createNewTodo(todo){
        /* 
            container for the new item
            every item contains:
            1. todo text
            2. done button
            3. edit button
            4. delete button
        */
        const newTodo = document.createElement('div');
        newTodo.className = "todo-item";
        newTodo.setAttribute("id", todo.id);

        const itemText = document.createElement("p");
        itemText.className = "todo-text";
        itemText.innerHTML = todo.text;
        newTodo.appendChild(itemText);

        const itemDone = document.createElement("button");
        itemDone.className = "todo-button todo-done";
        itemDone.innerHTML = "✅";
        itemDone.addEventListener("click", e => {handleItemDone(e)})
        newTodo.appendChild(itemDone);
        
        const itemEdit = document.createElement("button");
        itemEdit.className = "todo-button todo-edit";
        itemEdit.innerHTML = "✏️";
        itemEdit.addEventListener("click", e => {handleItemEdit(e)})
        newTodo.appendChild(itemEdit);
        
        const itemDelete = document.createElement("button");
        itemDelete.className = "todo-button todo-delete";
        itemDelete.innerHTML = "❌";
        itemDelete.addEventListener("click", e => {handleItemDelete(e)})
        newTodo.appendChild(itemDelete);

        return newTodo;
    }

    function addTodo(todoText, todoId, pos=0){
        const todo = {
            id: todoId? todoId : generateUniqueId(),
            text: todoText
        };
        todos = [ todo, ...todos ];
        // todos = [ ...todos.slice(0, pos), todo, ...todos.slice(pos, todos.length) ];
        updateList(todo, pos);
        clearInput();
    }
    
    function handleItemDone(e){
        const todoId = e.target.parentNode.id;
        const todo = document.getElementById(todoId);
        todo.classList.toggle("done");
        console.log('todo completed ', todoId);
    }
    
    function handleItemDelete(e){
        const todoId = e.target.parentNode.id;
        const todo = document.getElementById(todoId);
        todo.remove();
    }

    function handleEditDone(e){
        const todoContainer = e.target.parentNode.parentNode;
        const todoParentEl = e.target.parentNode;
        const todoParentId = todoParentEl.id;
        const todoText = todoParentEl.getElementsByClassName("todo-edit-text")[0].value;
        const newTodo = createNewTodo({
            id: todoParentId,
            text: todoText
        });
        todoContainer.innerHTML = "";
        todoContainer.appendChild(newTodo);

    }

    function handleEditDiscard(e, currentTodo){
        const todoContainer = e.target.parentNode.parentNode;
        console.log('discarding edit with current node --> ', currentTodo)
        todoContainer.innerHTML = "";
        todoContainer.appendChild(currentTodo);
    }
    
    function handleItemEdit(e){
        const todoId = e.target.parentNode.id;
        const currentTodo = document.getElementById(todoId);
        const currentTodoText = currentTodo.getElementsByClassName("todo-text")[0].textContent;
        console.log("text was ", currentTodoText);

        const editTodoParent = document.createElement('div');
        editTodoParent.className = "todo-item";
        editTodoParent.setAttribute("id", todoId);

        // create an input element to replace the exisiting todo item
        const editTodo = document.createElement('input');
        editTodo.classList.add("todo-edit-text");
        editTodo.value = currentTodoText;
        // add event listener to the editTodo element

        const editDone = document.createElement("button");
        editDone.className = "todo-button todo-edit-button";
        editDone.innerHTML = "✅";
        editDone.addEventListener("click", e => {
            handleEditDone(e)
        })
        
        const editDiscard = document.createElement("button");
        editDiscard.className = "todo-button todo-discard-button";
        editDiscard.innerHTML = "❌";
        editDiscard.addEventListener("click", e => {handleEditDone(e)})

        const parentTodo = currentTodo;
        parentTodo.innerHTML = "";
        parentTodo.appendChild(editTodo);
        parentTodo.appendChild(editDone);
        parentTodo.appendChild(editDiscard);
        console.log('current todo during edit is ',currentTodo);
    }

    function updateList(todo, pos){
        const outputContainer = document.getElementsByClassName("todo-container")[0];

        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo-item-container');
        const newTodo = createNewTodo(todo);
        todoContainer.appendChild(newTodo);

        pos 
        ? outputContainer.insertBefore(todoContainer, outputContainer.children[pos-1])
        : addFirst ? outputContainer.prepend(todoContainer) : outputContainer.appendChild(todoContainer);
    }

    const inputEl = document.getElementById("todo-input");
    console.log(inputEl);
    inputEl.addEventListener("keydown", e => {
        if(e.code === "Enter"){
            const todoText = inputEl.value;
            if(todoText && todoText.trim() != ""){
                addTodo(todoText);
            }
        }
    });
    
}