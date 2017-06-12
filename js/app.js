/**
 * Created by Administrator on 2017/6/11.
 */
(function () {
    Vue.filter('tomoney',function (type) {
        return '￥'+ type;
    })
    var app = new Vue({
        el:'#app',
        data:{
            isShowDel:false,    //控制蒙版的出现|隐藏
            dataList:'',        //获取的数据
            isCheck:false,       //全选
            totalPrice:0,         //总价
            curItem:'',
        },
        //请求数据，在生命周期的  mounted 阶段
        mounted:function () {
            var url = 'data/cart.json';
            this.$http.get(url).then(res=>{
                // console.log(res.data.result.productList);
                this.dataList = res.data.result.productList;
                this.allCount();
            },error=>{
                console.log(error);
            })
        },
        methods:{
            //点击 + - 的实现
            count:function (item,type) {
                if(type == true){
                    item.productQuentity++;
                }
                else {
                    if(item.productQuentity ==1){
                        item.productQuentity =1;
                        return;
                    }
                    item.productQuentity--;
                }
                this.allCount();
            },

            // 点击全选 | 取消全选
            selectAll:function (type) {
                if(type ==true){
                    this.dataList.forEach(function (item,index) {
                        //设置全部单项为选中状态
                        item.checked =true;
                    });
                    //设置自身为选中状态
                    this.isCheck= true;
                    this.allCount();
                    return ;
                }
                this.dataList.forEach(function (item,index) {
                    item.checked = false;
                });
                this.isCheck= false;
                this.allCount();
            },

            //点击单选的实现
            selected:function (index) {
                //设置自身相反
                this.dataList[index].checked = ! this.dataList[index].checked;
                let flag = true;
                 this.dataList.forEach(function (item, index) {
                 if(item.checked ==false){
                 flag = false;
                 }
                 });
                 this.isCheck = flag;
                 this.allCount();
            },
            //计算全部商品的总价
            allCount:function () {
                var total =0;
                this.dataList.forEach(function (item,index) {
                    if (item.checked ==true){
                        total += item.productPrice * item.productQuentity
                    }
                });
                this.totalPrice = total.toFixed(2);

            },
            
            //删除商品
            delItem:function (item) {
                //显示蒙版
                this.isShowDel =true;
                this.curItem = item;
                console.log(item);
            },

            //取消|确认 删除
            comfirmDel:function (flag) {
                if (flag ==true){
                    let curIndex = this.dataList.indexOf(this.curItem);
                    this.dataList.splice(curIndex,1);
                    this.allCount();
                }

                //取消蒙版
                this.isShowDel = false;
            }
        },

    });
})();