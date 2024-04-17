import React, { useState, useRef, useEffect } from "react";
import { Layout, Row, Col, Input, Form, Button, message } from "antd";
import axios from "axios"; 
import "./demo.css";

const { Header, Content } = Layout;

const App = () => {
  const [minutes, setMinutes] = useState(0);
  const [counting, setCounting] = useState(false);
  const timerRef = useRef(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [stt, setStt] = useState(false);
  const [loading, setLoading] = useState(false);

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
      axios.post("http://192.168.1.140:5000/api/run_motor", { run: true })
        .then(response => console.log(response))
        .catch(error => console.error(error));
    } else {
      message.error("Vui lòng nhập một số nguyên dương", 3);
    }
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    setCounting(false);
    setRemainingSeconds(0);
    axios.post("http://192.168.1.140:5000/api/run_motor", { run: false })
    .then(response => console.log(response))
    .catch(error => console.error(error));
  };

  const getStt = () => {
    fetch('http://192.168.1.140:5000/api/get_status_motor')
      .then(response => response.json())
      .then(data => {
        setStt(data.status_motor);
      })
      .catch(err => {
        console.error('Error fetching status:', err);
      });
  };

  useEffect(() => {
    getStt();
  }, []);

  const changeStt = () => {
    setLoading(true);
    axios.post('http://192.168.1.140:5000/api/active_motor', {
      run: !stt
    })
    .then(response => {
      setStt(!stt);
      getStt(); 
    })
    .catch(err => {
      console.error('Error changing status:', err);
    })
    .finally(() => {
      setLoading(false);
    });
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
                style={{ fontSize: 20 }}
                label="Nhập số phút"
                name="minutes"
                rules={[{ message: "Please input minutes!" }]}
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
              <p style={{ marginTop: 0, fontSize: 20 }}>Remaining time: {remainingSeconds} seconds</p>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>

            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                height: "20vh",
              }}
            >
              <Button loading={loading} style={{ color: 'green', width: 160, height: 40, fontSize: 20 }} onClick={changeStt} disabled={counting}>
                {!stt ? 'Active motor' : 'Inactive motor'}
              </Button>

            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                height: "20vh",
              }}
            >
              <Button disabled={!stt || counting} style={{ color: 'green', width: 80, height: 40, fontSize: 20 }} onClick={handleRun}>
                Run
              </Button>

            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                height: "20vh",
              }}
            > <Button style={{ color: 'red', width: 80, height: 40, fontSize: 20 }} onClick={handleStop} disabled={!counting}>
                Stop
              </Button>{" "}</Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
