var app = getApp();
var util = require('../../../utils/util.js')
Page({
    data: {
        pageNo: 1,
        pageSize: 5,
        loading: true,
        true: true,
        windowHeight: null,
        isLastPage: false,
        projectId: null,
        projectDetail: {},
        followList: {},
        eventList: [],
        stage: [
            '设计',
            '拆改',
            '水电',
            '泥木',
            '油漆',
            '安装',
            '软装',
            '入住',
        ],
    },
    onLoad: function (option) {
        const system = wx.getSystemInfoSync()
        var self = this;
        this.setData({
            windowHeight: system.windowHeight,
            // projectId: option.projectId,
            projectId: 2642,
        });
        var data = {
            pl_user: "owner",
            projectId: this.data.projectId
        }
        util.doGetHttp(app.globalData.baseUrl + 'queryProjectDetail.do', data, this.processProjectData)
        var followerData = {
            pageNo: 1,
            pageSize: 100,
            projectId: this.data.projectId
        }
        util.doGetHttp(app.globalData.baseUrl + 'getProjectFollowPersonList.do', data, this.processFollowData)
        wx.request({
            url: app.globalData.baseUrl + 'latestNews.do',
            method: 'GET',
            data: {
                pageNo: 1,
                pageSize: 5,
                projectId: this.data.projectId
            },
            success: function (res) {
                self.setData({
                    eventList: res.data.eventList,
                    loading: false
                })
            }
        });
    },
    lower: function (e) {
        if (!this.data.isLastPage) {
            var pageNo = this.data.pageNo + 1;
            var data = {
                pageNo: pageNo,
                pageSize: this.data.pageSize,
                projectId: this.data.projectId
            };
            util.doGetHttp(app.globalData.baseUrl + 'latestNews.do', data, this.processMoreProjectData);
            this.setData({
                pageNo: pageNo,
            })
        }
    },
    processProjectData: function (data) {
        this.setData({
            projectDetail: data
        });
    },
    processFollowData: function (data) {
        this.setData({
            followList: data
        });
    },
    processMoreProjectData: function (data) {
        var isLastPage = data.eventList.length < this.data.pageSize ? true : false;
        if (data.eventList.length > 0) {
            var eventList = this.data.eventList.concat(data);
        }
        this.setData({
            isLastPage: isLastPage,
            eventList: eventList,
        })
    }
})