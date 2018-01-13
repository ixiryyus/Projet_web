
var list = document.querySelector('.tasklist');
console.log(list)
var nbr_player_button = document.querySelector("#nbr_player_button");
nbr_player_button.addEventListener('click', function () {
    var nbr_player = document.getElementById("nbr_player").value; //recuperation de la valeurs du nombre de joueur
    for (i=0; i<nbr_player; i++){
        list.appendChild(add_player());
    }
})

function add_player(get_player_number){
    var li = document.createElement('li');
    li.className = 'task';
    li.innerHTML = "<div class=\"task__checkbox\"><div class=\"newcheckbox\"><input type=\"hidden\" name=\"state[]\" value=\"0\"></div></div><div class=\"task__input\"><input type=\"text\" name=\"task[]\" placeholder=\"Player's name\"></div><div class=\"task__delete\"><a class=\"delete js-delete-task\"><i class=\"fa fa-times\"></i></a></div>";
    return li;
}
