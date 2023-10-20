import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useEffect } from "react";
import { getLanguages, translateText } from "./redux/actions/translateAction";
import Select from "react-select";
import { useState, useMemo } from "react";
import { clearAnswer } from "./redux/slices/tranlateSlice";
import { FaExchangeAlt } from "react-icons/fa";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.translateState);
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const refinedData = useMemo(() => {
    return state.languages.map((i) => ({
      value: i.code,
      label: i.name,
    }));
  }, [state.languages]);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const handleSwap = () => {
    setTargetLang(sourceLang);
    setSourceLang(targetLang);

    setText("");
    dispatch(clearAnswer());
  };

  return (
    <div id="main-page">
      <div className="container">
        <div className="head">
          <img src="/logo.png" alt="" />
          <h1>Google Translate Clone</h1>
        </div>
        <div className="upper">
          <Select
            isLoading={state.isLoading}
            value={sourceLang}
            onChange={setSourceLang}
            isDisabled={state.isLoading}
            className="select"
            options={refinedData}
          />
          <button onClick={handleSwap}>
            <FaExchangeAlt />
          </button>
          <Select
            onChange={setTargetLang}
            value={targetLang}
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            className="select"
            options={refinedData}
          />
        </div>
        {/* orta kısım */}
        <div className="center">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Please write the text you want to translate..."
          ></textarea>
          <textarea
            className={state.isTextLoading ? "loading" : ""}
            value={state.answer}
            disabled
          ></textarea>
        </div>
        {/* alt kısım */}
        <button
          onClick={() => {
            dispatch(translateText({ sourceLang, targetLang, text }));
          }}
          id="translate-btn"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;
