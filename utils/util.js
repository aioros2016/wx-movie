const APP = getApp()

export function score2star(star) {
  let arr = []
  let num = star + ''
  let num2 = parseInt(num.substring(0, 1))
  arr.push(num2)
  arr.push(5 - num2)
  return arr
}

export function getData(url, callBack, data) {
    wx.request({
        url: APP.globalData.doubanHost + url,
        data: data,
        method: 'GET',
        header: {
            "Content-Type": "json"
        },
        success(res) {
            callBack(res.data)
        },
        fail(err) {
            console.log(err)
        },
        complete() {}
    })
}

export function toast (title = '正在加载', icon = 'success') {
    return wx.showToast({
        title: title,
        icon: icon
    })
}

export function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
}

export function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}