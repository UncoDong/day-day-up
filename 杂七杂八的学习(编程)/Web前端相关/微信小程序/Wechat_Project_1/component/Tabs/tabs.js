// component/Tabs/tabs.js
Component({
    /**
     * 组件的属性列表
     * 存放着要从父组件中接受的数据
     */
    properties: {
        //要接受的数据的名称
        aaa: {
            // type 要接受的数据类型
            type: String,
            // 默认值
            value: "这是aa"
        },
        tabs: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },


    /**
     * 1. 页面.js文件中存放事件的回调函数，放在data从层级下
     * 2. 组件.js 文件中 存放事件的回调函数，必须放在methods中
     */
    methods: {
        handleItemTap(e) {
            // 1. 获取被点击的索引
            // 2. 获取原数组
            // 3. 对数组循环，对每一个循环项目，改成flase
            // 4. 给当前点击到的，设置为激活效果
            // 获取索引
            // 5. 点击事件出发的时候
            // 触发父组件中的自定义事件，同时传递数据给 父组件
            //  this.triggerEvent("父子局自定义事件的名称",要传递的参数)
            // console.log(e.target.dataset.index);
            // 获得data中的数组
            // 以下两个等价
            const { index } = e.target.dataset;
            // 出发父组件中的自定义事件，同时传递数据
            this.triggerEvent("itemChange", { index });

            //const index = e.target.dataset.index;


            // 循环数组
            // 以下两个等价
            //let { tabs } = this.data;
            // let tabs = this.data.tabs;

            // console.log(tabs);
            // console.log(index);
            // // // [].forEach 遍历数组 遍历数组的时候，修改了v，也会导致原数组发生修改
            // tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)

            // this.setData({ tabs })
            // console.log(tabs);
        }
    }
})