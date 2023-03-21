import React, { Component } from "react";
import video from "../../assets/office.mp4";

class Home extends Component<{}, {}> {
  render() {
    return (
      <div className="home">
        <div>
          <h1 className="title">Welcome to Digital Office </h1>
        </div>
        <video
          className="background-video"
          autoPlay
          loop
          /* muted attribute required to have enable autoplay due to Chrome 66 stopping autoplay of all videos without that attribute */

          muted
        >
          <source
            src={video}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
}

export default Home;
