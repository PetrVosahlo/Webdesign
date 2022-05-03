import React, { Component } from 'react'
import radioButtons from './components/radioButtons';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nabydkaKol: [
        {
          id: 1,
          typKola:"Silniční kolo", 
          cena: 500,
        },
        {
          id: 2,
          typKola:"Detske kolo", 
          cena: 200,
        },
      ],
    }
  }
  render() {
    return (
      <div>
        hello
        <radioButtons/>

      </div>
    )
  }
}
