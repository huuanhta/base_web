import React, { useState, useRef } from "react";
import { Layout, Row, Col, Input, Form, Button, message } from "antd";
import "./demo.css";

const { Header, Content } = Layout;

const App = () => {
  const [minutes, setMinutes] = useState(0);
  const [counting, setCounting] = useState(false);
  const timerRef = useRef(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  

  const handleRun = () => {
    if (minutes > 0) {
      setCounting(true);
      setRemainingSeconds(1);
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev === minutes * 60) {
            clearInterval(timerRef.current);
            setCounting(false);
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      message.error("Vui lòng nhập một số nguyên dương" ,3);
    }
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    setCounting(false);
    setRemainingSeconds(0);
  };

  return (
    <Layout
      style={{
        width: "1510px",
        height: "1080px",
        maxHeight: "100vh",
        maxWidth: "100vw",
      }}
    >
      <Layout>
        <Header
          style={{
            fontSize: 24,
            fontWeight: 800,
            padding: 0,
            height: "130px",
            display: "flex",
            backgroundColor: "white",
            justifyContent: "center",
          }}
        >
          <div style={{ marginTop: 60 }}>Demo</div>
        </Header>
        <Content
          style={{
            padding: 24,
            height: "60vh",
            background: "#ffffff",
            overflow: "initial",
          }}
        >
          <Row gutter={[24, 24]}>
            <Col
              span={12}
              style={{
                // backgroundColor:"black",

                display: "flex",
                justifyContent: "flex-end",
                height: "20vh",
              }}
            >
              <Form.Item
                style={{fontSize:20}}
                label="Nhập số phút"
                name="minutes"
                rules={[{  message: "Please input minutes!" }]}
              >
                <Input
                  type="number"
                  onChange={(e) => setMinutes(parseInt(e.target.value))}
                />
              </Form.Item>
            </Col>
            <Col
              span={12}
              style={{
                // backgroundColor:"red",
                display: "flex",
                justifyContent: "flex-start",
                height: "20vh",
              }}
            >
              <p style={{marginTop:0,fontSize:20}}>Remaining time: {remainingSeconds} seconds</p>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col
              span={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                height: "20vh",
              }}
            >
              <Button style={{color:'green', width:80 , height:40, fontSize:20}} onClick={handleRun} disabled={counting}>
                Run
              </Button>
              
            </Col>
            <Col
              span={12}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                height: "20vh",
              }}
            > <Button style={{color:'red', width:80,height:40, fontSize:20}} onClick={handleStop} disabled={!counting}>
            Stop
          </Button>{" "}</Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
