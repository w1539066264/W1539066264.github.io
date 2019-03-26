var arr = [];				//用来保存弹幕数据的数组
var start = true;			//用来判断是否需要开启弹幕
$(document).ready(function(){
  /*console.log($("#submit").html());
  $("#submit").html("新按钮");*/
  var showscreen = $(".danmuShow");			//显示弹幕的div
  var showHeight = showscreen.height();		//此div的高度
  var showWidth = showscreen.width();		//此div的宽度
  

  //点击发送弹幕按钮
  $("#submit").click(function(){
  	var damutext = $("#comments").val();	//获取发送值
  	$("#comments").val("");					//清空发送区
  	console.log(damutext);					
  	arr.push(damutext);						//将值放入数据数组中
  	

  	var textObj = $("<div>"+damutext+"</div>");
  	showscreen.append(textObj);
  	console.log("textObj:"+textObj.html());
  	moveObj(textObj);						//写在后面的 函数
  
  	if(start == false){
	  	start = true;
	  	$("#change").html("关闭弹幕");
	  	runDanMu();							//开启弹幕
	}
  });

  //关闭、开启弹幕按钮点击事件
  $("#change").click(function(){
  	if(start == true){	//如果点击关闭弹幕
  		start = false;	
  		$("#change").html("开启弹幕");
  		showscreen.empty();
  	}
  	else if(start == false){
  		start = true;	//如果点击开启弹幕
  		$("#change").html("关闭弹幕");
  		runDanMu();							//开启弹幕
  	}
  });


  var topMin = showscreen.offset().top;
  var topMax = topMin+showHeight;
  //console.log("最小高"+topMin);
  //console.log("最大高"+topMax);
 
  var top = topMin;

	//将传入的参数,也就是那obj，进行移动
  var moveObj = function(obj){
  	obj.css({
  		display: "inline",
  		position:"absolute"
  	});

	var begin = showscreen.width() - obj.width();	//一开始的起点
  	top+=50;

  	if(top > topMax-50){
  		top = topMin;
  	}
  	//console.log("showscreenWidth"+showscreen.width());
  	//console.log("objWidth",obj.width());

  	console.log("begin:"+begin);
  	console.log("top:"+top);
  	console.log("obj"+obj);

  	obj.css({
  		left:begin,
  		top:top,
  		color:getRandomColor()
  	});

  	var time = 20000 + 10000*Math.random();
  	obj.animate({
  		left:"-"+begin+"px"
  	},time,function(){
  		obj.remove();
  	});
  }

//获取随机颜色的最高级写法 http://www.jb51.net/article/35931.htm
  var getRandomColor = function(){
  	return '#'+('00000'+(Math.random()*0xffffff <<0).toString(16)).substr(-6); 
  }

  var runDanMu = function(){
  	if(start == true){
  		if(arr.length > 0){
  			var n = Math.floor(Math.random()* arr.length + 1)-1;
  			var textObj = $("<div>"+arr[n]+"</div>");
  			showscreen.append(textObj);
  			//console.log("loop:"+textObj.html());
  			moveObj(textObj);
  		}
  	}
  	setTimeout(runDanMu,3000);
  }

  jQuery.fx.interval = 50;
  runDanMu();

});