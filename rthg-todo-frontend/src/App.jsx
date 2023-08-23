import { useState } from 'react';
import { NewTaskForm, TaskList } from './components/index';

function App() {
    const [hasNewTask, setHasNewTask] = useState(false);
    const [error, setError] = useState('');

    return (
        <div className='flex flex-col h-screen'>
            <header className='h-[6.4rem] bg-[#0d0d0d] flex flex-row justify-center'>
                <p className='text-white text-[2.4rem] self-center'>
                    RTHG TODO APP
                </p>
            </header>
            <main className='grid grid-cols-12 md:grid-cols-8 bg-slate-300 grow'>
                <section
                    id='tasks'
                    className='col-start-2 col-span-10 md:col-span-4 md:col-start-3 lg:col-span-2 lg:col-start-4 bg-white p-[.8rem] my-[2.4rem] md:mt-[3.2rem] md:p-[1.6rem] rounded-2xl h-fit'>
                    <h2 className='text-center font-semibold my-[1.6rem] text-[3.2rem]'>
                        Tasks
                    </h2>
                    <TaskList
                        hasNewTask={hasNewTask}
                        error={error}
                        setError={setError}
                    />
                    <NewTaskForm
                        hasNewTask={hasNewTask}
                        setHasNewTask={setHasNewTask}
                        error={error}
                        setError={setError}
                    />
                </section>
            </main>
            <footer className='h-[6.4rem] bg-[#0d0d0d] flex flex-row justify-center'>
                <p className='text-white text-[2.4rem] self-center font-light'>
                    Copyright &copy; 2023
                </p>
            </footer>
        </div>
    );
}

export default App;
// bg-white sm:w-screen lg:w-fit m-auto rounded-2xl pt-[.8rem] pb-[3.2rem] px-[2.4rem] flex flex-col
