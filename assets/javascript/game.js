//welcome to my horrible ugly mess!//

//create an array of objects that define our characters//
var characterPool = [
	lukeSkyWalker = {
		name: "Luke Skywalker",
		id: "lukeSkywalker",
		attackPoints: 20,
		healthPoints: 300,
		counterAttackPoints: 35,
		imageSource: "assets/images/luke-skywalker.jpg"
	},

	darthVader = {
		name: "Darth Vader",
		id: "darthVader",
		attackPoints: 40,
		healthPoints: 400,
		counterAttackPoints: 50,
		imageSource: "assets/images/darth-vader.jpg"
	},

	bobaFett = {
		name: "Boba Fett",
		id: "bobaFett",
		attackPoints: 30,
		healthPoints: 250,
		counterAttackPoints: 45,
		imageSource: "assets/images/boba-fett.jpg"
	},

	hanSolo = {
		name: "Han Solo",
		id: "hanSolo",
		attackPoints: 35,
		healthPoints: 200,
		counterAttackPoints: 40,
		imageSource: "assets/images/han-solo.jpg"
	}
];

//put these characters in the character pool//
function createCharacter(){
	for(i = 0; i < characterPool.length; i++){
		//I ended up having to create a new set of html elements procedurally for every character in the object above. this made my code below really messy//
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
			characterAttackPoints: $("<span>").html(characterPool[i].attackPoints),
			characterHealthPoints: $("<span>").html(characterPool[i].healthPoints),
			characterCounterAttackPoints: $("<span>").html(characterPool[i].counterAttackPoints)
		};
		character.append(
			characterStats.characterImage,
			characterStats.characterName,
			$("<p>").html("Attack: ").append(characterStats.characterAttackPoints),
			$("<p>").html("Health: ").append(characterStats.characterHealthPoints),
			$("<p>").html("Counter Attack: ").append(characterStats.characterCounterAttackPoints)
		);
		//originally these stats had identifying words in front of them, but then calling on an element with words and numbers to compare and change got really complicated, so I left them as is//
		characterStats.characterAttackPoints.addClass("attackPoints");
		characterStats.characterHealthPoints.addClass("healthPoints");
		characterStats.characterCounterAttackPoints.addClass("counterAttackPoints");
		$("#charPool").append(character);
	}
}

createCharacter();

//because I had to use "this" in this function, I couldn't make it its own function that can be called anywhere, or at least I didn't know how//
function chooseCharacter(){
	$(".characterClick").click(function(){
		console.log("clicking works");
		//if someone is not already in the player area//
		if ($("#playerArea").html() == ""){
			//first click goes to player area//
			var playerInPlay = $(this);
			playerInPlay.removeClass("col-xs-6 col-sm-3 characterClick");
			//any character that goes in here gets a class .playerInPlay//
			playerInPlay.addClass("playerInPlay");
			playerInPlay.detach();
			$("#playerArea").append(playerInPlay);
			$("#playLog1").html("Choose an enemy to fight!");
			//second click goes to enemy area//
		} else if($("#enemyArea").html() == "" && $(this).hasClass("playerInPlay") == false){
			var enemyInPlay = $(this);
			enemyInPlay.removeClass("col-xs-6 col-sm-3 characterClick");
			//any character here gets a class .enemyInPlay//
			enemyInPlay.addClass("enemyInPlay");
			enemyInPlay.detach();
			$("#enemyArea").append(enemyInPlay);
			$("#playLog1").html("Start fighting by clicking the attack button!");
			$("#playLog2").html("");
		} else{
			$("#playLog1").html("Beat this enemy first! Click the attack button!");
		}
	});
}

chooseCharacter();

function fight(){
	//this is why this code ended up being so messy, I had to call on numbers inside the html, not from the object, because I didn't know how to select objects based on user clicks//
	var playerAttack = $(".playerInPlay .attackPoints").html()
	var enemyCounterAttack =$(".enemyInPlay .counterAttackPoints").html()
	var playerHealth = $(".playerInPlay .healthPoints").html();
	var enemyHealth =$(".enemyInPlay .healthPoints").html();
	if($("#playerArea").html() !== "" && $("#enemyArea").html() !== ""){
		console.log("ready to play");
		//new enemy health//
		var newEnemyHealth = enemyHealth - playerAttack;
		$("#playLog1").html("You attacked for " + playerAttack + " points.");
		$(".enemyInPlay .healthPoints").html(newEnemyHealth);
		var newPlayerHealth = playerHealth - enemyCounterAttack;
		$("#playLog2").html("He attacked for " + enemyCounterAttack + " points.");
		$(".playerInPlay .healthPoints").html(newPlayerHealth);
		i++;
		var newPlayerAttack = +playerAttack + +$(".playerInPlay").attr("value1");
		$(".playerInPlay .attackPoints").html(newPlayerAttack);
	}
	if(parseInt($(".playerInPlay .healthPoints").html()) < 1){
		return;
	}
}

//determine battle outcomes based on health points//
function winLose(){
	console.log("winLose works")
	if(parseInt($(".enemyInPlay .healthPoints").html()) < 1 && parseInt($(".playerInPlay .healthPoints").html()) > 0){
		console.log("enemy defeated")
		$(".enemyInPlay").remove();
		$("#playLog1").html("You won this battle! Your health is back to full.");
		$("#playLog2").html("Choose another enemy to fight!");
		//originally I wasn't going to have any health regeneration, but I figured you'll need full health to take on your next enemy, which might break the game, but whatever//
		$(".playerInPlay .healthPoints").html($(".playerInPlay").attr("value2"));
		if($("#charPool").html() == "" && $("#enemyArea").html() == ""){
			console.log("won");
			$("#playLog1").html("Congratulations!");
			$("#playLog2").html("You won the game!");
			$("#attackButton").html("Restart");
		}
	}	else if(parseInt($(".playerInPlay .healthPoints").html()) < 1){
		console.log("lost");
		$("#playLog1").html("You lost!");
		$("#playLog2").html("");
		$("#attackButton").html("Restart");
	}
}

//I added a restart option that only shows up once you've either either won or lost, I couldn't figure out how to do this via js alone, so right now it just reloads the whole window//
function restart(){
	if($("#attackButton").html() == "Restart"){
		$("#attackButton").click( function(){
			location.reload();
		});
	}
}

//define what happens when the attack button is pressed//
$("#attackButton").click( function(){
	console.log("attack works");
	fight();
	winLose();
	restart();
});

//sorry if you're actually trying to play the game, the stats aren't terribly well balanced//

//in general, if I had the knowledge when I started this project, I would've done many things differently//
//I would have made an object that calls on html values of the thing that is clicked, that way I would have had that to call on instead of the mess that exists now//
//I would have written out specific html for the play and enemy areas, and simply populated them with the object I would've created instead of using append//
//I would have made the whole game an object, things would have been so much easier to debug that way//
//and I would have used the chrome debugger a lot more, still something I have to get used to//
//thanks again to my friend for helping me and allowing me to see things in a different perspective//