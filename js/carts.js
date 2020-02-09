/**
 * Created by Administrator on 2017/5/24.
 */

$(function () {

    //全局的checkbox选中和未选中的样式
    var $allCheckbox = $('input[type="checkbox"]'),$sonCheckBox = $('.son_check');                 //每个商铺下的商品的checkbox
        $sonCheckBox.click(function () {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('mark');
            totalMoney();
        } else {
            $(this).next('label').removeClass('mark')
            totalMoney();
        }
    });
    
    console.log(1)

    //=================================================商品数量==============================================
    var $plus = $('.plus'),
        $reduce = $('.reduce'),
        $all_sum = $('.sum');
    $plus.click(function () {
        var $inputVal = $(this).prev('input'),
            $count = parseInt($inputVal.val())+1,
            $obj = $(this).parents('.amount_box').find('.reduce'),
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //单价
            $priceTotal = $count*parseInt($price.substring(1));
        $inputVal.val($count);
        $priceTotalObj.html('￥'+$priceTotal);
        if($inputVal.val()>1 && $obj.hasClass('reSty')){
            $obj.removeClass('reSty');
        }
        totalMoney();
    });

    $reduce.click(function () {
        var $inputVal = $(this).next('input'),
            $count = parseInt($inputVal.val())-1,
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //单价
            $priceTotal = $count*parseInt($price.substring(1));
        if($inputVal.val()>1){
            $inputVal.val($count);
            $priceTotalObj.html('￥'+$priceTotal);
        }
        if($inputVal.val()==1 && !$(this).hasClass('reSty')){
            $(this).addClass('reSty');
        }
        totalMoney();
    });

    $all_sum.keyup(function () {
        var $count = 0,
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //单价
            $priceTotal = 0;
        if($(this).val()==''){
            $(this).val('1');
        }
        $(this).val($(this).val().replace(/\D|^0/g,''));
        $count = $(this).val();
        $priceTotal = $count*parseInt($price.substring(1));
        $(this).attr('value',$count);
        $priceTotalObj.html('￥'+$priceTotal);
        totalMoney();
    })
    $('.calBtn').click(function(){
       
        $.sendConfirm({
            withCenter: true,
            title: '点餐交易确认',
            msg: '您确定要提交订单吗？',
            button: {
              confirm: '确认',
              cancel: '取消',
              cancelFirst: true
            },
            onConfirm: function() {
                
          $.sendMsg('点菜成功,祝您用餐愉快！', 3000, function() {
            // 第一种
            var db = openDatabase('dishes', '1.0', '点餐数据库', 30*1024*1024);
           
            $(".order_lists").remove();
            $('.calBtn a').removeClass('btn_sty');
            var total_money=0;
            var total_count=0;
            $('.total_text').html('￥'+total_money);
            $('.piece_num').html(total_count);
            
    
            Deletetable();
            
            
            function Deletetable() {
                db.transaction(function(tx) {
                    //function showAllData() {
                        //db.transaction(function(tx) {
                            // tx.executeSql("CREATE TABLE IF NOT EXISTS MsgData(name TEXT,message TEXT,time INTEGER)", []);
                            tx.executeSql("SELECT * FROM MsgDate", [], function(tx, rs) {
                            tx.executeSql("CREATE TABLE IF NOT EXISTS Dingdan(picname TEXT,dishname TEXT,dishdisc TEXT,disprice TEXT,dishnum TEXT)", []);
                                for(var i = 0; i < rs.rows.length; i++) {
                                    tx.executeSql("INSERT INTO Dingdan VALUES(?,?,?,?,?)", [rs.rows.item(i).picname,rs.rows.item(i).dishname,rs.rows.item(i).dishdisc,rs.rows.item(i).disprice,rs.rows.item(i).num]);
                                }

                            })
                       // })
                   // }
                    // tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picname TEXT,dishname TEXT,dishdisc TEXT,disprice TEXT,dishnum TEXT)", []);
                    tx.executeSql("drop table MsgDate", [],function(tx, rs) {
                        
                       console.log("delete success!")
                    
                    })
                    // 
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
   
        
    })
    

    //======================================移除商品========================================

    var $order_lists = null;
    var $order_content = '';
    var namer;
    $('.delBtn').click(function () {
        $order_lists = $(this).parents('.order_lists');
        $order_content = $order_lists.parents('.order_content');
        namer= $(this).parents('.order_lists').find('.list_text').html();
        name=namer.split(">")[1].split("<")[0]
        console.log(name.length)
        
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
        $('.my_model').fadeOut(300);
    }
    //确定按钮，移除商品
    $('.dialog-sure').click(function () {
        $order_lists.remove();
        if($order_content.html().trim() == null || $order_content.html().trim().length == 0){
            $order_content.parents('.cartBox').remove();
            $.sendMsg('购物车里空空如也!', 3000, function() {
                console.log('sendMsg closed');
             
            });
        }
        closeM();
        $sonCheckBox = $('.son_check');
        totalMoney();
        var db = openDatabase('dishes', '1.0', '点餐数据库', 30*1024*1024);
        Deletedish();
        
        function Deletedish(datatable) {
            db.transaction(function(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS MsgDate(picname TEXT,dishname TEXT,dishdisc TEXT,disprice TEXT,dishnum TEXT)", []);
                tx.executeSql("DELETE FROM MsgDate WHERE dishname=(?)", [name], function(tx, rs) {
                    
                   console.log("delete success!")
                })
            })
        }
    })

    //======================================总计==========================================

    function totalMoney() {
        var total_money = 0;
        var total_count = 0;
        var calBtn = $('.calBtn a');
        $sonCheckBox.each(function () {
            if ($(this).is(':checked')) {
                var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
                var num =  parseInt($(this).parents('.order_lists').find('.sum').val());
                console.log(num)
                total_money += goods;
                total_count += num;
            }
        });
        $('.total_text').html('￥'+total_money);
        $('.piece_num').html(total_count);

        // console.log(total_money,total_count);

        if(total_money!=0 && total_count!=0){
            if(!calBtn.hasClass('btn_sty')){
                calBtn.addClass('btn_sty');
            }
        }else{
            if(calBtn.hasClass('btn_sty')){
                calBtn.removeClass('btn_sty');
            }
        }
    }


});