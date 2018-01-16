document.addEventListener("DOMContentLoaded", function () {

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
                new_container_next_round = document.querySelector('.group-container-player[data-lastgroup-id="'+ id_group+'"][data-round-id="'+ idNewRound +'"]'),
                username = document.querySelector("input[data-player-id='"+ id_winner +"'][data-group-id='"+ id_group +"'][data-round-id='1']").value,
                add_user = "<span class=\"username\" data-player-id='"+ id_winner +"' data-group-id='"+ id_group +"' data-round-id='"+ idNewRound +"'>"+ username +"</span>" +
                    "<button class=\"btn one win group_1\">Winner</button>\n" +
                    "                <button class=\"btn active\" alt='Follow the player' title='Follow the player'><i class=\"fas fa-angle-double-right\"></i></button>";

            player_select.classList.add("loose");
            new_container_next_round.setAttribute("data-player-id", id_winner);
            new_container_next_round.insertAdjacentHTML("beforeend", add_user);


            var btn_delete_two = document.querySelector('.btn.two.win.group_'+ id_group);
            btn_delete_two.remove();

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

            var player_select_one = document.querySelector('.group-container-player.one[data-group-id="' + id_group+'"]'),
                player_id_one = player_select_one.getAttribute('data-player-id'),
                id_winner_two = this.parentNode.getAttribute("data-player-id"),
                id_round = this.parentNode.getAttribute("data-round-id"),
                idNewRound = Number(id_round)+1,
                new_container_next_round_2 = document.querySelector('.group-container-player[data-lastgroup-id="'+ id_group+'"][data-round-id="'+ idNewRound +'"]'),
                username_2 = document.querySelector("input[data-player-id='"+ id_winner_two +"'][data-group-id='"+ id_group +"'][data-round-id='1']").value,
                add_user_2 = "<span class=\"username\" data-player-id='"+ id_winner_two +"' data-group-id='"+ id_group +"' data-round-id='"+ idNewRound +"'>"+ username_2 +"</span>" +
                    "<button class=\"btn one win group_1\">Winner</button>\n" +
                    "                <button class=\"btn active\" alt='Follow the player' title='Follow the player'><i class=\"fas fa-angle-double-right\"></i></button>";
            player_select_one.classList.add("loose");
            new_container_next_round_2.setAttribute("data-player-id", id_winner_two);
            new_container_next_round_2.insertAdjacentHTML("beforeend", add_user_2);

            var btn_delete_one = document.querySelector('.btn.one.win.group_' + id_group);
            btn_delete_one.remove();

            for (var i = 0; i < arrow_select.length; i++) {
                if (arrow_select[i].classList.contains("group-container-line_bottom__left") || arrow_select[i].classList.contains("group-container-line_bottom__right")) {
                    arrow_select[i].classList.add("win");
                    arrow_select[i].classList.add(player_id);
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