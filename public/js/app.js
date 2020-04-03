console.log("Client side javascript file is loaded!");

//서버의 데이터를 가져오는 것 ->promise, companinion async await

// html docs에서 요소 추출하기(선택하기)
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const message_location = document.querySelector("#message_location");
const message_weather = document.querySelector("#message_weather");
//rendering하기

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault(); // event후 자동으로 refresh되는 것을 막아줌

  const location = search.value;
  message_location.textContent = "Loading...";
  //heroku로 인해 port번호가 변함으로 다음과 같이 변경이 필요함
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        message_location.textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.weather);
        message_location.textContent = data.location;
        message_weather.textContent = `Summary: ${data.weather.summary} Info: ${data.weather.Info}`;
      }
    });
  });
});
