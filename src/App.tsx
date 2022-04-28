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
  const [count, setcount] = useState<number>(0);
  const [selectedPaste, setSelectedPaste] = useState<entry[]>([{
    entry_id: 1,
    title_text: 'string',
    summary_text: 'string',
    time: '',
  }])

  function handleSubmit() {
    console.log("would send text");
    //gather detail of new entry
    const newEntry = {
      title: title,
      summary: summary,
    };
    //send an HTTP post request to our API server with new entry
    const url = "http://localhost:4000/pastes";
    axios
      .post(url, newEntry)
      .then(function (response) {
        console.log("axios got the response: ", response);
      })
      .catch(function (error) {
        console.log("axios got error:", error);
      });
  }
  const handlecount = () => {
    setcount(count + 1);
    setSummary("jhghf");
    setTitle("ujyht");
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/pastes/tenPastes")
      .then((response) => {
        console.log("getting all entries: ", response.data);
        const receivedtenPastes = response.data;
        console.log(receivedtenPastes);
        setTenPastes(receivedtenPastes);
      })
      .catch((err) => console.error("error when getting entries", err));
  }, [count]);
const filteredTenPastes = tenPastes.filter(filterPaste)
console.log(filteredTenPastes)
function filterPaste(item: entry){
  return item.entry_id !== selectedPaste[0].entry_id
}
  return (
    <div className="App">
      <h1>Pastebin App</h1>
      <div className="container">
        <div className="first">
          <input
            placeholder="new title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            placeholder="new paste"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
          <button
            onClick={() => {
              handleSubmit();
              handlecount();
            }}
          >
            Submit text
          </button>
        </div>
        <div className="listOfTenPastes">
          <h2>10 Most recent Pastes</h2>
          {filteredTenPastes.map((item) => (
            <div className="onePasteItem" key={item.entry_id}>
              {item.title_text}
              <hr /> {getSummary(item.summary_text)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
