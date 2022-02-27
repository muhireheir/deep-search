import React, { useState } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import './App.css';
import axios from "axios";
import Recording from './components/Recording';
import Searching from './components/Searching';
import Results from './components/Results';
import TextToSpeech from './components/TextToSpeech';
import matchContent from './processing';



function App() {
  const [data, setData] = useState([]);
  const [recordState, setRecordState] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const[playSound,setPlaySound] = useState(false);



  const stopRecording = () => {
    setRecordState(RecordState.STOP);
  }

  (()=> {
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then( stream => {
        window.localStream = stream;
        window.localAudio.srcObject = stream;
        window.localAudio.autoplay = true;
    }).catch( err => {
        console.log("u got an error:" + err)
    });
  })()


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
    const { data } = await axios.post("http://localhost:5000/playSentence", dt);
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
          <TextToSpeech data={data} canPlay={playSound} setCanPlay={(f)=>setPlaySound(f)} />
        </div>
        <div className="controls">
          <div className='textSearch'>
         <input type='text' placeholder='Andika hano..' value={data.message}/>
         <i className="fa  fa-search icon"></i>
          </div>
          {!isRecording && !isSearching && (<i onClick={startCounter}
            className="fa fa-microphone icon"></i>)}
         {isRecording &&  ( <i onClick={stopCounter}
            className="recording fa  fa-stop icon"></i>)}
            <i className='fa fa-play' onClick={()=>setPlaySound(true)}>Soma</i>
        </div>
      </main>
    </div>
  );
}

export default App;
