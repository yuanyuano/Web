$('#six *').click(function() {
    $.sendConfirm({
      title: '请您对该菜品进行评价',
      content: '<div id="addIpBox">' + '<div class="frm-item">' + '<div class="frm-label"><span class="requireIcon">*</span> 评价等级（1-5）:</div>' + '<input type="text" class="frm-input" name="ip" placeholder="请填写1-5的数字">' + '<div class="msg-box j_msgIp hide"></div>' + '</div>' + '<div class="frm-item">' + '<div class="frm-label"><span class="requireIcon">*</span> 给该菜品提出意见:</div>' + '<input type="text" class="frm-input" name="desc" placeholder="最多25个汉字">' + '<div class="msg-box j_msgDesc hide"></div>' + '</div>' + '<div class="frm-item">' + '<div class="frm-label"><span class="requireIcon">*</span> 给本食堂评价:</div>' + '<input type="text" class="frm-input" name="operator" placeholder="最多30个汉字">' + '<div class="msg-box j_msgOperator hide"></div>' + '</div>' + '</div>',
      button: {
        confirm: '确认',
        cancel: '取消'
      },
      width: 260,
      onBeforeConfirm: function() {
        // onBeforeConfirm返回false，将阻止onConfirm的执行
        $.sendMsg('评价成功，感谢您的建议', 3000, function() {
      console.log('sendMsg closed');
   
  });
        return false;
      },
      onConfirm: function() {
          $.sendMsg('评价成功，感谢您的建议', 3000, function() {
      console.log('sendMsg closed');
   
  });
      },
      onCancel: function() {
          $.sendMsg('抱歉亲，这次评价不成功哦。', 3000, function() {
      console.log('sendMsg closed');
   
  });
      },
      onClose: function() {
          $.sendMsg('抱歉亲，这次评价不成功哦。', 3000, function() {
      console.log('sendMsg closed');
   
  });
      }
    });
  });
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
              }
      )
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
  $('#order2').click(function() {
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
          
    $.sendMsg('点菜成功,菜品已加入购物车！', 3000, function() {
    console.log('sendMsg closed');
    console.log('sendMsg closed');
      var span = $('#second').html(); 
      
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
              }
      )
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
  $('#order3').click(function() {
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
          
    $.sendMsg('点菜成功,菜品已加入购物车！', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#third').html(); 
      
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
              }
      )
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
  $('#order4').click(function() {
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
          
    $.sendMsg('点菜成功,菜品已加入购物车！', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#fourth').html(); 
      
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
              }
      )
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
  $('#order5').click(function() {
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
          
    $.sendMsg('点菜成功,菜品已加入购物车！', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#fifth').html(); 
      
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
              }
      )
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
  $('#order6').click(function() {
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
      var span = $('#sixth').html(); 
      
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
              }
      )
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
  $('#order7').click(function() {
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
          
    $.sendMsg('点菜成功,菜品已加入购物车！', 3000, function() {
    console.log('sendMsg closed');
    console.log('sendMsg closed');
      var span = $('#seventh').html(); 
      
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
              }
      )
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
  $('#order8').click(function() {
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
          
    $.sendMsg('点菜成功,菜品已加入购物车！', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#eighth').html(); 
      
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
              }
      )
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
  $('#order9').click(function() {
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
          
    $.sendMsg('点菜成功,菜品已加入购物车！', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#ninth').html(); 
      
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
              }
      )
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
  $('#order10').click(function() {
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
          
    $.sendMsg('点菜成功,菜品已加入购物车！', 3000, function() {
      console.log('sendMsg closed');
      var span = $('#tenth').html(); 
      
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
              }
      )
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