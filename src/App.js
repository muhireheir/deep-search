import React, { useState } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import './App.css';
import axios from "axios";
import Recording from './components/Recording';
import Searching from './components/Searching';
import Results from './components/Results';



function App() {
  const [data, setData] = useState([]);
  const [recordState, setRecordState] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isResult, setIsResult] = useState(false);
  

  const stopRecording = () => {
    setRecordState(RecordState.STOP);
  }

  const startRecording = () => {
    setRecordState(RecordState.START);
  }
  const onStop = async (audioData) => {
    console.log('audioData', audioData)
    var wavefilefromblob = new File([audioData.blob], 'filename.wav');
    const dt = new FormData();
    dt.append('audio', wavefilefromblob)
    setIsSearching(true);
    setIsRecording(false);
    const { data } = await axios.post("https://rw-proxy.herokuapp.com/https://mbaza.dev.cndp.org.rw/deepspeech/api/api/v1/stt/http", dt);
    console.log('Data from API', data);
    setIsSearching(false);
    setIsResult(true);
    setData(data);
  }

  const startCounter = () => {
    startRecording();
    setIsRecording(true);
    setIsSearching(false);
    setIsResult(false);
  };

  const stopCounter = () => {
    setTimeout(function () {
      stopRecording();
      setIsRecording(false);
    }, 200)

  };
  return (
    <div className="App">
      <header className="App-header">
        <AudioReactRecorder state={recordState} onStop={onStop} />
      </header>
      <main>
        <div className='header'></div>
        <div className='output'>
          {isRecording && (<Recording />)}
          {isSearching && (<Searching />)}
          {isResult && <Results data={data} />}
        </div>
        <div className="controls">
          {!isRecording && !isSearching && (<i onClick={startCounter}
            className="fa  fa-microphone icon"></i>)}
         {isRecording &&  ( <i onClick={stopCounter}
            className="recording fa  fa-stop icon"></i>)}
        </div>
      </main>
    </div>
  );
}

export default App;
