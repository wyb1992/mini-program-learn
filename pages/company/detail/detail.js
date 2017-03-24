var app = getApp();
var util = require('../../../utils/util.js')
Page({
    data: {
        imgUrls: [],
        indicatorDots: true,
        autoplay: true,
        circular: true,
        interval: 5000,
        duration: 2000,
        companyInfo: {},
        countNum: 0,
        unReadNum: 0,
        countType2: {},
        countType3: {},
        countType4: {},
        functionArea: [{
            name: '微店设置',
            url: '../../../image/company/decoration-company.png',
        },{
            name: '晒工地',
            url: '../../../image/company/show-project.png'
        },{
            name: '完工项目',
            url: '../../../image/company/complete-first.png'
        },{
            name: '客户预约',
            url: '../../../image/company/appoint.png'
        },{
            name: '推广码',
            url: '../../../image/company/company-qrcode.png'
        },{
            name: '攻略',
            url: '../../../image/company/company-help.png'
        },{
            name: '工地地图',
            url: '../../../image/company/map.png',
            goto: 'toMap'
        }]

    },
    onLoad: function (option) {
        var self = this;
        var companyData = {
            pl_company: 1,
            pl_platform: 1,
            pl_user: "worker",
            companyId: app.globalData.chooseCompanyId,
            personId: 602
        };
        util.doGetHttp(app.globalData.baseUrl + 'getCompanyDetail.do', companyData, this.processData);
        // 浏览数
        wx.request({
            url: app.globalData.baseUrl + 'getPageViewCount.do',
            method: 'GET',
            data: {
                personId: 602,
                companyId: app.globalData.chooseCompanyId,
            },
            success: function (res) {
                self.setData({
                    countNum: res.data.countNum,
                    unReadNum: res.data.unReadNum,
                });
            }
        });
        // 统计栏
        var countType2 = {}
        var countType3 = {}
        var countType4 = {}
        wx.request({
            url: app.globalData.baseUrl + 'getCompanyDeStatisticsColumn.do',
            method: 'GET',
            data: {
                pl_company: 1,
                pl_platform: 1,
                pl_user: "worker",
                pl_company_id: app.globalData.chooseCompanyId
            },
            success: function (res) {
                res.data.forEach(function (data) {
                    switch (data.countType) {
                        case '2':
                            countType2 = data;
                            break;
                        case '3':
                            countType3 = data;
                            break;
                        case '4':
                            countType4 = data;
                            break;
                    }
                })
                self.setData({
                    countType2: countType2,
                    countType3: countType3,
                    countType4: countType4,
                });
            }
        });
        // 首焦图
        wx.request({
            url: app.globalData.baseUrl + 'getSongJiao.do',
            method: 'GET',
            data: {
                pl_company: 1,
                pl_platform: 1,
                pl_user: "worker",
                songType: 4
            },
            success: function (res) {
                self.setData({
                    imgUrls: res.data.songJiaoList
                });
            }
        });
    },
    processData: function (data) {
        this.setData({
            companyInfo: data
        })
    },
    toMap: function (Object) {
        wx.navigateTo({
            url: '../../map/map'
        })
    },
})