import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

import config from "./configs/config.js";
import MessageParser from "./configs/MessageParser.jsx";
import ActionProvider from "./configs/ActionProvider.jsx";

const MyComponent = () => {
  return (
    <div>
      {/* <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      /> */}
    </div>
  );
};

export default MyComponent;
