import React, { useEffect } from 'react';
import Router from 'next/router';

const Home = () => {

    const logout = () => {
        Router.push('/');
    }

    return (
        <div>
            <p>
                Welcome to X-Books
            </p>
            <button>
                Logout
            </button>
        </div>
    )
}