//all functions go inside document ready//

//create an array of objects that define our characters//
var characterPool = [
	lukeSkyWalker = {
		name: "Luke Skywalker",
		id: "lukeSkywalker",
		attackPoints: 8,
		healthPoints: 200,
		counterAttackPoints: 32,
		imageSource: "assets/images/luke-skywalker.jpg"
	},

	darthVader = {
		name: "Darth Vader",
		id: "darthVader",
		attackPoints: 5,
		healthPoints: 300,
		counterAttackPoints: 40,
		imageSource: "assets/images/darth-vader.jpg"
	},

	bobaFett = {
		name: "Boba Fett",
		id: "bobaFett",
		attackPoints: 10,
		healthPoints: 175,
		counterAttackPoints: 60,
		imageSource: "assets/images/boba-fett.jpg"
	}
];

//put these characters in the character pool
function createCharacter(){
	for(i = 0; i < characterPool.length; i++){
		var character = $("<div>").attr({
			"class": "container-fluid col-xs-6 col-sm-3 characterClick",
			"id": characterPool[i].id,
		});
		var characterStats = {
			characterImage: $("<img>").attr({
				"class": "img-responsive",
				"src": characterPool[i].imageSource,
			}),
			characterName: $("<h4>").html(characterPool[i].name),
			characterAttackPoints: $("<p>").html("Attack: " + characterPool[i].attackPoints),
			characterHealthPoints: $("<p>").html("Health: " + characterPool[i].healthPoints),
			characterCounterAttackPoints: $("<p>").html("Counter Attack: " + characterPool[i].counterAttackPoints),
		};
		character.append(
			characterStats.characterImage,
			characterStats.characterName,
			characterStats.characterAttackPoints,
			characterStats.characterHealthPoints,
			characterStats.characterCounterAttackPoints
		);
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
		$("#playLog").html("Choose an enemy to fight!");
		//second click goes to enemy area//
	} else if($("#enemyArea").html() == ""){
		var enemyInPlay = $(this);
		enemyInPlay.detach();
		$("#enemyArea").append(enemyInPlay);
		enemyInPlay.removeClass("col-xs-6 col-sm-3");
		//any character here gets a class .enemyInPlay//
		enemyInPlay.addClass("enemyInPlay");
		$("#playLog").html("Start fighting by clicking the attack button!");
	}
});

//define what happens when the attack button is pressed//
$("#attackButton").click(function(){
	
});

		
			
			
	//player area//
		
	//enemy area//
		

//if there is nothing in either player or enemy area//
	//player area message: please pick a character//
//if there is nothing in the enemy area//
	//please pick an enemy//
//once both areas are filled//
	//new enemy health = player attack - enemy health//
	//every time the player attacks, the attack point multiplier goes up by 1//
		//if enemy health = 0 then enemy is removed from enemy area and next enemy needs to be clicked//
		//when last enemy is defeated the player wins the game//
	//counter attack: new player health = enemy counter attack - player health//
		//if player health ever = 0 the game is immediately over and the player loses//
