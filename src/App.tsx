import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSummary } from "./utils/getSummary";

export default function App(): JSX.Element {
  interface entry {
    entry_id: number;
    title_text: string;
    summary_text: string;
    time: string;
  }
  const [tenPastes, setTenPastes] = useState<entry[]>([]);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [clickedPaste, setClickedPastes] = useState<entry[]>([]);
  const [isPasteClicked, setIsPasteClicked] = useState<boolean>(false);
  const [newPaste, setNewPaste] = useState<entry[]>([]);

  function handleSubmit() {
    console.log("would send text");
    //gather detail of new entry
    const newEntry = {
      title: title,
      summary: summary,
    };
    //send an HTTP post request to our API server with new entry
    const url = "https://pastebin-soso-fola.herokuapp.com/pastes";
    axios
      .post(url, newEntry)
      .then(function (response) {
        console.log("axios got the response: ", response);
        setTitle("");
        setSummary("");
        setNewPaste(response.data);
      })
      .catch(function (error) {
        console.log("axios got error:", error);
      });
  }

  useEffect(() => {
    axios
      .get("https://pastebin-soso-fola.herokuapp.com/pastes/tenPastes")
      .then((response) => {
        console.log("getting all entries: ", response.data);
        const receivedtenPastes = response.data;
        console.log(receivedtenPastes);
        setTenPastes(receivedtenPastes);
      })
      .catch((err) => console.error("error when getting entries", err));
  }, [newPaste]);

  function handleIndividualPasteClick(id: number) {
    axios
      .get(`https://pastebin-soso-fola.herokuapp.com/pastes/${id}`)
      .then((response) => {
        console.log("getting all entries: ", response.data);
        const clickedPaste = response.data;
        console.log(clickedPaste);
        setClickedPastes(clickedPaste);
        setIsPasteClicked(true);
      }) 
      .catch((err) => console.error("error when getting entries", err));
  }

  return (
    <div className="App">
      <div className="containerOut">
        <div className="containerFirst">
          <input
            placeholder="optional: Title text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            placeholder="Paste Text here"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />

          <button disabled={!summary} onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className="listOfTenPastes">
          {isPasteClicked ? (
            <h2>Selected Paste</h2>
          ) : (
            <h2>10 Most Recent Pastes</h2>
          )}
          {isPasteClicked ? (
            <div
              className="buttonitem"
              onClick={() => setIsPasteClicked((prev) => !prev)}
            >
              {clickedPaste[0].title_text}
              <hr /> {clickedPaste[0].summary_text} <br />{" "}
              <small>{clickedPaste[0].time}</small>
            </div>
          ) : (
            tenPastes.map((item) => (
              <div
                onClick={() => handleIndividualPasteClick(item.entry_id)}
                className="onePasteItem"
                key={item.entry_id}
              >
                {item.title_text}
                <hr /> {getSummary(item.summary_text)} <br />{" "}
                <small>{item.time}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
