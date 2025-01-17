import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {

    const navigator = useNavigate()


    return (
        <div className='p-10'>
            <h1 className='font-bold text-2xl mb-3'>Welcome to the Dashboard</h1>
            <div className='flex gap-10'>
                <div>
                    <button onClick={()=> navigator('/home/dashboard')} className='px-10 py-5 font-semibold text-white bg-gradient-to-bl from-sky-400 to-green-950'>Go to Dashboard</button>
                </div>

                <div>
                    <button onClick={()=> navigator('/home/create-quiz')} className='px-10 py-5 font-semibold text-white bg-gradient-to-bl from-sky-400 to-green-950'>Create New Quiz</button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;