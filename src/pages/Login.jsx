import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handleSubmit from '../backend/checkLogin'

export default function Login(setTest) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="w-full p-4 bg-white rounded-md shadow-xl max-w-md">
                <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                    Đăng nhập
                </h1>

                <form className="mt-4" onSubmit={(e) => handleSubmit(e, email, password, setError, navigate, setTest)}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Tên tài khoản
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            name="emailInput"
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-3 py-2 text-sm text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            autoComplete="off"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-3 py-2 text-sm text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mt-2">
                        <button type="submit"
                            className="w-full px-3 py-2 text-sm text-white transition-colors duration-200 bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}
