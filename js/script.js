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

        var id_group = this.parentNode.parentNode.getAttribute('data-id'),
        player_id = this.parentNode.getAttribute('id'),
            arrow_select = document.querySelectorAll('#arrow_' + id_group);

        if (this.parentNode.classList.contains("one")) {

            var player_select = document.querySelector('.group-container-player.two.group_' + id_group);
            console.log('.group-container-player.two#' + id_group);
            player_select.classList.add("loose");

            var player_id_two = player_select.getAttribute('id'),
                id_winner = this.parentNode.getAttribute("id"),
                container_winner = document.querySelector("#"+ id_winner +"");

            var btn_delete_two = document.querySelector('.btn.two.win.group_' + id_group);
            btn_delete_two.remove();

            var round = this.parentNode.parentNode.parentNode,
                group_next_round = round.getAttribute("id");
            var next_round = document.querySelectorAll("#round_"+ group_next_round +".round");
            next_round.insertAdjacentHTML("beforeend", container_winner.innerHTML);

            for (var i = 0; i < arrow_select.length; i++) {
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

            for (var i = 0; i < arrow_select.length; i++) {
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

    function setActive() {
        this.parentNode.classList.toggle("active");
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