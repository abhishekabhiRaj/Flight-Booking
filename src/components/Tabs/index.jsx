import React, { useState, useEffect, useRef } from "react";
import "./index.css";

function Tabs({ tabs = ["One Way Trip", "Round Trip"], active, handleTab }) {
  const tabRefs = {
    one: useRef(null),
    round: useRef(null),
  };
  let [tab1, tab2] = tabs;
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (tabRefs[active]?.current) {
      const tab = tabRefs[active].current;
      setLineStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
      });
    }
  }, [active]);

  return (
    <div className="tabs">
      <button
        ref={tabRefs.one}
        className={active === "one" ? "tab-active" : ""}
        onClick={() => handleTab("one")}
      >
        {tab1}
      </button>
      <button
        ref={tabRefs.round}
        className={active === "round" ? "tab-active" : ""}
        onClick={() => handleTab("round")}
      >
        {tab2}
      </button>

      {/* Animated Sliding Line */}
      <div className="tab-active-line" style={lineStyle}></div>
    </div>
  );
}

function TabsWithPadding({
  tabs = ["One Way Trip", "Round Trip"],
  active,
  handleTab,
}) {
  const tabRefs = {
    one: useRef(null),
    round: useRef(null),
  };
  let [tab1, tab2] = tabs;
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (tabRefs[active]?.current) {
      const tab = tabRefs[active].current;
      setLineStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
      });
    }
  }, [active]);

  return (
    <div className="tabs">
      <button
        style={{ padding: "0px 28px" }}
        ref={tabRefs.one}
        className={active === "one" ? "tab-active" : ""}
        onClick={() => handleTab("one")}
      >
        {tab1}
      </button>
      <button
        style={{ padding: "0px 28px" }}
        ref={tabRefs.round}
        className={active === "round" ? "tab-active" : ""}
        onClick={() => handleTab("round")}
      >
        {tab2}
      </button>

      {/* Animated Sliding Line */}
      <div className="tab-active-line-200px" style={lineStyle}></div>
    </div>
  );
}

function TabsWithCustom({ tabs, active, handleTab }) {
  const tabRefs = {
    all: useRef(null),
    adventure: useRef(null),
    travel: useRef(null),
    budget: useRef(null),
    trending: useRef(null),
  };
  let [tab1, tab2, tab3, tab4, tab5] = tabs;
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (tabRefs[active]?.current) {
      const tab = tabRefs[active].current;
      setLineStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
      });
    }
  }, [active]);

  return (
    <div className="tabs">
      <button
        style={{ padding: "0px 28px" }}
        ref={tabRefs.all}
        className={active === "all" ? "tab-active" : ""}
        onClick={() => handleTab("all")}
      >
        {tab1}
      </button>
      <button
        style={{ padding: "0px 28px" }}
        ref={tabRefs.adventure}
        className={active === "adventure" ? "tab-active" : ""}
        onClick={() => handleTab("adventure")}
      >
        {tab2}
      </button>

      <button
        style={{ padding: "0px 28px" }}
        ref={tabRefs.travel}
        className={active === "travel" ? "tab-active" : ""}
        onClick={() => handleTab("travel")}
      >
        {tab3}
      </button>

      <button
        style={{ padding: "0px 28px" }}
        ref={tabRefs.budget}
        className={active === "budget" ? "tab-active" : ""}
        onClick={() => handleTab("budget")}
      >
        {tab4}
      </button>

      <button
        style={{ padding: "0px 28px" }}
        ref={tabRefs.trending}
        className={active === "trending" ? "tab-active" : ""}
        onClick={() => handleTab("trending")}
      >
        {tab5}
      </button>

      {/* Animated Sliding Line */}
      <div className="tab-active-line" style={lineStyle}></div>
    </div>
  );
}

export { TabsWithPadding, TabsWithCustom };

export default Tabs;
