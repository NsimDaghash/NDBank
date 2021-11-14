import axios from 'axios'
import React, { useState } from 'react'
import './AddUser.css'
import { useNavigate } from 'react-router-dom'

const URL = 'http://localhost:4000/'
export default function AddUser({ informFatherOfNewUser }) {
    let navigate = useNavigate()
    const [user, setUser] = useState({
        passportID: '',
        name: '',
        cash: '',
        credit: '',
        isActive: 'true'
    })

    const handleInput = (e) => {
        e.target.style.border = ""
        if (e.target.name === 'cash' || e.target.name === 'credit') {
            e.target.value = e.target.value.replace(/\D/g, '')                      /// enter only numbers
        }
        setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let flag = true;

        Object.entries(user).forEach((item, idx) => {                         
            if (item[1].length === 0) {                                             ///empty input is not allowed
                e.target[idx].style.border = "2px solid red"
                flag = false
            }
        })
        if (flag) {
            const request = await axios.post(URL + 'users', user)
            if (request.status === 201) {
                informFatherOfNewUser(request.data)
                navigate('/')
            }
            else{
                e.target[0].style.border = "2px solid red"
                flag = false
                alert(request.data);
            }
        }
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Passport ID</label>
                <input type="text" name="passportID" placeholder="Passport ID" onChange={e => handleInput(e)} />

                <label>User Name</label>
                <input type="text" name="name" placeholder="Name" onChange={e => handleInput(e)} />

                <label>Cash</label>
                <input type="number" name="cash" placeholder="Cash" onChange={e => handleInput(e)} />

                <label>Credit</label>
                <input type="number" name="credit" placeholder="Credit" onChange={e => handleInput(e)} />

                <input type="submit" value="Submit" />
            </form>

        </div>

    )
}
