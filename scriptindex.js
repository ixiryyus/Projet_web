document.addEventListener("DOMContentLoaded", function(){

    console.log("[DOM] Loaded")

    // Mise a jour du nombre total d'élément
    function updateTaskTotal(){
        var  totalEl    = document.querySelector(".taskamount .total")
        var  totalCount = document.querySelectorAll(".tasklist .task")

        var totalElCheck    = document.querySelector(".taskamount .done")
        var totalCountCheck = document.querySelectorAll(".newcheckbox.active")

        totalEl.innerText      = totalCount.length
        totalElCheck.innerText = totalCountCheck.length
    }

    // Au chargement de la page, il faut au moins mettre a jour le nombre total d'élément
    updateTaskTotal()


    // Ajout d'une tâche.
    function addTask(e) {
        e.preventDefault()

        var _html = document.querySelector("#js-template-task")


        var taskList = this.parentNode.querySelector(".tasklist")
        taskList.insertAdjacentHTML("beforeend", _html.innerHTML)

        taskList.lastElementChild.querySelector(".js-delete-task").addEventListener("click", removeTask)
        taskList.lastElementChild.querySelector(".newcheckbox").addEventListener("click", toggleActiveTodo)

        // On oublie pas de mettre a jour le nombre total d'éléments
        updateTaskTotal()
    }

    var buttons = document.querySelectorAll(".js-add-task")

    // J'ajoute l'évènement d'ajout d'une tâche sur TOUS les boutons nécessaire
    buttons.forEach(function (btn){
        btn.addEventListener("click", addTask)
    })

    function removeTask(e){
        e.preventDefault()

        this.parentNode.parentNode.remove()
        updateTaskTotal()
    }

    function toggleActiveTodo(){
        this.classList.toggle("active")
        updateTaskTotal()
    }

    var removeBtns = document.querySelectorAll(".js-delete-task")

    removeBtns.forEach(function(removeBtn){
        removeBtn.addEventListener("click", removeTask)
    })

    var checkBtns = document.querySelectorAll(".newcheckbox")

    checkBtns.forEach(function(btn) {
        btn.addEventListener("click", toggleActiveTodo)
    })
})