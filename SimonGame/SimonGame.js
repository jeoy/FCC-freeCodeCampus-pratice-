$(function(){

$simon ={
	ledOn:false,
	switchOn: false,
	timeStepArr : [400,400,400,600],
	blinkArr :[],
	count: 0,
	isPlayerTurn: false,
	playerArr : [],
	error : false,
	strict:false,
	isAgain:false,
	turnOver:true,
	init: function(){
		
 
		$("#switch ").click(function(){
			$simon.switchOn = $("#switch input").prop('checked');
			if(!$simon.switchOn){  
				$("button").addClass("disabled");
				$("#count input").val("");
				$("#led").css("background-color","white");
				$simon.ledOn = false;
			}
			else{
				$("button").removeClass("disabled");
				$("#count input").val("--");
				$simon.count = 0;
				$simon.blinkArr = [];
				$simon.playerArr =[];
				$simon.error = false;
				$simon.isAgain = false;
				$simon.isPlayerTurn = false;
			}
		});
		$("#strict").click(function(){
			if($simon.switchOn){
				if($simon.ledOn){
					$("#led").css("background-color","white");
				}
				else{
					$("#led").css("background-color","#e02121");
				}
				$simon.ledOn = !$simon.ledOn;
			}
		});

		$("#start").click(function(){
			if($simon.switchOn){
				$simon.turnOver = false;
				$simon.error = false;
				window.setTimeout(function(){     //开始游戏
					if(!$simon.isAgain){
						var randomNum = $simon.randomGen(4);
						$simon.blinkArr.push(randomNum);
						
						$simon.count ++;
					}
					$simon.isAgain = false;
					$("#count input").val($simon.count);
					$simon.blink($simon.count,$simon.blinkArr);
					
				},1000);
	 			// alert("start!");
			}
		});

		$("#drum").on("mousedown",".drum",function(){
			if($simon.switchOn){
			if($simon.isPlayerTurn){
				var currInd = $(this).index();
				$simon.playerArr.push(currInd);
				if($simon.playerArr.toString() != $simon.blinkArr.slice(0,$simon.playerArr.length).toString()){
					console.log("error");
					$("#count input").val("ERR");
					$simon.turnOver = true;
					$simon.error = true;
					if($simon.ledOn){
						$simon.count = 0;
						$simon.blinkArr = [];
						$simon.playerArr =[];
						$("#count input").val($simon.count);
					}
					else{
						$simon.isAgain = true;
						$simon.playerArr =[];
					}
					window.setTimeout(function(){
					$("#start").click();
					},1000);
				}

				else if ( $simon.playerArr.toString() == $simon.blinkArr.toString()){
					console.log("匹配成功");
					$("#count input").val("SEC");
					$simon.turnOver = true;
					$simon.playerArr = [];

					window.setTimeout(function(){
					$("#start").click();
					},1000);
				}
				var  bgImageUrl = $(this).css("background-image");
				var newbgImageUrl = bgImageUrl.slice(0,-6)+'Light.jpg")'
				$(this).css("background-image",newbgImageUrl);
				
			}
			}
		});
		$("#drum").on("mouseup",".drum",function(){
			if($simon.isPlayerTurn){
				if($simon.turnOver){
					$simon.isPlayerTurn = false;
				}
				var  bgImageUrl = $(this).css("background-image");
				var newbgImageUrl = bgImageUrl.replace(/Light/,"");
				$(this).css("background-image",newbgImageUrl);
			}
		});
		
	},

	randomGen: function(num){
		return Math.floor(Math.random()*(num));
	},
	blink: function(count,blinkArrIn){
		var timeStep;
    	if (count < 4)
			timeStep = $simon.timeStepArr[0];
		else if (count < 8)
			timeStep = $simon.timeStepArr[1];
      	else if (count < 12)
			timeStep = $simon.timeStepArr[2];
		else timeStep = $simon.timeStepArr[3];
		
		var blinkArr = blinkArrIn.slice(0);		 
			var num = blinkArr.shift();
			var  bgImageUrl = $("#drum").children().eq(num).css("background-image");
			var newbgImageUrl = bgImageUrl.slice(0,-6)+'Light.jpg")'
			$("#drum").children().eq(num).css("background-image",newbgImageUrl)
			window.setTimeout(function(){  
				$("#drum").children().eq(num).css("background-image",bgImageUrl)
				if(blinkArr.length){
					window.setTimeout(function(){ 
						window.setTimeout($simon.blink(count,blinkArr),timeStep);
					},timeStep)
				}
				else{
					$simon.playerTurn();
				}
				
			},timeStep);
		 
		

	},

	playerTurn:function(){
		console.log("myturn");
		$simon.isPlayerTurn = true;

	}



};




$simon.init();

});