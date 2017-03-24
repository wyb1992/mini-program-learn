function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function showLoading() {
    wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000,
        mask: true
    })
}

function hideLoading() {
    wx.hideToast();
}

function showModal(title, content, showCancel) {
    wx.showModal({
        title: title,
        content: content,
        showCancel: showCancel,
        success: function (res) {
            if (res.confirm) {
            }
        }
    });
}

function doPostHttp(url, data) {
    wx.request({
        url: url,
        method: 'POST',
        header: {
            "Content-Type": "json"
        },
        data: data,
        success: function (res) {

        },
        fail: function (error) {
            console.log(error)
        }
    });
}

function doGetHttp(url, data, callBack) {
    wx.request({
        url: url,
        method: 'GET',
        header: {
            "Content-Type": "json"
        },
        data: data,
        success: function (res) {
            callBack(res.data);
        },
        fail: function (error) {
            console.log(error)
        }
    });
}

module.exports = {
    formatTime: formatTime,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showModal: showModal,
    doGetHttp: doGetHttp,
    doPostHttp: doPostHttp
}