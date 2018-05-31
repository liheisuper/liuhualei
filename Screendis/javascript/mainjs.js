// JavaScript Document
//接口公共地址
urlmose= 'http://192.168.3.105:8000';
 //urlmose= 'http://www.lisuper.cn';
/*
右上角获取当前时间
*/
var timeshow = null;
timeshow = setTimeout(time,1000);//开始执行
function time(){
	clearTimeout(timeshow);//清除定时器
	dt = new Date();
	var yy=dt.getYear()+1900;
	var mm=dt.getMonth()+1;
	var dd=dt.getDate();
	var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var day=dt.getDay();
	var hh=dt.getHours();
	var mi=dt.getMinutes();
	var ss=dt.getSeconds();
	if(hh<10){hh="0"+hh;}
	if(mi<10){mi="0"+mi;}
	if(ss<10){ss="0"+ss;}
	if(hh<13){ss=ss+"AM";}else{ss=ss+"PM";}
	document.getElementById("timeShow").innerHTML = yy+"年"+mm+"月"+dd+"日&nbsp;&nbsp;"+weekday[day]+"&nbsp;&nbsp;"+hh+":"+mi+":"+ss+"";
	timeshow = setTimeout(time,1000); //设定定时器，循环执行           
}
/*
价格指数
标签和div同时轮播
*/
$(function(){  
    //手动播放图片  
    $("#left-o-sp ul").on("click","li",function(){  
          
        $(this).addClass("one").siblings().removeClass("one");  
        index=$(this).index();  
        i=index;  
        $("#left-o-di div").eq(index).stop().fadeIn(500).show().siblings().stop().fadeIn(500).hide();    
        });  

    //自动播放图片  
    var i=0;  
    var t=setInterval(autoplay,5000);  
    function autoplay(){  
        i++;  
        if(i>8)i=0;        
        $("#left-o-sp ul li").eq(i).addClass("one").siblings().removeClass("one");  
        $("#left-o-di div").eq(i).stop().fadeIn(500).show().siblings().stop().fadeIn(500).hide();   
    }  

        $("#left-o").hover(function(){  
            clearInterval(t);  
        },function(){  
            t=setInterval(autoplay,5000);  
        });  
    });  

/*
价格指数
div中图表
dv1总指数
*/
 $(document).ready(function() {
	   var chart= {  		  
		  backgroundColor: 'rgba(0,0,0,0)' ,
		   
	   }; 
	   var title = {
		  text: null   
	   };
	   var subtitle = {
		  text: null
	   };
	   var xAxis = {
		   labels:{ 
			step:3
		  },
		  categories: ['2008/01','1111','2009/05','2222', '2010/10', '2010/10', '2012/02', '2012/02', '2013/07','2013/07', '2014/12','2014/12',
		  '2016/05','2016/05', '2017/10', '2017/10'],
		  labels: {
                rotation: -15//让标签旋转-45°
            }
	        
	   };
	   var yAxis = {
		  title: {
			 text: null
		  },
		  labels: {//y轴刻度文字标签  
			formatter: function () {  
				return this.value + 'k';//y轴加上%  
			}  
		  },  
		  plotLines: [{
			 value: 0,
			 width: 1,
			 color: 'red'
		  }]
	   };   
	
	   var tooltip = {
		  valueSuffix: 'k'
	   }
	
	   var legend = {
		  enabled: false
	   };
	   
	   var credits = {  
		enabled: false     //不显示LOGO 
	   };
	
	   var series =  [
		  {
			 name: 'Tokyo',
			 data: [2.5,0, 2,0, 5.2,0, 7.2,0, 9.6,0, 10,0, 11,0, 12,0],
			 color: '#ffb400',
			 marker: {
	           enabled: false
	          }
		  }
		 
	   ];
	   
	   var json = {};
	   json.chart = chart;
	   json.title = title;
	   json.subtitle = subtitle;
	   json.xAxis = xAxis;
	   json.yAxis = yAxis;
	   json.tooltip = tooltip;
	   json.legend = legend;
	   json.credits = credits;
	   json.series = series;	
	   $('#dv1').highcharts(json);
	});
	
/*
月产新品种
后台数据
*/
$(document).ready(function() {
	$.ajax({
	      url:urlmose+'/index.php/index/index/test',
	      type:'post',
	      dataType:'json',
	      data:{},
	      async:false,
	      success:function(data){
	      	$("#month").html(data.month+"月产新品种");
	      	$("#left-tx1").html(data.present); 
	      	$("#left-tx2").html(data.next_present); 			 
		  },
		  error:function(data){

		  }
	});

})


/*
生态原产地产品保护中药材
图片横向滚动
 */
/*示范区*/
$(document).ready(function() {
$.ajax({
  url:urlmose+'/index.php/index/Picture/demonstration',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><a href='#'><img src='"+vendorJson[i]+"' width='67' height='51'/></a></li>";
    }
    $("#scroll-on").html(html);
    var toid = function(el) {          
	  return document.getElementById(el);       
	 },
	 toc = toid("left-th-to");
	 if(toc) {
	   var ul = toid("scroll-on"),
		   lis = ul.getElementsByTagName("li"),
		   itemCount = lis.length,
		   width = lis[0].offsetWidth, //获得每个img容器的宽度
		   marquee = function() {
			   toc.scrollLeft += 2;
			   if(toc.scrollLeft % width <= 1){  //当 c.scrollLeft 和 width 相等时，把第一个img追加到最后面
				   ul.appendChild(ul.getElementsByTagName("li")[0]);
				   toc.scrollLeft = 0;
			   };
		   },
	       speed = 70; //数值越大越慢
	       ul.style.width = width*itemCount + "px"; //加载完后设置容器长度
	       var timer = setInterval(marquee, speed);
	   };
  },
  error:function(data){

  }
});

})
/*中药材产品*/
$(document).ready(function() {
$.ajax({
  url:urlmose+'/index.php/index/Picture/product',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><a href='#'><img src='"+vendorJson[i]+"' width='67' height='51'/></a></li>";
    }
    $("#scroll-tw").html(html);
    var twid = function(twel) {          
	 return document.getElementById(twel);       
	},
	 twc = twid("left-th-tw");
	 if(twc) {
	   var twul = twid("scroll-tw"),
		   twlis = twul.getElementsByTagName("li"),
		   twtimeCount = twlis.length,
		   twwidth = twlis[0].offsetWidth, //获得每个img容器的宽度
		   marquee = function() {
			   twc.scrollLeft += 2;
			   if(twc.scrollLeft % twwidth <= 1){  //当 c.scrollLeft 和 width 相等时，把第一个img追加到最后面
				   twul.appendChild(twul.getElementsByTagName("li")[0]);
				   twc.scrollLeft = 0;
			   };
		   },
	       speed = 70; //数值越大越慢
	       twul.style.width = twwidth*twtimeCount + "px"; //加载完后设置容器长度    
	       var twimer = setInterval(marquee, speed);
	   };
  },
  error:function(data){

  }
});

})


/*
市场价格
图表 列表
 */
/*图表*/
$(document).ready(function() {
	   var chart= {  		  
		  backgroundColor: 'rgba(0,0,0,0)' ,
		   
	   }; 
	   var title = {
		  text: null   
	   };
	   var subtitle = {
		  text: null
	   };
	   var xAxis = {
		   /*labels:{ 
			step:12
		  },*/
		  categories: ['2015年1月','2015年2月','2015年3月','2015年4月','2015年5月','2015年6月','2015年7月','2015年8月','2015年9月','2015年10月',
		               '2015年11月','2015年12月','2016年1月','2016年2月','2016年3月','2016年4月','2016年5月','2016年6月','2016年7月','2016年8月',
		               '2016年9月','2016年10月','2016年11月','2016年12月','2017年1月','2017年2月','2017年3月','2017年4月','2017年5月','2017年6月',
		               '2017年7月','2017年8月','2017年9月','2017年10月','2017年11月','2017年12月','2018年1月','2018年2月','2018年3月','2018年4月',
		               '2018年5月','2018年6月','2018年7月','2018年8月','2018年9月','2018年10月','2018年11月','2018年12月'],
		  tickInterval:12,
		  gridLineColor: '#6c6a91',//网格线颜色
		  color:'#6c6a91'
		  /*labels: {
                rotation: -15//让标签旋转-45°
            }*/
	        
	   };
	   var yAxis = {
		  title: {
			 text: null
		  },
		  gridLineColor: '#6c6a91',//纵向网格线颜色
		  lineWidth:1,  //Y轴默认不显示Y轴线，添加一个轴线的宽度就可以显示出来
		  color:'#6c6a91',
　　      tickPixelInterval:10 , //自行调整Y轴刻度的间距 
		  labels: {//y轴刻度文字标签  
			formatter: function () {  
				return this.value + 'k';//y轴加上%  
			}  
		  },  
		 
	   };   
	
	   var tooltip = {
		  valueSuffix: 'k'
	   }
	
	   var legend = {
		  enabled: false
	   };
	   
	   var credits = {  
		enabled: false     //不显示LOGO 
	   };
	
	   var series =  [
		  {
			 name: '红花 荷花池药市',
			 data: [83,83,83,82,78,78,80,80,88,95,100,100,84,89,83,83,86,86,90,90,115,115,110,110,105,105,96,96,89,89,89,98,98,100,100,
			        86,86,96,96,90,83,83,83,82,78,78,80,80],
			 color: '#ffb400'
		  }
	   ];
	   
	   var json = {};
	   json.chart = chart;
	   json.title = title;
	   json.subtitle = subtitle;
	   json.xAxis = xAxis;
	   json.yAxis = yAxis;
	   json.tooltip = tooltip;
	   json.legend = legend;
	   json.credits = credits;
	   json.series = series;	
	   $('#middle-tu').highcharts(json);
	});

/*列表*/


/*
品种指数涨跌情况
条形统计图
 */
/*
上涨品种
*/
$(document).ready(function() { 
$.ajax({
  // url:'http://192.168.3.105:8000/index.php/index/Picture/rise',
  url:urlmose+'/index.php/index/Picture/rise',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
	var vendorJson = eval(datas.date);
  	 var chart = {
	  type: 'bar',
	  backgroundColor: 'rgba(0,0,0,0)'
	   };
	   var title = {
		  text: null
	   };
	   var subtitle = {
		  text: '上涨品种',
		  y:20,  
		  style: {
		            color: '#ffffff',//颜色
		            fontSize:'1em'  //字体
		        }
	   };
	   var xAxis = {
		  categories: [vendorJson[0].drug,vendorJson[1].drug,vendorJson[2].drug,vendorJson[3].drug],/*['薤白', '五味子', '细辛', '知母'],*/
		  title: {
			 text: null
		  },
		  labels: {
	         step:1,     
	         style: {
	            color: '#ffffff',//颜色
	            fontSize:'1em'  //字体
	         } 
	      },
	      
	   };
	   var yAxis = {
		  min: 0,
		  title: {
			 text: null
		  },
		  labels: {//y轴刻度文字标签  
		     enabled:false  
		  },
		  gridLineColor: '#413e68',//纵向网格线颜色
		  gridLineWidth: 1 //纵向网格线宽度
	   };
	   var tooltip = {
		  valueSuffix: '%'
	   };
	   var plotOptions = {
		  bar: {
			 dataLabels: {
				enabled: true,
				color:'#ffffff',
				crop:false,
                overflow: 'none',
				formatter: function() {         
					return this.y+ '%';  //返回百分比和个数
				}
			 }			 
		  },
		  series: {
			marker: {
			enabled: false
			}
		  }		  
	   };
	  
	   var legend = {
		  enabled: false
	   };
	   var credits = {
		  enabled: false
	   };
	   var series= [{
			 name: '上涨',
			 data: [{'color':'#6e72ea','y':JSON.parse(vendorJson[0].exponent)}, 
				   {'color':'#9972e7','y':JSON.parse(vendorJson[1].exponent)},
				   {'color':'#de76ca','y':JSON.parse(vendorJson[2].exponent)},
				   {'color':'#f0788f','y':JSON.parse(vendorJson[3].exponent)}]
		   }
	   ];

   	   var json = {};   
	   json.chart = chart; 
	   json.title = title;   
	   json.subtitle = subtitle; 
	   json.tooltip = tooltip;
	   json.xAxis = xAxis;
	   json.yAxis = yAxis;  
	   json.series = series;
	   json.plotOptions = plotOptions;
	   json.legend = legend;
	   json.credits = credits;
	   
	   $('#middle-up').highcharts(json);

  },
  error:function(data){

  }

})


  
  
});
/*
下跌品种
*/
$(document).ready(function() {
$.ajax({
  url:urlmose+'/index.php/index/Picture/tumble',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
	var vendorJson = eval(datas.date);
	var chart = {
	  type: 'bar',
	  backgroundColor: 'rgba(0,0,0,0)'
	   };
	   var title = {
		  text: null
	   };
	   var subtitle = {
		  text: '下跌品种', 
		  y:20, 
		  style: {
		            color: '#ffffff',//颜色
		            fontSize:'1em'  //字体
		        }
	   };
	   var xAxis = {
		  categories:[vendorJson[0].drug,vendorJson[1].drug,vendorJson[2].drug,vendorJson[3].drug], /*'薤白', '五味子', '细辛', '知母'*/
		  title: {
			 text: null
		  },
		  labels: {
	         step:1,     
	         style: {
	            color: '#ffffff',//颜色
	            fontSize:'1em'  //字体
	         } 
	      },
	   };
	   var yAxis = {
		  min: 0,
		  title: {
			 text: null
		  },
		  labels: {//y轴刻度文字标签  
		     enabled:false  
		  },
		  gridLineColor: '#413e68',//纵向网格线颜色
		  gridLineWidth: 1 //纵向网格线宽度
	   };
	   var tooltip = {
		  valueSuffix: '%'
	   };
	   var plotOptions = {
		  bar: {
			 dataLabels: {
				enabled: true,
				color:'#ffffff',
				crop:false,
                overflow: 'none',
				formatter: function() {         
					return '-'+this.y+ '%';  //返回百分比和个数
				}
			 }			 
		  },
		  series: {
			marker: {
			enabled: false
			}
		  }		  
	   };
	  
	   var legend = {
		  enabled: false
	   };
	   var credits = {
		  enabled: false
	   };
	   
	   var series= [{
			 name: '下跌',
				data: [{'color':'#f0788f','y':JSON.parse(vendorJson[0].exponent)},
				       {'color':'#de76ca','y':JSON.parse(vendorJson[1].exponent)},
				       {'color':'#9972e7','y':JSON.parse(vendorJson[2].exponent)},
				       {'color':'#6e72ea','y':JSON.parse(vendorJson[3].exponent)}]
			}
	   ];     
	   var json = {};   
	   json.chart = chart; 
	   json.title = title;   
	   json.subtitle = subtitle; 
	   json.tooltip = tooltip;
	   json.xAxis = xAxis;
	   json.yAxis = yAxis;  
	   json.series = series;
	   json.plotOptions = plotOptions;
	   json.legend = legend;
	   json.credits = credits;
	   
	   $('#middle-down').highcharts(json);
	  

	},
	  error:function(data){

	  }
	})
})  
   

/*
供应信息
数据滚动
*/
$(document).ready(function() {
$.ajax({
  url:urlmose+'/index.php/index/Picture/supply',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
	  // alert(vendorJson[0].id);

    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><span style='width:16%;'>"+vendorJson[i].drug+"</span>"
	  			   +"<span style='width:10%'>"+vendorJson[i].size+"</span>"
	  			   +"<span style='width:16%'>"+vendorJson[i].place+"</span>"
	  			   +"<span style='width:12%'>"+vendorJson[i].number+"</span>"
	  			   +"<span style='width:10%'>"+vendorJson[i].price+"</span>"
	  			   +"<span style='width:12%'>"+vendorJson[i].contact+"</span>"
	  			   +"<span style='width:22%'>"+vendorJson[i].del+"</span>"
	  			   +"</li>";
    }
	  $("#right-one-list").html(html);
	  var doscroll = function(){
      var $parent = $('.js-slide-list');
      var $first = $parent.find('li:first');
      var height = $first.height();
      $first.animate({
     	//切换时动画持续时间
         marginTop: -height + 'px'
         },2000, function() {
         $first.css('marginTop', 0).appendTo($parent);
      });    
	  };
	 //切换中动画间隔时间
	 setInterval(function(){doscroll()},15000);
	  }
})
})



/*
求购信息
数据滚动
*/
$(document).ready(function() {
$.ajax({
  url:urlmose+'/index.php/index/Picture/buy',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
	  // alert(vendorJson[0].id);

    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><span style='width:16%;'>"+vendorJson[i].drug+"</span>"
	  			   +"<span style='width:10%'>"+vendorJson[i].size+"</span>"
	  			   +"<span style='width:16%'>"+vendorJson[i].place+"</span>"
	  			   +"<span style='width:12%'>"+vendorJson[i].number+"</span>"
	  			   +"<span style='width:10%'>"+vendorJson[i].price+"</span>"
	  			   +"<span style='width:12%'>"+vendorJson[i].contact+"</span>"
	  			   +"<span style='width:22%'>"+vendorJson[i].del+"</span>"
	  			   +"</li>";
    }
	  $("#right-two-list").html(html);
	  	 var doscrollt = function(){
	     var $parentw = $('.rs-slide-list');
	     var $firstw = $parentw.find('li:first');
	     var heightw = $firstw.height();
	     $firstw.animate({
	     	//切换时动画时间
	         marginTop: -heightw + 'px'
	         }, 2000, function() {
	         $firstw.css('marginTop', 0).appendTo($parentw);
		     });    
		};
		//切换后间隔时间
		setInterval(function(){doscrollt()},15000);
	}
})
})




/*
优秀产品展示
图片横向滚动
 */
/*优秀企业*/
$(document).ready(function() {
$.ajax({
  url:urlmose+'/index.php/index/Picture/excellent',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><a href='#'><img src='"+vendorJson[i]+"' width='67' height='51'/></a></li>";
    }
    $("#scroll-ron").html(html);
    var rtoid = function(rtole) {          
	  return document.getElementById(rtole);       
	 },
	 rtoc = rtoid("right-th-to");
	 if(rtoc) {
	   var rtoul = rtoid("scroll-ron"),
		   rtolis = rtoul.getElementsByTagName("li"),
		   rtotimeCount = rtolis.length,
		   rtowidth = rtolis[0].offsetWidth, //获得每个img容器的宽度
		   marquee = function() {
			   rtoc.scrollLeft += 2;
			   if(rtoc.scrollLeft % rtowidth <= 1){  //当 c.scrollLeft 和 width 相等时，把第一个img追加到最后面
				   rtoul.appendChild(rtoul.getElementsByTagName("li")[0]);
				   rtoc.scrollLeft = 0;
			   };
		   },
	       speed = 70; //数值越大越慢
	       rtoul.style.width = rtowidth*rtotimeCount + "px"; //加载完后设置容器长度      
	       var rtotimer = setInterval(marquee, speed);
	   };
  },
  error:function(data){

  }
});

})

/*优秀产品*/
$(document).ready(function() {
$.ajax({
  url:urlmose+'/index.php/index/Picture/quality',
  type:'get',
  dataType:'json',
  data:{},
  async:false,
  success:function(datas){
  	var vendorJson = eval(datas.date);
  	var html ="";
    for(var i=0; i<vendorJson.length; i++)
    {
	  html += "<li><a href='#'><img src='"+vendorJson[i]+"' width='67' height='51'/></a></li>";
    }
    $("#scroll-rtw").html(html);
    var rtwid = function(rtwel) {          
	 return document.getElementById(rtwel);       
	},
	 rtwc = rtwid("right-th-tw");
	 if(rtwc) {
	   var rtwul = rtwid("scroll-rtw"),
		   rtwlis = rtwul.getElementsByTagName("li"),
		   rtwtimeCount = rtwlis.length,
		   rtwwidth = rtwlis[0].offsetWidth, //获得每个img容器的宽度
		   marquee = function() {
			   rtwc.scrollLeft += 2;
			   if(rtwc.scrollLeft % rtwwidth <= 1){  //当 c.scrollLeft 和 width 相等时，把第一个img追加到最后面
				   rtwul.appendChild(rtwul.getElementsByTagName("li")[0]);
				   rtwc.scrollLeft = 0;
			   };
		   },
	       speed = 70; //数值越大越慢
	       rtwul.style.width = rtwwidth*rtwtimeCount + "px"; //加载完后设置容器长度    
	       var rtwimer = setInterval(marquee, speed);
	   };
  },
  error:function(data){

  }
});

})
