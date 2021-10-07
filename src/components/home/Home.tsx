import React, { Component } from "react"

type HomeProps = {
  
}
type HomeState = {
  videoURL: string
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props)
      this.state = { 
        videoURL: "https://storage.coverr.co/videos/WsylkSzVz02eS3Y5bg54CNAJZclj3vhUk?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjMzNjQyOTQ3fQ.gA7MIINONIBpapit9yKHkK_h3jdL7lxCI4gCSwYn5m0"
      }

  }

  render() { 
    return (
      <div>
        <div>
          <h1 className="title">Welcome to Digital Office </h1>
        </div>
            <video id="background-video" loop autoPlay>
                <source src={this.state.videoURL} type="video/mp4" />
                <source src={this.state.videoURL} type="video/ogg" />
                Your browser does not support the video tag.
            </video>
      </div>
      );
  }
}

export default Home;