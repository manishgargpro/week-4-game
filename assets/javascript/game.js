//all functions go inside document ready//

//create an array of objects that define our characters//
var characterPool = [
	lukeSkyWalker = {
		name: "Luke Skywalker",
		id: "lukeSkywalker",
		attackPoints: 20,
		healthPoints: 200,
		counterAttackPoints: 32,
		imageSource: "assets/images/luke-skywalker.jpg"
	},

	darthVader = {
		name: "Darth Vader",
		id: "darthVader",
		attackPoints: 30,
		healthPoints: 300,
		counterAttackPoints: 40,
		imageSource: "assets/images/darth-vader.jpg"
	},

	bobaFett = {
		name: "Boba Fett",
		id: "bobaFett",
		attackPoints: 10,
		healthPoints: 180,
		counterAttackPoints: 50,
		imageSource: "assets/images/boba-fett.jpg"
	}
];

//put these characters in the character pool
function createCharacter(){
	for(i = 0; i < characterPool.length; i++){
		var character = $("<div>").attr({
			"class": "container-fluid col-xs-6 col-sm-3 characterClick",
			"id": characterPool[i].id,
			"value1": characterPool[i].attackPoints,
			"value2": characterPool[i].healthPoints,
		});
		var characterStats = {
			characterImage: $("<img>").attr({
				"class": "img-responsive",
				"src": characterPool[i].imageSource,
			}),
			characterName: $("<h4>").html(characterPool[i].name),
			characterAttackPoints: $("<p>").addClass("attackPoints"),
			characterHealthPoints: $("<p>").addClass("healthPoints"),
			characterCounterAttackPoints: $("<p>").addClass("counterAttackPoints"),
		};
		character.append(
			characterStats.characterImage,
			characterStats.characterName,
			characterStats.characterAttackPoints,
			characterStats.characterHealthPoints,
			characterStats.characterCounterAttackPoints
		);
		characterStats.characterAttackPoints.html(characterPool[i].attackPoints);
		characterStats.characterHealthPoints.html(characterPool[i].healthPoints);
		characterStats.characterCounterAttackPoints.html(characterPool[i].counterAttackPoints);
		$("#charPool").append(character);
	}
}

createCharacter();

//define character pool, player area, and enemy area parameters//
//character pool//
$(".characterClick").click(function(){
	console.log("clicking works");
//if someone is not already in the player area//
	if ($("#playerArea").html() == ""){
		//first click goes to player area//
		var playerInPlay = $(this);
		playerInPlay.detach();
		$("#playerArea").append(playerInPlay);
		playerInPlay.removeClass("col-xs-6 col-sm-3");
		//any character that goes in here gets a class .playerInPlay//
		playerInPlay.addClass("playerInPlay");
		$("#playLog1").html("Choose an enemy to fight!");
		//second click goes to enemy area//
	} else if($("#enemyArea").html() == ""){
		var enemyInPlay = $(this);
		enemyInPlay.detach();
		$("#enemyArea").append(enemyInPlay);
		enemyInPlay.removeClass("col-xs-6 col-sm-3");
		//any character here gets a class .enemyInPlay//
		enemyInPlay.addClass("enemyInPlay");
		$("#playLog1").html("Start fighting by clicking the attack button!");
		$("#playLog2").html("");
	} else{
		$("#playLog1").html("Beat this enemy first! Click the attack button!");
	}
});

//define what happens when the attack button is pressed//
$("#attackButton").click(function(){
	var playerAttack = $(".playerInPlay .attackPoints").html()
	var enemyCounterAttack =$(".enemyInPlay .counterAttackPoints").html()
	var playerHealth = $(".playerInPlay .healthPoints").html();
	var enemyHealth =$(".enemyInPlay .healthPoints").html();
	if($("#playerArea").html() !== "" && $("#enemyArea").html() !== ""){
		console.log("ready to play");
		//new enemy health//
		var newEnemyHealth = enemyHealth - playerAttack;
		$("#playLog1").html("You attacked for " + playerAttack + "points.");
		$(".enemyInPlay .healthPoints").html(newEnemyHealth);
		var newPlayerHealth = playerHealth - enemyCounterAttack;
		$("#playLog2").html("He attacked for " + enemyCounterAttack + "points.");
		$(".playerInPlay .healthPoints").html(newPlayerHealth);
		i++;
		var newPlayerAttack = +playerAttack + +$(".playerInPlay").attr("value1");
		$(".playerInPlay .attackPoints").html(newPlayerAttack);
		if(enemyHealth < 1){
			$(".enemyInPlay").remove();
			$("#playLog1").html("You won this battle!");
			$("#playLog2").html("Choose another enemy to fight!");
			playerHealth.html = $(".playerInPlay").attr("value2");
		}
	}
});

function winLose(){
	console.log("winLose works")
	if($(".playerInPlay .healthPoints").html() < 1){
		console.log("lost");
		$("#playLog1").html("You lost!");
		$("#playLog2").html("");
	}
	else if($("#charPool").html() == "" && $("#enemyArea").html() == ""){
		console.log("won");
		$("#playLog1").html("Congratulations!");
		$("#playLog2").html("You won the game!");
	}
}

winLose();
