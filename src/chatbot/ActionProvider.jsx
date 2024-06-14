import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const userID = localStorage.getItem("userID");

  const handleMessage = async (message) => {
    try {
      const requestBody = new URLSearchParams();
      requestBody.append("user_id", userID);
      requestBody.append("prompt", message);

      console.log("Request Body:", requestBody.toString());

      const response = await fetch("http://100.25.242.208:8080/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody.toString(),
      });

      console.log("Response status:", response.status);

      const contentType = response.headers.get("Content-Type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        console.log("Response text:", textResponse);
        throw new Error("Unexpected response format");
      }

      console.log("Response data:", data);

      if (response.status === 422) {
        console.error("Detail:", data.detail);
      }

      const reply = data.response;
      const imageurl = data.image;

      console.log("Reply:", reply);
      //console.log("Image:", imageurl);

      const botMessage = createChatBotMessage(reply);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));

      if (imageurl) {
        const uniqueKey = `image-widget-${Date.now()}`;
        const imgMessage = {
          type: "bot",
          message: "그래프는 다음과 같습니다.",
          widget: "imageWidget",
          widgetParams: { src: imageurl },
          id: uniqueKey,
        };

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, imgMessage],
          imageurl,
        }));
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
