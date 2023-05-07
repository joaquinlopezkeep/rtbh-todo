import React, { useState, useEffect } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/svg/delete.svg';
import api from '../../api/post';

export const TaskList = ({ hasNewTask, setHasNewTask }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const deleteTaskHandler = async (id) => {
        try {
            const response = await api.delete(`/tasks/${id}`);
            if (response.status === 200) {
                setTasks((prev) => {
                    return prev.filter((task) => task.id !== id);
                });
            }
        } catch (error) {
            console.log('Error in the getTasks: ', error.response.data);
            console.log('the status: ', error.response.status);
            console.log('the headers: ', error.response.headers);
            setError(error.response.data.message);
        }
    };

    const changeTaskCompleteHandler = async (task) => {
        try {
            // invert the is_complete status
            const data = {
                description: task.description,
                is_complete: !task.is_complete,
            };
            const response = await api.patch(`/tasks/${task.id}}`, data);
            //map through the tasks and set the status in task state.
            setTasks((prev) => {
                return prev.map((tsk) => {
                    if (tsk.id === task.id) {
                        tsk.is_complete = data.is_complete;
                    }
                    return tsk;
                });
            });
        } catch (error) {
            console.log('Error in the getTasks: ', error.response.data);
            console.log('the status: ', error.response.status);
            console.log('the headers: ', error.response.headers);
            setError(error.response.data.message);
        }
    };

    useEffect(() => {
        console.log('will get all the tasks again...');
        const getTasks = async () => {
            try {
                setLoading(true);
                const response = await api.get('/tasks');
                // console.table(response.data);
                setTasks(response.data);
            } catch (error) {
                console.log('Error in the getTasks: ', error.response.data);
                console.log('the status: ', error.response.status);
                console.log('the headers: ', error.response.headers);
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        };
        getTasks();
    }, [hasNewTask]);

    return (
        <>
            {loading && (
                <p className='mt-[2.4rem] m-auto text-[2.4rem]'>Loading...</p>
            )}
            {error && (
                <p className='mt-[2.4rem] m-auto text-[2.4rem]'>{error}</p>
            )}
            <ul className='mt-[2.4rem] m-auto '>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className='text-[2.4rem] font-normal text-[#0d0d0d] mb-[1.2rem] '>
                        <div className='flex flex-row justify-between gap-[.8rem] bg-[#D9D9D9] rounded-md px-[2.4rem] py-[1rem]'>
                            <div className='form-control pt-3'>
                                <input
                                    type='checkbox'
                                    checked={task.is_complete}
                                    onChange={() =>
                                        changeTaskCompleteHandler(task)
                                    }
                                />
                            </div>
                            {!task.is_complete && (
                                <p className=''>{task.description}</p>
                            )}
                            {task.is_complete && (
                                <p className='line-through'>
                                    {task.description}
                                </p>
                            )}

                            <button
                                type='button'
                                onClick={() => deleteTaskHandler(task.id)}
                                className='bg-white rounded-md hover:bg-red-600 group'>
                                <DeleteIcon className='h-[2.4rem] fill-red-600 group-hover:fill-white cursor-pointer' />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};
