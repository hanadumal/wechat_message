var axios = require('axios')

const superagent = require('superagent');

async function sendMessage(data) {

    const resp = await superagent.get('https://api.tianapi.com/saylove/index?key=e2f68a901a101fb974a9f3c8e9a5d3e6').set('Content-Type', 'application/json');
    const content = resp.body.newslist[0].content;
    data.data.txt.value = content;

    s = new Date(2016, 4, 6);
    e = new Date()
    day_last = parseInt((e - s) / (24 * 3600 * 1000));
    data.data.loveDate.value = day_last;

    const temp = await superagent
        .get('http://api.tianapi.com/tianqi/index?key=e2f68a901a101fb974a9f3c8e9a5d3e6&city=%E5%8C%97%E4%BA%AC&type=1')
        .set('Content-Type', 'application/json');
    low_temp = temp.body.newslist[0].lowest;
    high_temp = temp.body.newslist[0].highest;
    tips = temp.body.newslist[0].tips;
    today_date = temp.body.newslist[0].date;
    today_week = temp.body.newslist[0].week;

    data.data.nowDate.value = "今天是" + today_date + " " + today_week;
    data.data.low.value = low_temp;
    data.data.high.value = high_temp;
    console.log(data)
    return axios.post(
        'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' +
        data.access_token,
        {
            touser: data.touser,
            template_id: data.template_id,
            data: data.data || {},
        }
    )
}

module.exports = sendMessage
