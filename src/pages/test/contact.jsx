import axois from 'axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const api = "http://localhost:3001/contact"

export default function Contact() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPass] = useState()

    const handelSubmit = (input) => {
        input.preventDefault()
        axois.post(api, { name, email, password }).then(
            result => console.log(result)
        ).catch(err => console.log(err))
    }

    return (
        <div>
            <p>Contact Pages</p>
            <form onSubmit={handelSubmit}>
                <div>
                    <label htmlFor='name'>Họ tên</label>
                    <input
                        type='text'
                        placeholder='Nhập tên'
                        autoComplete='off'
                        name='name'
                        onChange={(input) => setName(input.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        placeholder='Nhập email'
                        autoComplete='off'
                        name='name'
                        onChange={(input) => setEmail(input.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='pass'>Mật khẩu</label>
                    <input
                        type='password'
                        placeholder='Nhập mật khẩu'
                        autoComplete='off'
                        name='pass'
                        onChange={(input) => setPass(input.target.value)}
                    />
                </div>

                <button type='submit'>Register</button>
            </form>

            <p>Already have an account</p>
            <Link to="/login">Login</Link>
        </div>


    );
}