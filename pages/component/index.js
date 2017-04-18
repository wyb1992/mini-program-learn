Page({
    data: {
        list: [{
            id: 'view',
            name: '视图容器',
            open: false,
            pages: ['view', 'scroll-view', 'swiper']
        },
        {
            id: 'content',
            name: '基础内容',
            open: false,
            pages: ['icon', 'text', 'progress']
        }
        ]
    },
    toggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
    }
})