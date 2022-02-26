import React, { useState } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import './App.css';
import axios from "axios";

function App() {
  const [recordState, setRecordState] = useState(null) ;

  const stopRecording = () => {
      setRecordState(RecordState.STOP);
  }

  const startRecording = () => {
    setRecordState(RecordState.START);
  }
  const onStop = async(audioData) => {
    console.log('audioData', audioData)
    var wavefilefromblob = new File([audioData.blob], 'filename.wav');
    const dt = new FormData();
    dt.append('audio',wavefilefromblob)
   const {data} = await  axios.post("https://rw-proxy.herokuapp.com/https://mbaza.dev.cndp.org.rw/deepspeech/api/api/v1/stt/http",dt);
   console.log('Data from API',data);
  }

  



  return (
    <div className="App">
      <header className="App-header">
        <AudioReactRecorder state={recordState} onStop={onStop} />
        <button onClick={startRecording}>Start</button>
        <button onClick={stopRecording}>Stop</button>
      </header>
    </div>
  );
}

export default App;
