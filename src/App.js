import {io} from "socket.io-client";
import {useEffect, useState} from "react";

function App() {
  // 클라이언트와 서버 1:1 대화, 클라이언트와 클라이언트가 대화하는 법
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    // socket connecting 함수 + on event 수신 설정
    // socket connect
    // socket onevent
    if (!socket) {
      // const _socket = io(`${process.env.REACT_APP_URL}`);
      setSocket(io(`${process.env.REACT_APP_URL}`));
    }

    if (socket) {
      // connect, disconnect
      // on -> 서버로부터 해당 이벤트를 받을거야! 라는 걸 명시
      socket.on("connect", () => {
        console.log("connected"); // true
      });

      socket.on("disconnect", () => {
        console.log("disconnected"); // false
      });

      // emit -> 클라이언트에서 서버로 메시지 및 데이터를 보냄
      // socket.emit("ping", "Hello, World!");
      socket.on("pong", (data) => {
        console.log(data);
      });

      socket.on("code", (data) => {
        // console.log("서버 데이터: " + data);
        setCode(data);
      })

      return () => {
        socket.disconnect();
      };
    }

  }, [socket]);

  return (
    <>
      <button onClick={() => socket.emit("ping", "pong!")}>Ping!</button>
      <textarea id="editor" rows="10" cols="50" value={code} onChange={() => {
        socket.emit("code", document.getElementById("editor").value);
      }}/>
    </>
  );
}

export default App;
