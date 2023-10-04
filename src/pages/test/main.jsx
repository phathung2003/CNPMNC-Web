import axois from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const api = "http://localhost:3001/main"

export default function Main() {
    const [email, setEmail] = useState()
    const [password, setPass] = useState()
    const navigate = useNavigate()

    const handelSubmit = (input) => {
        input.preventDefault()
        axois.post(api, { email, password }).then(
            result => {
                console.log(result.data)
                if (result.data === "Ok") {
                    navigate("/info")
                }
            }
        ).catch(err => console.log(err))
    }

    return (
        <div>
            <p>Main Pages</p>

            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng nhập
                            </h1>
                            <form class="space-y-4 md:space-y-6" onClick={handelSubmit}>

                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type='email'
                                        placeholder="Hãy nhập email"
                                        autoComplete='off'
                                        name="emailInput"
                                        onChange={(input) => setEmail(input.target.value)}
                                    />
                                </div>

                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                    <input
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type='password'
                                        placeholder="••••••••"
                                        autoComplete='off'
                                        name='password'
                                        onChange={(input) => setPass(input.target.value)}
                                    />
                                </div>

                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                            </form>

                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Chưa có tài khoản <Link to="/contact" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}