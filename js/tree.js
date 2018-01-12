document.addEventListener("DOMContentLoaded", function () {



    function setActive() {
        this.parentNode.classList.add("win");
        if(this.parentNode.classList.contains("one")){

            var id_arrow = this.parentNode.parentNode.getAttribute('id'), arrow_select = document.getElementById('arrow_' + id_arrow), arrow = arrow_select.childNodes;

            for(var i = 0; i <= arrow.length; i++){
                var test = arrow[i].classList.contains("group-container-line_top__left");
                console.log("test")
            }
        }else{
            console.log("chemin du bas");
        }
        this.remove();
    }

    var btn_click = document.querySelectorAll(".win");
    btn_click.forEach(function(btn){
        btn.addEventListener("click",setActive)
    })

});