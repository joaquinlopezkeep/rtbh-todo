import React, { useState } from 'react';
import { ReactComponent as AddIcon } from '../../assets/svg/add.svg';
import api from '../../api/post';

export const NewTaskForm = ({ hasNewTask, setHasNewTask }) => {
    const [inputTask, setInputTask] = useState('');
    console.log('The task form re renders...');

    const storeNewTask = async (event) => {
        event.preventDefault();
        try {
            const data = {
                description: inputTask,
            };
            const response = await api.post('/tasks', data);
            if (response.status === 200) {
                setInputTask('');
                setHasNewTask(!hasNewTask);
            }
        } catch (error) {
            console.log('Error in the getTasks: ', error.response.data);
            console.log('the status: ', error.response.status);
            console.log('the headers: ', error.response.headers);
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
                    className='border border-[#D9D9D9] p-[.4rem] ml-[1.6rem] placeholder:text-[#D9D9D9] rounded-[.8rem] font-normal placeholder:font-thin'
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
