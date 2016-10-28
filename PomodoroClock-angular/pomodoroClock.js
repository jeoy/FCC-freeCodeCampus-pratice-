

angular.module("PomodoroClock",[])
.controller("tomato",function($scope){
	$scope.phaseName = "Fighting!";
	$scope.remainTime = "";

 	function timerFormat(num){
 		if(num.toString().length == 1){
 			return '0'+num;
 		}
 		else
 			return num.toString();
 	}

 	function genTimerStr(sSecTotal){
 			var hour,
 				min,
 				sec,
 				result;
	
 			hour = parseInt(sSecTotal/3600);
 			min = parseInt((sSecTotal %3600)/60);
 			sec = sSecTotal %3600 %60;
 			if(hour){
 				result =  timerFormat(hour)+":"+timerFormat(min)+":"+timerFormat(sec);
 			}
 			else {
 				result = timerFormat(min)+":"+timerFormat(sec);
 			}
 			return result;
 		}

 	function tomatoClick(){
 		
 	}
});

 
$(function(){
	 
	$(".session span").text(25);
	$(".break span").text(5);
 	var sSecTotal = $(".session span").text()*60;
 	 // var sSecTotal = 5;
 	var bSecTotal = $(".break span").text()*60;
 	var Isbreak = false;
 	$(".Timer").text(genTimerStr(sSecTotal));



 
 	
 	$("#sAdd").click(function(){
 		var curVal = +$(".session span").text();
 		
 		$(".session span").text(++curVal );
 		sSecTotal = curVal*60;
 	});
 	$("#sMin").click(function(){
		var curVal = +$(".session span").text();
		
 		if (curVal > 1)
 			$(".session span").text( --curVal);
 		sSecTotal = curVal*60;
 	});
 	$("#bAdd").click(function(){
 		var curVal = +$(".break span").text();
 		
 		$(".break span").text( ++curVal);
 		bSecTotal = curVal*60;
 	});
 	$("#bMin").click(function(){
 		var curVal = +$(".break span").text();
 		
 		if (curVal > 1)
 			$(".break span").text( --curVal);
 		bSecTotal = curVal*60;
 	});
 	var Timer1;
 	$(".center").click(function(){
 		if(Timer1){
 			clearInterval(Timer1);
 			Timer1 = null;
 			
 			$('button').removeClass('disabled'); 
 			if(Isbreak)
 				$(this).addClass("pauseR");
 			else
 				$(this).addClass("pause");
 		}
 		else{
 			$(this).removeClass("pause");
 			$(this).removeClass("pauseR");
 			$('button').addClass('disabled'); 
 			$('#water').removeClass();
 			Timer1 = window.setInterval(function(){
 				if(!Isbreak){
 					sSecTotal --;
 					$("#water").height((1-sSecTotal/$(".session span").text()/60)*100+"%");
 					$("#item").text("Session");
 					$(".Timer").text(genTimerStr(sSecTotal));
 					$("#water").css("background-color","rgba(11,224,134,0.5)");
 					$(".center").css("background-color","rgba(101,224,134,0.5)"); 
 					$(".btn").css("background-color","rgba(11,224,134,0.5)");
 					$("body").css("background-color","rgba(121,224,134,0.5)");
 					if(sSecTotal == 0){
 						bSecTotal = +$(".break span").text()*60+1;
 						Isbreak = true;
 						
 						// $(".Timer").text(genTimerStr(bSecTotal));
 					}
 					
 				}
 				else{
 					bSecTotal --;
 					$("#water").height((1-bSecTotal/$(".break span").text()/60)*100+"%");
 					$("#item").text("Break");

 					$("#water").css("background-color","rgba(202, 53, 74, 0.5)");
 					$(".center").css("background-color","rgba(222, 53, 74, 0.5)"); 
 					$(".btn").css("background-color","rgba(202, 53, 74, 0.5)");
 					$("body").css("background-color","rgba(226, 125, 107, 0.7)");

 					$(".Timer").text(genTimerStr(bSecTotal));
 					if(bSecTotal == 0){
 						sSecTotal = +$(".session span").text()*60+1;
 						Isbreak = false;
 						$
 						// $(".Timer").text(genTimerStr(sSecTotal));
 					}
 					
 				}
		
 			},1000);
 		}
 	});
});