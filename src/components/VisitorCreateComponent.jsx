import React, {Component} from 'react'
import {Link} from "react-router-dom";


class VisitorCreateComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
         visitorName: '',
         phone: '',
         purpose: '',
         employeeName: '',
         employeeId: null,
         arrivalTime: '',
         items: [],
         isLoaded: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.makeAppointment = this.makeAppointment.bind(this);
      //this.addVisitor = this.addVisitor.bind(this);
  }
    componentDidMount(query) {
        return fetch('/failte/employee')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            })
    }

    makeAppointment(){
        console.log(this.state.visitorName);
        console.log(this.state.phone);
        console.log(this.state.purpose);
        console.log(this.state.employeeId);
        fetch('/failte/createappointment',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                purpose: this.state.purpose,
                visitorName: this.state.visitorName,
                employeeId: this.state.employeeId,
                arrivalTime: this.state.phone
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);

            });
            window.location = 'http://localhost:3000/appointments';
        console.log("Appointment Added Successfully");
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state);
    };

  render() {
    return (
        <div className="container">
          <div className='form-group'>
            <label>Visitor</label><br/>
            <input className="form-control" name="visitorName"
                   placeholder="Please enter your name..." onChange={(event) => this.handleChange(event)}/>
          </div>
          <div className='form-group'>
            <label>PhoneNumber</label>
            <input className="form-control" name="phone"
                   placeholder="Enter your phone number..." onChange={(event) => this.handleChange(event)}/>
          </div>
            <div className='form-group'>
                <div className="form-group">
                    <label>Reason for Visit:</label>
                    <select className="form-control" name="purpose" onChange={(event) => this.handleChange(event)}>
                        <option value="" name='purpose' disabled selected hidden>Please Choose...</option>
                        <option value="interview" name='purpose'>Interview</option>
                        <option value="delivery" name='purpose'>Delivery</option>
                        <option value="careers" name='purpose'>Careers</option>
                        <option value="maintenance" name='purpose'>Maintenance</option>
                        <option value="foodiefriday" name='purpose'>Foodie Friday</option>
                        <option value="Other" name='purpose'>Other</option>
                    </select>
                    <label>Employee to Meet:</label><br/>
                    <input  className="form-control" list="employees" name="employeeName" placeholder="Please Choose..." onChange={(event) => this.handleChange(event)}/>
                    <datalist id="employees">
                        {this.state.items.map(item => (
                            <option key={item.id} value={item.employeeName}>{item.employeeId}</option>
                        ))}
                    </datalist>
                </div>
            </div>
          <div className='form-group'>
              <button className="btn btn-primary" onClick={this.makeAppointment}>Confirm</button>
          </div>
        </div>
    )
  }
}

export default VisitorCreateComponent