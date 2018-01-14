document.addEventListener("DOMContentLoaded", function () {

var nb_player = prompt("Please enter the player number (max player : 512)");


    if (nb_player <= 4){
        var nb_container_player = 4, nb_round = 3;
    }else if (nb_player > 4 && nb_player <= 8){
        var nb_container_player = 8, nb_round = 4;
    }else if (nb_player > 8 && nb_player <= 16){
        var nb_container_player = 16, nb_round = 5;
    }else if (nb_player > 16 && nb_player <= 32){
        var nb_container_player = 32, nb_round = 6;
    }else if (nb_player > 32 && nb_player <= 64){
        var nb_container_player = 64, nb_round = 7;
    }else if (nb_player > 64 && nb_player <= 128){
        var nb_container_player = 128, nb_round = 8;
    }else if (nb_player > 128 && nb_player <= 256){
        var nb_container_player = 256, nb_round = 9;
    }else if (nb_player > 256 && nb_player <= 512){
        var nb_container_player = 512, nb_round = 10;
    }

    create_container();

    function create_container() {

        for(i = 0; i < nb_round; i++){
            var _headerHtml = "<div class=\"header-round\">" + "round " + (i+1) +"</div>\n" +
                "    <div class=\"header-arrow\"></div>";
            var header = document.querySelector(".header");
            header.insertAdjacentHTML("beforeend", _headerHtml);
            var _round = '<div class="round ' + (i+1) +'"></div>\n' +
                '    <div class="arrow"></div>';
            var container = document.querySelector(".container");
            container.insertAdjacentHTML("beforeend", _round);
        }

        for(j = 1; j<(nb_container_player /2)+1; j++){
            var arrow_container = "<div class=\"container-arrow\">\n" +
                "            <div id=\"arrow_"+j+"\" class=\"group-container-line_top__left\"></div>\n" +
                "            <div id=\"arrow_"+j+"\" class=\"group-container-line_top__right\"></div>\n" +
                "            <div id=\"arrow_"+j+"\" class=\"group-container-line_bottom__right\"></div>\n" +
                "            <div id=\"arrow_"+j+"\" class=\"group-container-line_bottom__left\"></div>\n" +
                "        </div>";
            var arrow = document.querySelector(".arrow");
            arrow.insertAdjacentHTML("beforeend", arrow_container);
            var container = document.querySelector(".container");
            container.insertAdjacentHTML("beforeend", _round);
        }

        for(k = 1; k<(nb_container_player /2)+1; k++) {

            var group = "<div class=\"group group_id_" + k + "\">" +
                "</div>";

            var round = document.querySelector(".round");
            round.insertAdjacentHTML("beforeend", group);

            for (l = 1; l < (nb_container_player + 1); l++) {
                var user1 = "<div id=\"player_" + l + "\" class=\"group-container-player one round_one group_1\">\n" +
                    "                <span class=\"username\">username</span>\n" +
                    "                <button class=\"btn one win group_" + k + "\">Winner</button>\n" +
                    "                <button class=\"btn more\"><i class=\"fas fa-angle-down\"></i></button>\n" +
                    "            </div>";
                l++;
                var user2 = "<div id=\"player_" + l + "\" class=\"group-container-player two round_one group_1\">\n" +
                    "                <span class=\"username\">username</span>\n" +
                    "                <button class=\"btn two win group_" + k + "\">Winner</button>\n" +
                    "                <button class=\"btn more\"><i class=\"fas fa-angle-down\"></i></button>\n" +
                    "            </div>\n" +
                    "        </div>";

                var group_add = document.querySelector(".group_id_"+k+"");
                group_add.insertAdjacentHTML("beforeend", user1);
                group_add.insertAdjacentHTML("beforeend", user2);
            }

        }
    }

    function setWin() {
        this.parentNode.classList.add("win");

        var id_group = this.parentNode.parentNode.getAttribute('id'),
            player_id = this.parentNode.getAttribute('id'),
            arrow_select = document.querySelectorAll('#arrow_' + id_group);

        if (this.parentNode.classList.contains("one")) {

            var player_select = document.querySelector('.group-container-player.two.group_' + id_group);
            player_select.classList.add("loose");

            var player_id_two = player_select.getAttribute('id');

            var btn_delete_two = document.querySelector('.btn.two.win.group_' + id_group);
            btn_delete_two.remove();

            for (var i = 0; i <= arrow_select.length; i++) {
                if (arrow_select[i].classList.contains("group-container-line_top__left") || arrow_select[i].classList.contains("group-container-line_top__right")) {
                    arrow_select[i].classList.add("win");
                    arrow_select[i].classList.add(player_id);
                    this.remove();
                }else{
                    arrow_select[i].classList.add("loose");
                    arrow_select[i].classList.add(player_id_two);
                }
            }
        } else {

            var player_select_two = document.querySelector('.group-container-player.one.group_' + id_group);
            player_select_two.classList.add("loose");
            var player_id_two = player_select_two.getAttribute('id');

            var btn_delete_one = document.querySelector('.btn.one.win.group_' + id_group);
            btn_delete_one.remove();

            for (var i = 0; i <= arrow_select.length; i++) {
                if (arrow_select[i].classList.contains("group-container-line_bottom__left") || arrow_select[i].classList.contains("group-container-line_bottom__right")) {
                    arrow_select[i].classList.add("win");
                    arrow_select[i].classList.add(player_id);
                    this.remove();
                }else{
                    arrow_select[i].classList.add("loose");
                    arrow_select[i].classList.add(player_id_two);
                }
            }
        }
    }

    function moreInfos() {
        this.parentNode.classList.toggle("more");
        var _html = this.innerHTML, content = '<i class="fas fa-angle-up"></i>';
        if(_html === content){
            _html = '<i class="fas fa-angle-down"></i>';
            console.log(_html);
        }else{
            _html = '<i class="fas fa-angle-up"></i>';
            console.log(_html);
        }
    }

    function setActive() {
        this.classList.toggle("active");
    }

    var btn_click = document.querySelectorAll(".win");
    btn_click.forEach(function(btn){
        btn.addEventListener("click",setWin)
    });

    var active = document.querySelectorAll(".group-container-player");
    active.forEach(function(btn){
        btn.addEventListener("click",setActive)
    });

    var btn_infos = document.querySelectorAll(".more");
    btn_infos.forEach(function(btn){
        btn.addEventListener("click",moreInfos)
    });

});