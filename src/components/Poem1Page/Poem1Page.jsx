import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Poem1Page(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const poem = useSelector((store) => store.poem);
  const word = useSelector((store) => store.word);
  const character = useSelector(
    (store) => store.character
  );
  const [localCharacter, setLocalCharacter] =
    useState("simplified");
  const params = useParams();

  const poemIDParam = params.id;
  const [heading, setHeading] = useState(
    `Poem ${poemIDParam}`
  );

  const [poemID, setPoemID] = useState(null);
  useEffect(() => {
    dispatch({
      type: "UNSET_WORD",
    });
    setPoemID(poemIDParam);
    setHeading(`Poem ${poemIDParam}`);
    dispatch({
      type: "FETCH_POEM",
      payload: Number(poemIDParam),
    });
  }, [params.id]);

  function selection() {
    if (window.getSelection)
      console.log(
        "selected:",
        window.getSelection().toString()
      );
    // dispatch to word reducer
    dispatch({
      type: "LOOKUP_WORD",
      payload: window.getSelection().toString(),
    });
  }

  return (
    <div>
      {/* onclick set local character to traditional */}
      <button
        onClick={() => {
          localCharacter === "simplified"
            ? setLocalCharacter("traditional")
            : setLocalCharacter("simplified");
          console.log(
            "character:",
            localCharacter
          );
        }}
      >
        {localCharacter === "simplified" &&
          "Switch to Traditional"}
        {localCharacter === "traditional" &&
          "Switch to Simplified"}
      </button>
      <h2>{heading}</h2>
      <div className="poem">
        {/* if poem[0] exists and character is simplified */}
        {poem[0] &&
          localCharacter === "simplified" && (
            <p onMouseUp={selection}>
              {poem[0].simplified}
            </p>
          )}
        {poem[0] &&
          localCharacter === "traditional" && (
            <p onMouseUp={selection}>
              {poem[0].traditional}
            </p>
          )}
      </div>
      <div className="word">
        <p>Word:</p>
        {word[0] && <p>{word[0].english}</p>}
        {word[0] && <p>{word[0].pinyin}</p>}
      </div>
    </div>
  );
}

export default Poem1Page;
