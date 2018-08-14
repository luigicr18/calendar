import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import Calendar from './calendar';
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment);

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      daysAdded: 0,
      calendars: true,
      holydays: ['08-15', '09-09' ,'09-14'], holyDates: []
    }
  }


  handleDateChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  handleNumberDaysChange = (days) => {
    this.setState({
      daysAdded: days
    });
  }

  printCalendar = () => {
    if(this.state.startDate !== undefined && this.state.daysAdded > 0){
      this.drawCalendar()
    }
  }


  getAbsoulteMonths(momentDate){
    let months = Number(momentDate.format("MM"));
    let years = Number(momentDate.format("YYYY"));
    return months + (years * 12);
  }

  drawCalendar = () => {
    let allCalendars = []
    let lastDate = moment(this.state.startDate).add(this.state.daysAdded, 'd')
    let startDate = moment(this.state.startDate)  
    let datesObject = []
    console.log('last: ', this.state.holyDates)
    let startMonths = this.getAbsoulteMonths(startDate)
    let endMonths = this.getAbsoulteMonths(lastDate)
    let newStartDate = moment(startDate).add((startDate.format('DD')*-1)+1, 'd')
    
    if(endMonths - startMonths === 0){
      
      datesObject.push({startAt: newStartDate.day(), firstDay: startDate.format('DD'), maxDay: lastDate.format('DD'), monthDesc:startDate.format('MMMM-YYYY'), month: startDate.format('MM'), year: startDate.format('YYYY')})
    }
    else{
      datesObject.push({startAt: newStartDate.day(), firstDay: startDate.format('DD'), maxDay: moment(startDate).date(0).format('DD'), monthDesc:startDate.format('MMMM-YYYY'), month: startDate.format('MM'), year: startDate.format('YYYY')})
      for(let i = 1; i < (endMonths - startMonths); i++){
        let date = moment(newStartDate).add(i, 'M')
        datesObject.push({startAt: date.day(), firstDay: '1', maxDay: moment(date).date(0).format('DD'), monthDesc:date.format('MMMM-YYYY'), month: date.format('MM'), year: date.format('YYYY')})
      }
      let newLastDate = moment(lastDate).add((lastDate.format('DD')*-1)+1, 'd')
      datesObject.push({startAt: newLastDate.day(), firstDay: '1', maxDay: lastDate.format('DD'), monthDesc:lastDate.format('MMMM-YYYY'), month: lastDate.format('MM'), year: lastDate.format('YYYY')})
    }
    
    
    allCalendars.push(
      datesObject.map((item,index) => {return <Calendar key={index} startAt={item.startAt} firstDay={item.firstDay}  maxDay={item.maxDay} lastDay={item.maxDay} monthDesc={item.monthDesc} month={item.month} year={item.year} holydays={this.state.holyDates}/>} )
    )

    this.setState({calendars: allCalendars }) 
    
  }


  componentDidMount(){
    let allHolyDAys = this.state.holydays.map((item,i) =>{
        let dtHolyday = Moment(item + '-' + this.state.startDate.format('YYYY'))
        return dtHolyday
    })
    this.setState({holyDates: allHolyDAys})
  }

  render() {
    let daysInput
    let countryCodeInput
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Calendar App</h1>
        </header>
        <form>
          <label>
            <span>Start Date:</span>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleDateChange}
              dateFormat="L"
            />
          </label>
          <label>
            Number of Days:
            <input type="number" ref={node => {daysInput = node}} onChange={()=> this.handleNumberDaysChange(daysInput.value)}/><br/>
          </label>
          <br/>
          <input type="button" value="Print Calendar" onClick={() => this.printCalendar()}/>
        </form>
        {this.state.calendars}
      </div>
    )
  }
}

export default App;
