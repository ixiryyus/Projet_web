document.addEventListener("DOMContentLoaded", function () {



    function setWin() {
        this.parentNode.classList.add("win");


        var id_group = this.parentNode.parentNode.getAttribute('id'),
            arrow_select = document.querySelectorAll('#arrow_' + id_group);

        if (this.parentNode.classList.contains("one")) {

            var player_select = document.querySelector('.group-container-player.two.group_' + id_group);
            player_select.classList.add("loose");

            var btn_delete_two = document.querySelector('.btn.two.win.group_' + id_group);
            btn_delete_two.remove();

            for (var i = 0; i <= arrow_select.length; i++) {
                if (arrow_select[i].classList.contains("group-container-line_top__left") || arrow_select[i].classList.contains("group-container-line_top__right")) {
                    arrow_select[i].classList.add("win");
                    this.remove();
                }else{
                    arrow_select[i].classList.add("loose");
                }
            }
        } else {

            var player_select_two = document.querySelector('.group-container-player.one.group_' + id_group);
            player_select_two.classList.add("loose");

            var btn_delete_one = document.querySelector('.btn.one.win.group_' + id_group);
            btn_delete_one.remove();

            for (var i = 0; i <= arrow_select.length; i++) {
                if (arrow_select[i].classList.contains("group-container-line_bottom__left") || arrow_select[i].classList.contains("group-container-line_bottom__right")) {
                    arrow_select[i].classList.add("win");
                    this.remove();
                }else{
                    arrow_select[i].classList.add("loose");
                }
            }
        }
    }

    function setActive() {
        this.parentNode.classList.toggle("active");
        var _html = this.innerHTML, content = '<i class="fas fa-angle-up"></i>';
        if(_html === content){
            _html = '<i class="fas fa-angle-down"></i>';
            console.log(_html);
        }else{
            _html = '<i class="fas fa-angle-up"></i>';
            console.log(_html);
        }
    }

    var btn_click = document.querySelectorAll(".win");
    btn_click.forEach(function(btn){
        btn.addEventListener("click",setWin)
    });

    var btn_infos = document.querySelectorAll(".more");
    btn_infos.forEach(function(btn){
        btn.addEventListener("click",setActive)
    });

});