import React, { useState, useEffect } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/svg/delete.svg';
import api from '../../api/post';

export const TaskList = ({ hasNewTask }) => {
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
            console.log(
                'Error in the deleteTaskHandler: ',
                error.response.data
            );
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
            // set the is_complete status of task changed.
            setTasks((prev) => {
                return prev.map((tsk) => {
                    if (tsk.id === task.id) {
                        tsk.is_complete = data.is_complete;
                    }
                    return tsk;
                });
            });
        } catch (error) {
            console.log(
                'Error in the changeTaskCompleteHandler: ',
                error.response.data
            );
            console.log('the status: ', error.response.status);
            console.log('the headers: ', error.response.headers);
            setError(error.response.data.message);
        }
    };

    const changeTaskDescriptionHandler = async (task) => {
        try {
            const data = {
                description: task.description,
                is_complete: task.is_complete,
            };
            const response = await api.patch(`/tasks/${task.id}}`, data);
        } catch (error) {
            console.log(
                'Error in the changeTaskDescriptionHandler: ',
                error.response.data
            );
            console.log('the status: ', error.response.status);
            console.log('the headers: ', error.response.headers);
            setError(error.response.data.message);
        }
    };

    useEffect(() => {
        const getTasks = async () => {
            try {
                setLoading(true);
                const response = await api.get('/tasks');
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
                <p className='mt-[2.4rem] m-auto text-[1.6rem] lg:text-[2rem]'>
                    Loading...
                </p>
            )}
            {error && (
                <p className='mt-[2.4rem] m-auto text-[1.6rem] lg:text-[2rem] text-red-500'>
                    {error}
                </p>
            )}
            <ul className='flex flex-col justify-center gap-[1.2rem]'>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className='text-[1.6rem] lg:text-[2rem] font-normal text-[#0d0d0d]'>
                        <div className='flex flex-row justify-between gap-[.8rem] bg-[#D9D9D9] rounded-[.8rem] p-[1.6rem]'>
                            <div className='form-control'>
                                <input
                                    type='checkbox'
                                    checked={task.is_complete}
                                    onChange={() =>
                                        changeTaskCompleteHandler(task)
                                    }
                                    className='self-center'
                                />
                            </div>
                            {!task.is_complete && (
                                <input
                                    type='text'
                                    value={task.description}
                                    onChange={(event) => {
                                        setError(false);
                                        return setTasks((prev) =>
                                            prev.map((tsk) => {
                                                if (tsk.id === task.id) {
                                                    tsk.description =
                                                        event.target.value;
                                                }
                                                return tsk;
                                            })
                                        );
                                    }}
                                    onBlur={() =>
                                        changeTaskDescriptionHandler(task)
                                    }
                                    className='bg-[#d9d9d9] overflow-x-auto p-[.8rem] md:grow'
                                />
                            )}
                            {task.is_complete && (
                                <span className='line-through whitespace-nowrap overflow-x-auto w-[16.8rem] p-[.8rem] md:grow'>
                                    {task.description}
                                </span>
                            )}

                            <button
                                type='button'
                                onClick={() => deleteTaskHandler(task.id)}
                                className='bg-white rounded-full hover:bg-red-600 group'>
                                <DeleteIcon className='h-[2.4rem] fill-red-600 group-hover:fill-white cursor-pointer' />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};
