import React, { useState } from 'react';
import { ReactComponent as AddIcon } from '../../assets/svg/add.svg';
import { API_URL } from '../../utils/api';

export const NewTaskForm = () => {
    const [inputTask, setInputTask] = useState('');

    const storeNewTask = async () => {
        try {
            const data = {
                description: inputTask,
            };
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            setInputTask('');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={storeNewTask} className='flex flex-row justify-center'>
            <label
                htmlFor='newTask'
                className='font-medium text-[2.4rem] mr-[1.6rem] text-[#0d0d0d] '>
                Add Task:
                <input
                    name='newTask'
                    type='text'
                    value={inputTask}
                    onChange={(event) => setInputTask(event.target.value)}
                    placeholder='Empty the dishwasher...'
                    className='border border-[#D9D9D9] p-[.4rem] ml-[1.6rem] placeholder:text-[#D9D9D9] placeholder:pl-[.6rem] rounded-[.8rem] font-normal placeholder:font-thin'
                />
            </label>
            <button
                type='submit'
                disabled={!inputTask}
                className='bg-[#2EF273] rounded-full cursor-pointer disabled:cursor-not-allowed drop-shadow-xl active:drop-shadow-md'>
                <AddIcon className='fill-white' />
            </button>
        </form>
    );
};
