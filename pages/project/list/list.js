var app = getApp();
var util = require('../../../utils/util.js')
Page({
    data: {
        windowHeight: 0,
        projectList: [],
        pageNo: 1,
        pageSize: 10
    },
    onLoad: function (e) {
        var self = this;
        util.showLoading();
        //获取屏幕高度
        wx.getSystemInfo({
            success: function (res) {
                self.setData({
                    windowHeight: res.windowHeight
                })
            }
        });
        wx.request({
            url: app.globalData.baseUrl + 'getWorkingProject.do',
            method: 'GET',
            data: {
                companyId: app.globalData.chooseCompanyId,
                pageNo: self.data.pageNo,
                pageSize: self.data.pageSize
            },
            success: function (data) {
                self.setData({
                    projectList: data.data.projectList
                });
                util.hideLoading();
            }
        });
    },
    lower: function (e) {
        var self = this;
        var start = 0;
        start += 1;
        wx.request({
            url: app.globalData.baseUrl + 'getWorkingProject.do',
            method: 'GET',
            data: {
                companyId: app.globalData.chooseCompanyId,
                pageNo: self.data.pageNo + 1,
                pageSize: self.data.pageSize
            },
            success: function (data) {
                var projectList = self.data.projectList.concat(data.data.projectList)
                self.setData({
                    projectList: projectList,
                    pageNo: self.data.pageNo + 1
                })
            }
        });
    },
    navigate: function (Object) {
        wx.navigateTo({
            url: '../detail/detail?projectId=' + Object.currentTarget.dataset.projectId
        })
    },
    previewImage: function (Object) {
        wx.previewImage({
            current: Object.currentTarget.dataset.url,
            urls: [Object.currentTarget.dataset.url,
            Object.currentTarget.dataset.url,
            Object.currentTarget.dataset.url]
        })
    },

})