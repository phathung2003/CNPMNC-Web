import axois from 'axios'
import { useState } from 'react';

export default function Main() {
    const [email, setEmail] = useState()
    const [password, setPass] = useState()

    return (
        <div>
            <p>Main Pages</p>
            <form>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        placeholder='Nhập email'
                        autoComplete='off'
                        name='name'
                    />
                </div>

                <div>
                    <label htmlFor='pass'>Mật khẩu</label>
                    <input
                        type='password'
                        placeholder='Nhập mật khẩu'
                        autoComplete='off'
                        name='pass'
                    />
                </div>

                <button type='submit'>Register</button>
            </form>
        </div>

    );
}