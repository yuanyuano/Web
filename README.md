# 系统简介
该 *Web点餐系统* 是为了给食堂提供下一天的菜品做参考，使用```HTML5 + CSS3 + JS(jQuery)```进行**前端开发**，数据库采用本地数据库**WebSQL**，不使用后端开发。 系统实现以下基本功能：
- 首页导航有三个：首页、我的订单、订单统计 
- 在首页中： 
  > (1) 展示当天菜品、热卖菜品、推荐菜品，显示完整的信息。 
  > (2) 实现点菜，结果显示在合适位置中，所点的菜能够取消。 
  > (3) 点菜的“提交”是将数据保存到本地，然后在“我的订单”中重现这些数据。
- 在我的订单页面中，能够从保存在本地的数据中心提取出数据并能显示，并能添加和删除。 
- 在订单统计页面中，用图表显示当天热卖前三的菜品统计结果。统计结果用不同类型的图表展示以下维度：菜品、价格、口味、食材。
# 系统设计
**系统功能结构图：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200120105757198.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5MjAxNzIyMDMwMjAyOA==,size_16,color_FFFFFF,t_70#pic_center)
# 系统实现
## 首页（当天菜品）/推荐菜品/热买菜品
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200120142531138.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5MjAxNzIyMDMwMjAyOA==,size_16,color_FFFFFF,t_70#pic_center)
### 页面布局的核心html文件
让按钮或标签实现跳转界面：嵌套```<a href=""></a>```添加超链接即可。
```html
<div>
    <div  class="nav_bg">
        <div class="wrap"> 
            <ul id="nav" class="nav clearfix">
                <li class="nLi" style="font-size: 30px;">
                    <h3 class="e"><a  href="#" style="font-size: 23px;">饿了呀</a></h3>
                </li>
                <li class="nLi">
                  <h3 class="d"><a  href="./index.html">首页</a></h3>
                </li>
                <li class="nLi ">
                  <h3 class="d"><a href="myorder.html">我的订单</a></h3>
                </li>       
                <li class="nLi ">
                  <h3 class="d"><a href="order-statistic.html">订单统计</a></h3>
                </li>
            </ul>
        </div>
    </div>
    
    <div class="left" >
          <ul class="leftborder">
              <li class="border1">
                <a href="myorder.html">
                    <img src='../images/dingdan.png' width=14 height=14 />
                    <span class="outer">  我的订单</span>
                    <br>
                    <br>
                    <span class="inner">近三个月的订单</span>      
                </a>
            </li>
            <li class="border2">
                <a href="./today.html">
                    <img src='../images/remaicaipin.png' width=14 height=14 />
                    <span class="outer">当天菜品</span>
                </a>
            </li>
            <li class="border3">
                <a href="./recommend.html">
                    <img src='../images/tuijian.png' width=14 height=14 />
                    <span class="outer">推荐菜品</span>
                </a>
            </li>
            <li class="border4clicked">
                <a href="./hot.html">
                    <img src='../images/menu.png' width=14 height=14 />
                    <span class="outer">热卖菜品</span>
                </a>
            </li>
            <li class="border5">
                    <a href="./selected.html">
                        <img src='../images/today.png' width=14 height=14 />
                        <span class="outer">已选菜品</span>    
                    </a>
            </li>              
            </ul>
    </div>
</div>
```
### 当用户点击“点餐”按钮时执行的操作，js文件
WebSQL数据库操作，后面有详细描述。
```javascript
$('#order1').click(function() {
    $.sendConfirm({
      withCenter: true,
      title: '点餐交易确认',
      msg: '您确定要点此菜品吗？',
      button: {
        confirm: '确认',
        cancel: '取消',
        cancelFirst: true
      },
      onConfirm: function() {
          
    $.sendMsg('点菜成功,菜品已加入购物车', 3000, function() {
      // 第一种
      console.log('sendMsg closed');
      var span = $('#first').html(); 
      var picname=span.split("\n")[1].split("src")[1].slice(2,8);
      var dishname=span.split("\n")[2].split(">")[1].split("<")[0].replace(/(^\s+)|(\s+$)/g,"");
      var dishdisc=span.split("\n")[3].split(">")[1].split("<")[0];
      var dishprice=span.split("\n")[4].split(">")[1].split("<")[0];
      var dishnum=span.split("\n")[5].split(">")[1].split("<")[0];
      var db = openDatabase('dishes', '1.0', '点餐数据库', 30*1024*1024);
      var msg;
      addData(picname, dishname, dishdisc,dishprice,dishnum);
      function addData(picname, dishname, dishdisc,dishprice,dishnum) {
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picname TEXT,dishname TEXT,dishdisc TEXT,disprice TEXT,dishnum TEXT)", []);
          tx.executeSql("INSERT INTO MsgDate VALUES (?,?,?,?,?)", [picname, dishname, dishdisc,dishprice,dishnum], function(tx, rs) {   
              },
              function(tx, error) {
                  alert(error.source + "::" + error.message);
              })
      })
  }
  });
      },
      onCancel: function() {  
    $.sendMsg('点菜失败', 3000, function() {
      console.log('sendMsg closed');
  });
      },
      onClose: function() {
    $.sendMsg('点菜失败', 3000, function() {
      console.log('sendMsg closed');
  });
        console.log('点击关闭！');
      }
    });
});
```
## 已选菜品
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200120142740320.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5MjAxNzIyMDMwMjAyOA==,size_16,color_FFFFFF,t_70)
### 查询数据库，获取数据显示到界面上，js文件
WebSQL数据库——**获取表单数据：**
#### _第一步：_ 
```openDatabase()```打开/创建数据库
#### _第二步：_ 
```db.transaction()```事务处理函数，它有三个参数，三个参数均为函数。第一个是事务提交函数，在这里面使用```tx.executeSql()```来执行查询任务，将对应元素读取出来。第二个参数和第三个参数分别是成功回调和失败回调函数，不是必要的，只要第一个参数也ok的。

*Q: 从数据库中读取的数据如何放到页面上？*

A: **写一个showData()函数**，作为前面说的*事务提交函数*。比如我的页面结构是：div--ul--li，那么首先我得声明一个var字符串，然后用```document.getElementById()```函数得到div对象，可以对其进行引用。再声明一个var，使用```document.createElement()```函数引用一个ul对象，最后使用```document.getElementById()```函数引用li对象，参数要写成数据库表单的内容：第几行的某个元素。这个应该对应之前在html中提前设置好的li的id，id即数据库表单的键值元素。即可对应起来。最后需要用```appendChild()```函数将他们一个一个连接起来就ok了。
```javascript
<script>
    var db = openDatabase('dishes', '1.0', '点餐数据库', 30*1024*1024);
    var datatable = document.getElementById("first");
    var dishnames=new Array();

    showAllData(datatable);
    function showData(row,datatable,i) {
        console.log(dishnames.indexOf(row.dishname));
    if(dishnames.indexOf(row.dishname)!=-1)
   {
       console.log("repeated");
   }
    else{ dishnames.push(row.dishname)
    var ul=document.createElement("ul");
    ul.className="order_lists";
    var check=document.getElementById("check"+(i+2));
    var li1 = document.getElementById(row.dishname.replace(/(^\s+)|(\s+$)/g,""));
    
    var li2= document.createElement("li");
    li2.className="list_info";
    li2.innerHTML=row.dishdisc;
    var li3= document.createElement("li");

    li3.className="list_price";
    var p1=document.createElement("p");
    p1.className="price"
    var pri=row.disprice.split("(")[0];
    p1.innerHTML='￥'+pri;
    li3.appendChild(p1);
    var li4= document.getElementById("box"+(i+1));
    var li5= document.createElement("li");
    li5.className="list_sum";
    var p2=document.createElement("p");
    p2.className="sum_price"
    p2.innerHTML='￥'+parseInt(pri);
    li5.appendChild(p2);
    var li6=document.getElementById("op"+(i+1));
    
    ul.appendChild(check);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    ul.appendChild(li6);
    datatable.appendChild(ul);
    console.log(datatable)
    }
    }
    function showAllData(datatable) {
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picname TEXT,dishname TEXT,dishdisc TEXT,disprice TEXT,dishnum TEXT)", []);
        tx.executeSql("SELECT * FROM MsgDate  ", [], function(tx, rs) {
            
            for(var i = 0; i < rs.rows.length; i++) {
                showData(rs.rows.item(i),datatable,i)
            }
        })
    })
}
</script>
```
*注意：* 在已选菜品中是在不断地读取数据库表单的数据来显示到当前页面，因此只有当表单数据清空才能让页面清空点击，所以在点击“提交"后，则需要执行删除表单*MsgData*中的数据操作。但是由于我需要在我的订单中回显提交后的数据，如果删除了表单那就没地方读取数据了，那么这里可以采取**创建一个新的数据库表单*Dingdan***，每当*提交*操作发生时，首先进行**表单备份**，即：把表单*MsgData*中的所有数据添加到新创建的表单*Dingdan*中，然后再执行删除*MsgData*表单操作，既实现了已选菜品中数据清空，又实现了我的订单中数据回显。
## 我的订单
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200120142816878.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5MjAxNzIyMDMwMjAyOA==,size_16,color_FFFFFF,t_70)
### 点击“删除”后执行删除数据库表单操作，js文件
WebSQL数据库——**删除表单数据：**

删除表单数据跟获取表单数据的步骤是一样的，只不过我这里写了一个```DeleteData()```函数来封装db.transaction()，方便其他地方直接调用DeleteData()对其进行引用。
```javascript
<script type="text/javascript">
    $('.del').click(function () {
        $order_lists = $(this).parents('.order_lists');
        $order_content = $order_lists.parents('.order_content');
        namer= $(this).parents('.order_lists').find('.food').html();
        $('.model_bg').fadeIn(300);
        $('.my_model').fadeIn(300);
});

    //关闭模态框
    $('.closeModel').click(function () {
        closeM();
    });
    $('.dialog-close').click(function () {
        closeM();
    });
    function closeM() {
        $('.model_bg').fadeOut(300);
        $('.my_model').fadeOut(300);}

    //确定按钮，移除商品
    $('.dialog-sure').click(function () {
        $order_lists.remove();
        if($order_content.html().trim() == null || $order_content.html().trim().length == 0){
            $.sendMsg('订单里空空如也!', 1000, function() {
                console.log('sendMsg closed');
            });
        }
        closeM();
       
        var db = openDatabase('dishes', '1.0', '点餐数据库', 30*1024*1024);
        Deletedish();
        function Deletedish(datatable) {
            db.transaction(function(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS Dingdan(picname TEXT,dishname TEXT,dishdisc TEXT,disprice TEXT,dishnum TEXT)", []);
                tx.executeSql("DELETE FROM Dingdan WHERE dishname=(?)", [namer], function(tx, rs) {
                   console.log("delete success!")
                })
            })
        }
    })
</script>
```

## 订单统计
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200120142830913.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5MjAxNzIyMDMwMjAyOA==,size_16,color_FFFFFF,t_70)
### 使用Chart.js图表库绘制四种统计图
#### 1. Chart.js使用：
1. 引入Chart.js库
```javascript
<script src="../js/Chart.js"></script>
```
2. 定义一张画布
```html
<div>
	<canvas id="popChart1" width="800" height="500">
</div>
```
3. 利用2d上下文传递画布的节点，实例化Chart类
```javascript
var popCanvas1 =document.getElementById("popChart1").getContext("2d"); 
var barChart = new Chart(popCanvas1, {
  type: 'bar',
  data: {
     labels: ["回锅肉", "青椒玉米", "担担面"],
     datasets: [{
       label: '订购数量',
       data: [34, 27, 40],
       backgroundColor: [
       'rgba(255, 99, 132, 0.6)',
       'rgba(54, 162, 235, 0.6)',
       'rgba(255, 206, 86, 0.6)',
       'rgba(153, 102, 255, 0.6)'
       ]
     }]
   }
});
```
#### 2. 左侧菜单栏：
定义两个div，一个放菜单栏，一个放内容。将两个div放在同一行，在css中**设置div为浮动：**
```css
.left{
	position: relative;
	float: left;
}
```
菜单栏div中用一个li来放列表，调整位置关系即可：
```css
.left li {height:40px;  position:relative;  display:block;padding:20px 0 0 120px;}
```
#### 3. 隐藏div，点击菜单栏选项后才显示：
除了第一个div，其余的样式设置为**隐藏：**
```html
<div style="display: none;">
```
利用jQuery中的函数将li和div按序匹配起来，使用条件语句，如果点击不为第一个div对应的li时，就获取当前的div索引，然后把原来的div的class属性给它，把其他同级的class属性remove掉。使用```show()```函数和```hide()```函数分别进行显示和隐藏，参数为动画的速度。可设置速度参数为“fast”，如果是使用数字参数的话，则会根据速度在隐藏和显示过程中逐渐改变div的高度、宽度、边距等。
```javascript
    $(function(){
    	$(".left li").click(
    		function(){
    			var divShow = $(".content").children("div");
    			if(!$(this).hasClass("selected")){
    				var index = $(this).index();   
    				$(this).addClass("selected");            
            $(this).siblings("li").removeClass("selected");                     
            $(divShow[index]).show("fast");
            $(divShow[index]).siblings("div").hide("fast");
          }
    		}
    	)
    })
```
*PS:* 我当时遇到一个非常莫名其妙的问题，在经过多次切换后，所有图表都变得越来越小，甚至可以变得比最初小十分之一去了，看着怪吓人的，因为我绝对没有在任何地方改变过div的大小，刚开始以为是速度参数的问题，但是我改变了fast参数之发现这个问题依然存在，而且无参数更连动画效果都没有。最后查看开发者工具，进行多次调试，观察长宽的改变情况。发现了问题所在：
> 对div的父容器设置长宽要用**百分比**才行。

*我原来用的是数值，显示是invalid的，最后把宽度设置成百分比就会发现div的大小没有再改变了。*
```html
<div class="content" style="width:50%">
```
# 总结
做Web前端感觉挺好玩的，你能很快地看到自己做出的效果，很有成就感。虽然这个过程中也遇到不少问题，但通过查阅资料和使用工具调试都得到了解决，第一次做Web前端学到不少东西，记录一下。
# 协议
本项目遵从[MIT协议](https://github.com/yuanyuano/Web/blob/master/LICENSE)
