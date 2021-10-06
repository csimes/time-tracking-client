import React, { Component } from "react";

type ClockState = {
  time: Date
}

class Clock extends Component<{}, ClockState> {
  constructor(props: any){
    super(props)
      this.state = {
        time: new Date()
      }
      this.tick();
  }

  tick(){
    this.setState({ time: new Date() 
    })
  };

  // componentWillMount(){
    
  // };

componentDidMount(){
  setInterval(() => this.tick(), 1000)
};

  render() {
    return(
      <div>
        <h1>{this.state.time.toLocaleTimeString()}</h1>
      </div>
    )
  }
}

export default Clock;