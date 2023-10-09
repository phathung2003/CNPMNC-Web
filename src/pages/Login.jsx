import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const api = import.meta.env.VITE_API_MAIN;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
        setError('Hãy nhập thông tin đầy đủ.')
        return;

     }
        
        
        if (api !== undefined) {
            axios
                .post(api, { email, password })
                .then((result) => {
                    console.log(result.data);
                    if (result.data === 'Ok') {
                        navigate('/info');
                    } else {
                        setError('Mật khẩu hoặc tài khoản sai. Hãy nhập lại.');
                        return;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setError('An error occurred. Please try again later.');
                });
        } else {
            setError('Missing or invalid .env file for API.');
        }
    };

    return (
        <div>
            <p>Login Page</p>

            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng nhập
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="email"
                                        placeholder="Hãy nhập email"
                                        autoComplete="off"
                                        name="emailInput"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Mật khẩu
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="password"
                                        placeholder="••••••••"
                                        autoComplete="off"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {error && <p className="text-red-500">{error}</p>}

                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Đăng nhập
                                </button>
                            </form>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Chưa có tài khoản{' '}
                                <Link to="/Register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Đăng ký
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
