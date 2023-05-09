import React, { useState, useId } from 'react';
import { ReactComponent as AddIcon } from '../../assets/svg/add.svg';
import api from '../../api/post';

export const NewTaskForm = ({ setTasks, setError }) => {
    const [inputTask, setInputTask] = useState('');
    const [disabled, setDisabled] = useState(false);

    const storeNewTask = async (event) => {
        event.preventDefault();
        if (event.target.value !== '') {
            try {
                const data = {
                    id: 'temp',
                    description: inputTask,
                    is_complete: false,
                };
                setDisabled(true);
                setTasks((prev) => [...prev, data]);
                const response = await api.post('/tasks', data);
                if (response.status >= 200 && response.status <= 299) {
                    setTasks((prev) =>
                        prev.map((tsk, index) => {
                            if (index === prev.length - 1) {
                                console.log(tsk);
                                return response.data;
                            }
                            return tsk;
                        })
                    );
                    setInputTask('');
                }
            } catch (error) {
                console.log('Error in the getTasks: ', error.response.data);
                console.log('the status: ', error.response.status);
                console.log('the headers: ', error.response.headers);
            } finally {
                setDisabled(false);
            }
        } else {
            setError('The description cannot be empty.');
        }
    };

    return (
        <form
            onSubmit={storeNewTask}
            className='flex flex-row justify-between gap-[.8rem] my-[1.6rem]'>
            <label
                htmlFor='newTask'
                className='font-medium text-[2rem] text-[#0d0d0d] md:grow'>
                <input
                    name='newTask'
                    type='text'
                    value={inputTask}
                    onChange={(event) => {
                        setError('');
                        return setInputTask(event.target.value);
                    }}
                    placeholder='Add a task....'
                    className='border border-[#D9D9D9] placeholder:text-[#D9D9D9] rounded-[.8rem] font-normal placeholder:font-thin p-[.8rem] w-full'
                />
            </label>
            <button
                type='submit'
                disabled={!inputTask && disabled}
                className='bg-[#2EF273] rounded-full cursor-pointer disabled:cursor-not-allowed drop-shadow-xl active:drop-shadow-md'>
                <AddIcon className='fill-white h-[2.4rem]' />
            </button>
        </form>
    );
};
