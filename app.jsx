import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: "",
      rate: "",
      term: "30", //hard code inital term to avoid infinity calculation
      submit: "0.00"
    };
    this.handleState = this.handleState.bind(this);
    this.calculate = this.calculate.bind(this)
  }

  handleState(e) {
    this.setState({
      [e.target.name]:[e.target.value]
    }) 
  };

  calculate(e) {
    const principle = (this.state.balance);
    const rate = (this.state.rate) / 100 / 12;
    const term = (this.state.term) * 12;
    //Mortgage payment calculation, converted to currency format
    let payment = (principle*(rate*Math.pow((1+rate ),term )/(Math.pow(1+rate,term)-1))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                         
    this.setState({submit: payment});
  }
  
 render() {
    return (
      <div className='container'>
        <div name = "input" id="input">
        <h3>Mortgage Calculator</h3><br />
        <label htmlFor="">Loan Balance:&nbsp;</label>
        <input type="number" name="balance" value={this.state.balance} onChange={this.handleState} /><br /><br />
        <label>Interest Rate (%):&nbsp;</label>
        <input type="number" name="rate" step="0.01" value={this.state.rate} onChange={this.handleState} /><br /><br />
        <label>Loan Term:&nbsp;</label>
        <select name="term" value={this.state.term} onChange={this.handleState}><br /><br />
          <option value="15">15</option>
          <option value="30">30</option>
        </select><br /><br />
        <button name="submit" type="submit" onClick = {this.calculate}>Calculate Monthly Payment</button><br /><br />
        </div>
        <div id="output" name='output'> ${this.state.submit} is your payment.</div>
      </div>
    );
  }
}

