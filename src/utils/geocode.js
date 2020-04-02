const request = require('request')

//mapbox API와 소통
const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia2Vvbndvb2tpbSIsImEiOiJjazg4a3E1aXcwOW9wM2VsdW1ocmk1a2gzIn0.yzN52HS4IwPl769Spzhblw";
    //encodeURIComponent 특수문제를 적절히 인코딩해준다.

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) { //callback(에러종류, 데이터종류) 받지 않을 값은 undefined처리를 해준다.
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}


module.exports = geocode


// Geocoding
// Address -> Lat/lang -> Weather
// The forward geocoding query type allows you to look up a single location by name and returns its geographic coordinates.

// const url1 =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia2Vvbndvb2tpbSIsImEiOiJjazg4a3E1aXcwOW9wM2VsdW1ocmk1a2gzIn0.yzN52HS4IwPl769Spzhblw";
// request({
//     url: url1,
//     json: true
// }, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to location service");
//     } else if (response.body.feature.length === 0) {
//         console.log("Unable to find address");
//     } else {
//         data1 = response.body.features[0];
//         console.log(data1.center);
//     }
// });

// 여러번 호출할 때 사용, 단순한  모든 코드와 로직을 복붙하여 실행하는 것이 아니라 호출을 통한 작동
// 여러 작동 코드를 중첩시켜 놓으면 읽기와 유지보수가 어렵다. 특히 타인이 보기에 -> 재사용이 불가능하다.