import { useState } from "react";
import { BackToHome } from "../App";
function getMatchIndexes(str) {
  var toMatchLength = str.length,
    indexMatches = [],
    match,
    i = 0;
  while (str.indexOf(i - 1, i) > -1) {
    match = str.indexOf(i - 1, i) > -1;
    indexMatches.push(match);
    i = match + toMatchLength;
  }

  return indexMatches;
}
const ChallengeOne = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <BackToHome />
      <h1 className="title is-1 has-text-white">Challenge 1</h1>
      <h2 className="subtitle has-text-white">
        Given a<code>string</code> of lowercase letters in the range ascii[a-z],
        determine the <code>index</code> of the one character that can be
        <code>removed</code> to make the string a palindrome. If the word is
        already a palindrome or there is no <code>"only one index"</code>{" "}
        solution, which means that we have to remove more than one, return{" "}
        <code>-1</code>. Otherwise, return the <code>index</code>
        of the character to remove.
      </h2>
      <h1 className="title is-1 has-text-white">Example</h1>
      <h2 className="subtitle has-text-white">
        <p>aaab</p>
        <p>acxycab</p>

        <p> Output </p>
        <p>3</p>
        <p>-1</p>
      </h2>
      {/*
      
        input to write the string in
        and a button to get the answer and show it

        Note: you can show the answer as just a simple text under them
      */}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button className="purpleButton" onClick={() => getMatchIndexes(value)}>
        {" "}
        Submit{" "}
      </button>
    </>
  );
};

export default ChallengeOne;
