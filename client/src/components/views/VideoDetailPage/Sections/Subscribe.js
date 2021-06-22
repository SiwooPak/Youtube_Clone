import React, { useEffect, useState } from "react";
import Axios from "axios";

function Subscribe({ userTo, userFrom }) {
  const [SubscribeNum, setSubscribeNum] = useState(0);
  const [IsSubscribed, setIsSubscribed] = useState(false);
  //console.log(SubscribeNum);
  const subscribeVars = {
    userTo: userTo,
    userFrom: userFrom
  }; 

  useEffect(() => {
    
    Axios.post("/api/subscribe/subscribeNum", subscribeVars).then(
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

  
  const onSubscribe = () => {
    
    if (IsSubscribed) {
      Axios.post("/api/subscribe/unSubscribe", subscribeVars ).then(
        (response) => {
          if (response.data.success) {
            //console.log('UnSubscribed Success');  
            setSubscribeNum(SubscribeNum - 1);
            setIsSubscribed(!IsSubscribed);
            //console.log(SubscribeNum);
          } else {
            //console.log('UnSubscribed Fail');  
            alert("Unsubscirbe failed!");
          }
        }
      );
    } else {
      Axios.post("/api/subscribe/subs", subscribeVars ).then((response) => {
        if (response.data.success) {
          //console.log('Subscribed Success'); 
          setSubscribeNum(SubscribeNum + 1);
          setIsSubscribed(!IsSubscribed);
          console.log(SubscribeNum);
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
