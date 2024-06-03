import { useState, useEffect, useRef } from "react";

const useChatLogic = ({ updateLocationData }: any) => {
  const chatContainer = useRef<any>(null);
  //   const [locationData, setLocationData] = useState<any>([]);
  const [input, setInput] = useState<string>("");
  const [chatLog, setChatLog] = useState<object[]>([
    {
      role: "system",
      content:
        "You are a travel advisor, you will suggest places to visit in a certain location, denote the location of all places of interest between # also denote the context of the location such as the city. When you mention specific names of places they must all be denoted between #. For example #boston# #denver# #tokyo# #denver art museum#",
    },
    {
      role: "assistant",
      content: "Welcome! I am your personal guide, where should we go?",
    },
  ]);

  useEffect(() => {
    const handleMutation = () => {
      const target = chatContainer.current;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    };

    if (chatContainer.current) {
      const observer = new MutationObserver(handleMutation);
      observer.observe(chatContainer.current, { childList: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [chatContainer]);

  const clearChat = () => {
    setChatLog([
      {
        role: "system",
        content:
          "You are a travel advisor, you will suggest places to visit in a certain location. When you mention specific names of places they must be denoted between #. For example #boston# #denver# #tokyo# #denver art museum#",
      },
      {
        role: "assistant",
        content: "Welcome! I am your personal guide, where should we go?",
      },
    ]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let chatLogNew = [...chatLog, { role: "user", content: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);

    // Check if locationData is already available in localStorage
    /*
    let cachedLocationData = localStorage.getItem("locationData");
    if (cachedLocationData) {
      // Use cached location data if available
      updateLocationData(JSON.parse(cachedLocationData));
      setChatLog([
        ...chatLogNew,
        { role: "assistant", content: `Using cached location data.` },
      ]);
    } else {
      */
      //
      //http://192.168.1.120:3005
      const response = await fetch("http://192.168.1.120:3005/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: chatLogNew,
        }),
      });
      const data = await response.json();
      //
      // localStorage.setItem("locationData", JSON.stringify(data.location));
      //
      updateLocationData(data.location);

      setChatLog([
        ...chatLogNew,
        { role: "assistant", content: `${data.message}` },
      ]);
    // }
  };

  return {
    chatContainer,
    // locationData,
    input,
    chatLog,
    setInput,
    clearChat,
    handleSubmit,
  };
};

export default useChatLogic;
