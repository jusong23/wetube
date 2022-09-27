const express = require("express");
const schedule = require("node-schedule");
const Crawler = require("crawler");
const app = express();
const PORT = 3000;
const users = [
  {
    name: "송이네 잡화상점",
    age: 23,
  },
];

var STORE = [];

app.use(express.json()); // JSON parse 미들웨어 추가
// REST API 메소드
// 첫번째 인자: End Point
// 두번째 인자: 콜백함수 - 이 함수는 두개의 인자를 받는다.
// '/user'에 get 요청이 오면 아래의 콜백함수가 실행이되는 것이다.
app.get("/user", function (req, res) {
  // 첫번째 인자 req: 클라이언트에서 요청이올 때, ReqBody, ReqHeader, url 등등 그런 정보들이 모두 들어있다.
  // 두번째 인자 res: 클라이언트에 응답할 때 필요한 모든 정보들이 들어있다. 지금부터 저희가 작성할 내용 외에도 기본적으로 들어가야되는 네트워크 정보라던지 그런 것들이 모두 여기 들어있다.

  return res.send({ users: users }); // 클라이언트에 어떤 정보를 리턴해주고 싶은지를 적는 부분이다.
});

// post 메소드를 사용한다.
app.post("/user", function (req, res) {
  users.push({ name: req.body.name, age: req.body.age });

  // post 요청이 성공하면 아래를 반환한다.
  return res.send({ success: true }); // return 키워드를 붙여주는 것이 좋다.
  // 이렇게 코드 작성할리는 없겠지만
  // res.send() 코드를 중복해서 작성해놨을 경우 모든 res.send()가 호출된다.
  // 그렇게되는 것을 방지하기 위해서 return 키워드를 작성한다.
});

app.listen(PORT, function () {
  console.log("Express start on port 3000!");
  schedule.scheduleJob("0 * * * * *", function () {
    console.log("The answer to life, the universe, and everything!");
    var c = new Crawler({
      maxConnections: 10,
      // This will be called for each crawled page
      callback: function (error, res, done) {
        if (error) {
          console.log(error);
        } else {
          var $ = res.$;
          // $ is Cheerio by default
          //a lean implementation of core jQuery designed specifically for the server
          //   console.log($("title").text());

          const $bodyList = $("div.productByMall_text_over__mA2mG");

          let newsList = [];
          $bodyList.each(function (i, elem) {
            newsList[i] = $(this).find("a.productByMall_mall__SIa50").text();
          });

          //   console.log(newsList[0]);
          //   console.log(STORE);

          if (users[0].name == newsList[0]) {
            console.log(users[0].name + " 카탈로그 1위 유지 중");
          } else {
            console.log(newsList[0] + "에게");
            console.log("1위를 뺏겼다 !");
          }
        }
        done();
      },
    });

    // Queue just one URL, with default callback
    c.queue("https://search.shopping.naver.com/catalog/30275737768");
  });
});

// post로 입력받는 란 url, 스토어명 다르면 콘솔(푸시알림으로 할거임)
