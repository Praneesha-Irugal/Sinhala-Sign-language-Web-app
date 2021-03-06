// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { nextFrame } from "@tensorflow/tfjs";
import {drawRect} from "./utilities"; 


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {

    
    // 3 Load network
    //https://sinhalasignlanguagevoicedetection.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json
    //https://signlanguagedetectionirumodel.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json
    const net = await tf.loadGraphModel('https://sinhalasignlanguagevoicedetection.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16.7);

  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640,480])
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await net.executeAsync(expanded)
      console.log(obj)

      //console.log(await obj[1].array())

      const boxes = await obj[5].array()
      const classes = await obj[1].array()
      const scores = await obj[4].array()
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  

      
      
      requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.9, videoWidth, videoHeight, ctx)}); 
      
      

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
  };
    
  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
      <div className="dog">
      <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "center",
            marginLeft: "0",
            marginRight: "0",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          className={"dogs"}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
            
          }}
        />
      
      </div>
      </header>
    </div>
  );
}

export default App;
