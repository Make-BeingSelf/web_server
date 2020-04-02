const request = require("request");

//https://api.darksky.net/forecast/f870e8b9ee74742c8dcde6f7fc5d62e2/37.8267,-122.4233
const forecast = (latitude, longitude, callback) => {
    const url =
        "https://api.darksky.net/forecast/f870e8b9ee74742c8dcde6f7fc5d62e2/" + latitude + ',' + longitude

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) { //callback(에러종류, 데이터종류) 받지 않을 값은 undefined처리를 해준다.
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                Info: `It's currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} chance of rain`
            })
        }
    })
}

module.exports = forecast


// request({
//     url: url,
//     json: true
// }, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to weather service");
//     } else if (response.body.error) {
//         console.log("Unable to find location");
//     } else {
//         data2 = response.body.currently;
//         console.log(
//             `${response.body.daily.data[0].summary}\nIt's currently ${data2.temperature} degrees out.\nThere is a ${data2.precipProbability} chance of rain`
//         );
//     }
// });
// request(하고 싶은 것의 개요(제공정보, url), 함수(정보에 대한 처리)+ 오류처리)