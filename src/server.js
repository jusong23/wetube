import express from "express";

const PORT = 4002;

const app = express();

// 샌드위치

const handleHome = (req, res) => {
  return res.send("I still love you.");
};
const handleLogin = (req, res) => {
  return res.send("Login here.");
};
app.get("/", handleHome);
app.get("/login", handleLogin);

// 샌드위치

const handleListeing = () => console.log(`Server Listeing on port ${PORT}`);

app.listen(PORT, handleListeing);
// callback : 서버가 시작할 때 응답하는 함수
// 버튼 누르면 클릭되는 응답과 유사
