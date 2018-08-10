import * as React from 'react';
import './App.css';
import Form from "./components/Form";

export class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      nodes: [
        { id: "A" },
        { id: "B" },
        { id: "C" },
        { id: "D" },
        { id: "E" },
        { id: "F" }
      ],
      links:[
        { source: "A", target: "B", weight: 1 },
        { source: "A", target: "C", weight: 4 },
        { source: "A", target: "D", weight: 10 },
        { source: "B", target: "E", weight: 3 },
        { source: "C", target: "D", weight: 4 },
        { source: "C", target: "F", weight: 2 },
        { source: "D", target: "E", weight: 1 },
        { source: "E", target: "B", weight: 3 },
        { source: "E", target: "A", weight: 2 },
        { source: "F", target: "D", weight: 1 }
      ],      
    }           
  }  
    
  render() {
   
    return (
      <main className="App">        
        <Form 
          gNodes={this.state.nodes}
          gLinks={this.state.links} />
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>              
      </main>
    );
  }
}

export default App;
