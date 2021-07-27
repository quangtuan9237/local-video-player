import React, { useState } from 'react';
import Plyr from 'plyr-react';
import VTTConverter from 'srt-webvtt';

import 'plyr-react/dist/plyr.css';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [trackUrl, setTrackUrl] = useState('');

  const videoSrc: Plyr.SourceInfo = {
    type: 'video',
    sources: [
      {
        src: videoUrl,
        provider: 'html5',
      },
    ],
    tracks: [
      {
        src: trackUrl,
        kind: 'subtitles',
        label: 'Default',
        default: true,
      },
    ],
  };

  const videoOptions: Plyr.Options = {
    storage: {
      enabled: true,
      key: 'plyr',
    },
    captions: {
      active: true,
    },
  };

  function handleVideoChange(event: any) {
    setVideoUrl(URL.createObjectURL(event.target.files[0]));
  }

  function handleSubtitleChange(event: any) {
    const vttConverter = new VTTConverter(event.target.files[0]); // the constructor accepts a parameer of SRT subtitle blob/file object

    vttConverter
      .getURL()
      .then(function (url) {
        // setTrackUrl(URL.createObjectURL());
        setTrackUrl(url);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  return (
    <div>
      <h1 className="text-center">Tun Video Player</h1>

      {videoUrl && (
        <div className="video-player text-center">
          <Plyr source={videoSrc} options={videoOptions} />
        </div>
      )}
      <div className="text-center">
        <input
          className="video-file-input"
          accept="video/*"
          onChange={handleVideoChange}
          id="audio_file"
          placeholder="Chose a video"
          type="file"
        />
        <input
          className="subtitle-file-input"
          accept=".vtt,.srt"
          onChange={handleSubtitleChange}
          id="sub_upload"
          type="file"
        />
      </div>
    </div>
  );
}

export default App;
