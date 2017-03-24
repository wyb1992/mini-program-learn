var app = getApp();
var util = require('../../utils/util.js')
Page({
    data: {
        windowHeight: null,
        markers: [],
        includePoints: [],
        showModalStatus: false,
        followList: [],
        companyInfo: {},
        stage: {
            前期: '../../image/map/prophase.png',
            设计: '../../image/map/design.png',
            拆改: '../../image/map/demolition.png',
            水电: '../../image/map/hydropower.png',
            泥木: '../../image/map/mud.png',
            油漆: '../../image/map/paint.png',
            安装: '../../image/map/installation.png',
            软装: '../../image/map/furniture.png',
            入住: '../../image/map/checkin.png'
        },
        stageLight: {
            前期: '../../image/map/prophase-light.png',
            设计: '../../image/map/design-light.png',
            拆改: '../../image/map/demolition-light.png',
            水电: '../../image/map/hydropower-light.png',
            泥木: '../../image/map/mud-light.png',
            油漆: '../../image/map/paint-light.png',
            安装: '../../image/map/installation-light.png',
            软装: '../../image/map/furniture-light.png',
            入住: '../../image/map/checkin-light.png'
        }
    },
    onLoad(option) {
        const system = wx.getSystemInfoSync()
        this.setData({
            windowHeight: system.windowHeight - 110,
            shortHeight: system.windowHeight - 190,
            longitude: app.globalData.longitude,
            latitude: app.globalData.latitude,
        });
        var data = {
            // companyId: option.companyId,
            companyId: 2516
        }
        util.doGetHttp(app.globalData.baseUrl + 'miniProgram/getCompanysProjectList.do', data, this.processCompanyProject)
        util.doGetHttp(app.globalData.baseUrl + 'getMyCompanyDetail.do', data, this.processCompanyInfo)
        util.doGetHttp(app.globalData.baseUrl + 'getCompanysFollowList.do', data, this.processFollowList)
    },
    processCompanyProject: function (data) {
        var array = [];
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var detail = {
                iconPath: this.data.stage[obj['stage']],
                width: 36,
                height: 45,
                stage: obj['stage'],
                id: obj['projectId'],
                latitude: obj['latitude'],
                longitude: obj['longitude'],
            }
            array.push(detail)
        }
        this.setData({
            markers: array,
            includePoints: array
        })
    },
    processCompanyInfo: function (data) {
        this.setData({
            companyInfo: data
        })
    },
    processFollowList: function (data) {
        this.setData({
            followList: data
        })
    },
    showModal: function (option) {
        var self = this;
        var data = {
            projectId: option.markerId
        }
        // 更换所选marker的icon
        var markers = this.data.markers;
        for (var i = 0; i < markers.length; i++) {
            if (option.markerId == markers[i].id) {
                markers[i].iconPath = this.data.stageLight[markers[i].stage]
            } else {
                markers[i].iconPath = this.data.stage[markers[i].stage]
            }
        }
        util.doGetHttp(app.globalData.baseUrl + 'queryProjectDetail.do', data, this.processProjectInfo)
        this.setData({
            markers: markers
        })
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(245).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true,
            windowHeight: self.data.shortHeight,
            projectId: option.markerId
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation
            })
        }.bind(this), 200)
    },
    processProjectInfo: function (data) {
        this.setData({
            projectInfo: data
        })
    },
    hideModal: function () {
        const system = wx.getSystemInfoSync()
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(245).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: false,
            windowHeight: system.windowHeight
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),

            })
        }.bind(this), 200)
    },
    gotoDetail: function () {
        var self = this;
        wx.navigateTo({
            url: '../project/detail/detail?projectId=' + self.data.projectId
        })
    },
    gotoReservation: function () {
        wx.navigateTo({
            url: '../reservation/reservation?companyInfo=' + JSON.stringify(this.data.companyInfo)
        })
    }
})
