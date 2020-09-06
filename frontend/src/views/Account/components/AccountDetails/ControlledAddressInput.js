import React, {Component,useState, useEffect} from 'react'
import AddressInput from 'material-ui-address-input'
import { authenticate } from '../../../token';
import axios from 'axios';

class ControlledAddressInput extends Component {
    constructor (props) {
        super(props)
        this.state = {
            address:'',
            addresses: []
        }
    }

    getAddress(){
        const id = authenticate();
        axios.get(`http://localhost:3000/users/loadUser/${id}`)
        .then(response => {
            const data = response.data;
            console.log(data.personalInfo.address);
            if(data.personalInfo.address){
                const address = {
                            "addressLine1": data.personalInfo.address.street,
                            "city": data.personalInfo.address.city,
                            "region": data.personalInfo.address.province,
                            "zip": data.personalInfo.address.postalCode,
                            "country": data.personalInfo.address.country
                        };
                this.handleAddAddress(address);
            }
            
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount(){
        debugger;
        this.getAddress();
    }

    handleAddAddress = address => {
        this.setState({
            addresses: [...this.state.addresses, address]
        })
        if (this.props.onChange) {
            this.props.onChange(address);
        }
    }
 
    handleChangeAddress = addressIndex => {
        this.setState({
            address: addressIndex
        })
       
    }
 
    render () {
        return (
            <AddressInput
                onAdd={this.handleAddAddress}
                onChange={this.handleChangeAddress}
                value={this.state.address}
                allAddresses={this.state.addresses}
            />
        )
    }
}
 
export default ControlledAddressInput