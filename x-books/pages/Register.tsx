import APIService from '../services/services'; 
import Link from 'next/link';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';


const apiService = new APIService('http://localhost:3001/api')

const Register = () => {
    const [ formData, setFormData ] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        console.log(formData);
        
        const response = await apiService.signup(formData);

        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <>
            <section>
                <div>
                    <div>
                        <div>
                            <h1>
                                Create a new Account on X-Books
                            </h1>
                            <form action="#" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="">
                                        Username
                                    </label>
                                    <input type="text" />
                                </div>
                                <div>
                                    <label htmlFor="">
                                        Password
                                    </label>
                                    <input type="text" />
                                </div>

                                <button>Sign Up!</button>
                                <p>
                                    Already have an account? Let's Log in!
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </>
    )
}

export default Register;