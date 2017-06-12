
### 采用$http发送网络请求，获取购物车数据信息
### 关于加减的数量问题，怎么把它赋值给参数实现

### 添加，减少功能以实现  ，采用了数据的双向绑定。

### 采用 forEach实现全选与全不选,注意点：采用flag标识，遍历结果问题。

##计算总金额问题：怎么让界面进来就能显示总金额
####  解决办法，在mounted中可以调用 methods中的方法，调用计算总金额的方法即可

## 过滤器注意问题
1. vue2.0没有内置过滤器，而且自定义过滤器不能是实例化调用filter是全局API 采用 Vue.filter来自定义

2. Vue.filter 要写在  new Vue()之前，否则会报 Failed to resolve filter：key的错

## 删除商品的实现
1. 点击删除时，记录要删除的元素（  this.curItem = item;）
2. 在确认删除的时候再删除 ，先找到该元素所在数组的索引，按照索引来删除
               let curIndex = this.dataList.indexOf(this.curItem);
                    this.dataList.splice(curIndex,1);
