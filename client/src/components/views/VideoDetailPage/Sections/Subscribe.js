import React, { useEffect, useState } from "react";
import Axios from "axios";

function Subscribe({ userTo, userFrom }) {
  const [SubscribeNum, setSubscribeNum] = useState(0);
  const [IsSubscribed, setIsSubscribed] = useState(false);
  console.log(`first IsSubscribed: ${IsSubscribed}`);
  useEffect(() => {
    const subscribeVars = {
      userTo: userTo,
      userFrom: userFrom,
    };

    Axios.post("/api/subscribe/subscribeNumber", subscribeVars).then(
      (response) => {
        if (response.data.success) {
          setSubscribeNum(response.data.subscribeNumber);
        } else {
          alert("구독자 수의 정보를 가져오지 못했습니다.");
        }
      }
    );
    
    Axios.post("/api/subscribe/subscribed", subscribeVars).then((response) => {
      if (response.data.success) {
        setIsSubscribed(response.data.subscribed);
      } else {
        alert("구독자 수의 정보를 가져오지 못했습니다.");
      }
    });
  });
  console.log(`After useEffect IsSubscribed: ${IsSubscribed}`);
  
  const onSubscribe = () => {
    let subscribedVar = {
      userTo: userTo,
      userFrom: userFrom,
    };
    if (IsSubscribed) {
      Axios.post("/api/subscribe/unSubscribe", subscribedVar).then(
        (response) => {
          if (response.data.success) {
            //console.log('UnSubscribed Success');  
            setSubscribeNum(SubscribeNum - 1);
            setIsSubscribed(!IsSubscribed);
          } else {
            //console.log('UnSubscribed Fail');  
            alert("Unsubscirbe failed!");
          }
        }
      );
    } else {
      Axios.post("/api/subscribe/subscribe", subscribedVar).then((response) => {
        if (response.data.success) {
          //console.log('Subscribed Success'); 
          setSubscribeNum(SubscribeNum + 1);
          setIsSubscribed(!IsSubscribed);
        } else {
          //console.log('Subscribed Fail');   
          alert("Subscribe Failed!");
        }
      });
    }
  };

  return (
    <div>
        {/* 등록자와 접속자가 다른 경우 버튼 */}
      {userTo !== userFrom ? (
        <button
          style={{
            backgroundColor: `${IsSubscribed ? "#AAAAAA" : "#CC0000"}`,
            borderRadius: "4px",
            color: "white",
            padding: "10px 16px",
            fontWeight: "500",
            fontSize: "1rem",
            textTransform: "uppercase",
          }}
          onClick={onSubscribe}
        >
          {SubscribeNum} {IsSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      ) : (
        //   등록자와 접속자가 같으면 span
        <span
          style={{
            backgroundColor: "#CC0000",
            borderRadius: "4px",
            color: "white",
            padding: "10px 16px",
            fontWeight: "500",
            fontSize: "1rem",
            textTransform: "uppercase",
          }}
        >
          {SubscribeNum} Subscribed
        </span>
      )}
    </div>
  );
}

export default Subscribe;
