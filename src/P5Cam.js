import React from "react";
import Sketch from "react-p5";

let trackingData;
tracking.ColorTracker.registerColor('white', function(r, g, b) {
  if (r >= 240 && g >= 240 && b >= 240) {
    return true;
  }
  return false;
});

export default function P5Cam(props) {
  const setup = (p5, canvasParentRef) => {
		p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    const capture = p5.createCapture({
      video: {
        mandatory: {
          minWidth: window.innerWidth - 200,
          minHeight: window.innerHeight - 20,
        },
        optional: [{ maxFrameRate: 30 }]
      },
      audio: false
    })
    capture.position(0, 0)
    capture.style('opacity',0.5)
    capture.id("myVideo")
    const colors = new tracking.ColorTracker(['white']);
    tracking.track('#myVideo', colors);

    colors.on('track', function(event) {
      trackingData = event.data 
    });
	};

	const draw = (p5) => {
    if(trackingData){
      for (var i = 0; i < trackingData.length; i++) {
        const x = trackingData[i].x + trackingData[i].width / 2
        const y = trackingData[i].y + trackingData[i].height / 2
        props.onLightMove(x, y, trackingData[i].width, trackingData[i].height)
      }
    }
	};

	return <Sketch setup={setup} draw={draw} />;
}