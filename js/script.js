document.addEventListener("DOMContentLoaded", function () {

    var nb_player = prompt("Please enter the player number (max player : 32)");


    if (nb_player <= 4){
        var nb_container_player = 4, nb_round = 3;
    }else if (nb_player > 4 && nb_player <= 8){
        var nb_container_player = 8, nb_round = 4;
    }else if (nb_player > 8 && nb_player <= 16){
        var nb_container_player = 16, nb_round = 5;
    }else if (nb_player > 16 && nb_player <= 32){
        var nb_container_player = 32, nb_round = 6;
    }

    create_container();

    function create_container() {

        for (i = 1; i < nb_round; i++) {
            var _headerHtml = "<div class=\"header-round\">" + "round " + i + "</div>\n" +
                "    <div class=\"header-arrow\"></div>";
            var header = document.querySelector(".header");
            header.insertAdjacentHTML("beforeend", _headerHtml);
            var _round = '<div data-round-id="' + i + '" class="round" id="r_' + i + '"></div>\n' +
                '    <div class="arrow"></div>';
            var container = document.querySelector(".container");
            container.insertAdjacentHTML("beforeend", _round);
        }

        for (k = 1; k <= (nb_container_player / 2); k++) {
            var arrow_container = "<div class=\"container-arrow\">\n" +
                "            <div data-group-id=\"" + k + "\" class=\"group-container-line_top__left\"></div>\n" +
                "            <div data-group-id=\"" + k + "\" class=\"group-container-line_top__right\"></div>\n" +
                "            <div data-group-id=\"" + k + "\" class=\"group-container-line_bottom__right\"></div>\n" +
                "            <div data-group-id=\"" + k + "\" class=\"group-container-line_bottom__left\"></div>\n" +
                "        </div>";
            var arrow = document.querySelector(".arrow");
            arrow.insertAdjacentHTML("beforeend", arrow_container);

            var group = "<div data-group-id=\"" + k + "\" class=\"group\">" +
                "</div>",
                round = document.querySelector(".round");
            round.insertAdjacentHTML("beforeend", group);

            if (k == (nb_container_player / 2)) {
                for (l = 1; l < 2; l++) {
                    for (m = 1; m <= (nb_container_player / 2); m++) {
                        var user1 = "<div id=\"player_" + l + "\" class=\"group-container-player one\" data-round=\""+ k +"\" data-group-id=\"" + m + "\">\n" +
                            "                <input type=\"text\" name=\"username\" placeholder='username' />\n" +
                            "                <button class=\"btn one win group_" + m + "\">Winner</button>\n" +
                            "                <button class=\"btn active\" alt='Follow the player' title='Follow the player'><i class=\"fas fa-angle-double-right\"></i></button>\n" +
                            "            </div>";
                        l++;
                        var user2 = "<div id=\"player_" + l + "\" class=\"group-container-player two \" data-round=\""+ k +"\" data-group-id=\"" + m + "\">\n" +
                            "                <input type=\"text\" name=\"username\" placeholder='username' />\n" +
                            "                <button class=\"btn two win group_" + m + "\">Winner</button>\n" +
                            "                <button class=\"btn active\" alt='Follow the player' title='Follow the player'><i class=\"fas fa-angle-double-right\"></i></button>\n" +
                            "        </div>";

                        var group_add = document.querySelector(".group[data-group-id='"+ m +"']")

                        group_add.insertAdjacentHTML("beforeend", user1);
                        group_add.insertAdjacentHTML("beforeend", user2);
                        l++
                    }
                }
            }

        }


        for (n = 1; n <= (nb_container_player / 4); n++) {
            var group_two = "<div id=\"g_" + n + "\" class=\"group group_round_two_" + n + "\">" +
                "</div>",
                next_round = document.querySelector("#r_2.round");
            next_round.insertAdjacentHTML("beforeend", group_two);

        }
    }

    function setWin(e) {
        e.preventDefault();
        this.parentNode.classList.add("win");

        var id_group = this.parentNode.parentNode.getAttribute('data-group-id'),
            player_id = this.parentNode.getAttribute('id'),
            arrow_select = document.querySelectorAll('#arrow_' + id_group);

        if (this.parentNode.classList.contains("one")) {

            var player_select = document.querySelector('.group-container-player.two[data-group-id="' + id_group +'"]'),
                player_id_two = player_select.getAttribute('data-player-id'),
                id_winner = this.parentNode.getAttribute("data-player-id"),
                id_round = this.parentNode.getAttribute("data-round-id"),
                idNewRound = Number(id_round)+1,
                idNewGroup = Number(id_group)+1,
                username = document.querySelector("[data-name=\"username\"][data-player-id='"+ id_winner +"'][data-group-id='"+ id_group +"'][data-round-id='"+ id_round +"']").value,
                add_user = "<span class='username' data-player-id='"+ id_winner +"' data-group-id='"+ id_group +"' data-round-id='"+ id_round +"'>"+ username +"</span>",
                new_container_next_round = document.querySelector('.group-container-player[data-lastgroup-id="'+ id_group+'"][data-round-id="'+ idNewRound +'"]');

            player_select.classList.add("loose");
            new_container_next_round.setAttribute("data-player-id", id_winner);
            new_container_next_round.insertAdjacentHTML("beforeend", add_user);


            var btn_delete_two = document.querySelector('.btn.two.win.group_'+ id_group);
            btn_delete_two.remove();

            for (var i = 0; i < arrow_select.length; i++) {
                if (arrow_select[i].classList.contains("group-container-line_top__left") || arrow_select[i].classList.contains("group-container-line_top__right")) {
                    arrow_select[i].classList.add("win");
                    arrow_select[i].setAttribute("data-player-id", id_winner);
                    this.remove();
                }else{
                    arrow_select[i].classList.add("loose");
                    arrow_select[i].classList.add(player_id_two);
                }
            }

        } else {

            var player_select_one = document.querySelector('.group-container-player.one[data-group-id="' + id_group+'"]'),
                player_id_one = player_select_one.getAttribute('data-player-id'),
                id_winner_two = this.parentNode.getAttribute("data-player-id"),
                id_round = this.parentNode.getAttribute("data-round-id"),
                idNewRound = Number(id_round)+1,
                new_container_next_round_2 = document.querySelector('.group-container-player[data-lastgroup-id="'+ id_group+'"][data-round-id="'+ idNewRound +'"]'),
                username_2 = document.querySelector("[data-name=\"username\"][data-player-id='"+ id_winner_two +"'][data-group-id='"+ id_group +"'][data-round-id='1']").value,
                add_user_2 = "<span class=\"username\" data-player-id='"+ id_winner_two +"' data-group-id='"+ id_group +"' data-round-id='"+ idNewRound +"'>"+ username_2 +"</span>";
            player_select_one.classList.add("loose");
            new_container_next_round_2.setAttribute("data-player-id", id_winner_two);
            new_container_next_round_2.insertAdjacentHTML("beforeend", add_user_2);

            var btn_delete_one = document.querySelector('.btn.one.win.group_' + id_group);
            btn_delete_one.remove();

            for (var i = 0; i < arrow_select.length; i++) {
                if (arrow_select[i].classList.contains("group-container-line_bottom__left") || arrow_select[i].classList.contains("group-container-line_bottom__right")) {
                    arrow_select[i].setAttribute("data-player-id", id_winner_two);
                    arrow_select[i].classList.add("win");
                    this.remove();
                }else{
                    arrow_select[i].classList.add("loose");
                    arrow_select[i].classList.add(player_id_one);
                }
            }
        }

    }

    function setActive() {
        this.parentNode.classList.toggle("active");
        var id_group = this.parentNode.parentNode.getAttribute('data-group-id'),
            id_winner_two = this.parentNode.getAttribute("data-player-id"),
            id_round = this.parentNode.getAttribute("data-round-id"),
            idNewRound = Number(id_round)+1,
            arrow_selectAll = document.querySelectorAll('.arrow[data-player-id="'+ id_winner_two +'"]'),
            new_container_next_round = document.querySelector('.group-container-player[data-lastgroup-id="'+ id_group+'"][data-round-id="'+ idNewRound +'"]').getAttribute("data-player-id"),
            new_container_next_round_2 = document.querySelector('.group-container-player[data-lastgroup-id="'+ id_group+'"][data-round-id="'+ idNewRound +'"]');

        for (var i = 0; i < arrow_selectAll.length; i++) {
            arrow_selectAll[i].classList.toggle("win");
            arrow_selectAll[i].classList.toggle("active");
        }
        if(this.parentNode.getAttribute("data-player-id") == new_container_next_round){
            new_container_next_round_2.classList.toggle("active");
        }

    }

    var btn_click = document.querySelectorAll(".win");
    btn_click.forEach(function(btn){
        btn.addEventListener("click",setWin)
    });

    var active = document.querySelectorAll(".btn.active");
    active.forEach(function(btn){
        btn.addEventListener("click",setActive)
    });

});