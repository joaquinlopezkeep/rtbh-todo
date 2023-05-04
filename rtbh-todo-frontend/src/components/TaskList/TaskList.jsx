import React, { useState, useEffect } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/svg/delete.svg';
import { API_URL } from '../../utils/api';

export const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = '';

    const deleteTaskHandler = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            setTasks((prev) => {
                return prev.filter((task) => task.id !== id);
            });
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }
    };

    const changeTaskCompleteHandler = async (task) => {
        try {
            const data = {
                description: task.description,
                is_complete: !task.is_complete,
            };
            const response = await fetch(`${API_URL}/${task.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            setTasks((prev) => {
                return prev.map((tsk) => {
                    if (tsk.id === task.id) {
                        tsk.is_complete = data.is_complete;
                    }
                    return tsk;
                });
            });
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }
    };

    useEffect(() => {
        const getTasks = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}`);
                const data = await response.json();
                console.table(data);
                setTasks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getTasks();
    }, []);

    return (
        <>
            {loading && (
                <p className='mt-[2.4rem] m-auto text-[2.4rem]'>Loading...</p>
            )}
            {error && (
                <p className='mt-[2.4rem] m-auto text-[2.4rem]'>
                    Something went wrong...
                </p>
            )}
            <ul className='mt-[2.4rem] m-auto '>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className='text-[2.4rem] font-normal text-[#0d0d0d] mb-[1.2rem]'>
                        <div className='flex flex-row gap-[.8rem] bg-[#D9D9D9] rounded-md px-[2.4rem] py-[1rem]'>
                            <div className='form-control pt-3'>
                                <input
                                    type='checkbox'
                                    checked={task.is_complete}
                                    onChange={() =>
                                        changeTaskCompleteHandler(task)
                                    }
                                />
                            </div>
                            {!task.is_complete && <p>{task.description}</p>}
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
