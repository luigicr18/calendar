import React, {Component} from 'react';
import './calendar.css';
import {DAYS} from './constants'
import Moment from 'moment'

class Calendar extends Component {

    constructor(){
        super()
        
    }

    isAHolyDay = (day) => {
        let dateIsHoly = false
        let currentPrintedDay = Moment(this.props.month + '-' + day + '-' + this.props.year)
        for(let i = 0; i< this.props.holydays.length; i++){
            console.log('diff: ', this.props.holydays[i].diff(currentPrintedDay))
            console.log('day: ', currentPrintedDay)
            if(this.props.holydays[i].diff(currentPrintedDay) === 0)
                return dateIsHoly = true
        }
        
        return dateIsHoly
    }

    getColumBox = (key, day, isWeekend) => {
        let validateDay = this.isInRange(day)
        let printedDay = validateDay > 0? day.toString() : '.'
        let extraClass = printedDay !== '.'? (isWeekend)? 'classWeekend': this.isAHolyDay(printedDay)? 'classHolyday' : 'classPrintedDay': 'invalidDay'
        
        return(<div key={key} className={`calendarbox ${extraClass}`}><label ref={this.setRef(key)}>{printedDay}</label></div>)
    }

    setRef (refName) {
        return input => { this[`row${refName}`] = input }
      }

    calendarRef(key){
        return key   
    }

    isInRange(day) {
        if(this.props.firstDay !== undefined && this.props.lastDay !== undefined){
            return (day>=this.props.firstDay && day<=this.props.lastDay)?day: 0
        }
        return day
    }

    drawAllBox = () => {
        let allBox = [];
        let key = 0
        let day = 0
        let startPosition = this.props.startAt
        let endPosition = this.props.maxDay+1
        for(let i=0; i< 6; i++) {
            for(let j=0; j< 7; j++) {
                if(key >= startPosition){
                    day++
                }
                if(key > endPosition){
                    day=0
                }
                allBox.push(this.getColumBox(key, day, (j===0 || j===6)))
                key++
            }
        }
        return allBox
    }

    drawHeader = () => {
        let header;
        header = DAYS.map((day, i) => {return <div className='headerDay' key={i}>{day}</div>})
        return header
    }

    drawMonthDesc = () => {
        let header;
        header = <div className='headerMonth'>{this.props.monthDesc}</div>
        return header
    }

    componentDidMount() {
        this[`row${1}`].addClass
    }

    render() {
        return(
            <div className='calendarBody'>
                {this.drawMonthDesc()}
                {this.drawHeader()}
                {this.drawAllBox()}
            </div>
        )
    }
}

export default Calendar;