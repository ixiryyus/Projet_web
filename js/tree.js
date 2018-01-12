document.addEventListener("DOMContentLoaded", function () {


    
    function setActive() {
        this.classList.add("active")
    }

    var btn_click = document.querySelectorAll(".group-container-player");
    btn_click.forEach(function(btn){
        btn.addEventListener("click",setActive)

    })

});