<?php

namespace App\Http\Controllers;

use App\Models\TaskList;
use Illuminate\Http\Request;

class TaskListController extends Controller
{
    /**
     * Display a listing of all task lists.
     */
    public function index()
    {
        return TaskList::with('tasks')->get();
    }

    /**
     * Store a newly created task list.
     */
    public function create(Request $request)
    {
        $data = $request->validate([
            "title" => ['required', 'string']
        ]);

        $taskList = new TaskList($data["title"]);

        $taskList->save();
    }


    /**
     * Display the specified task list.
     */
    public function show(string $id)
    {
        return TaskList::findOrFail($id)->with('tasks')->get();
    }


    /**
     * Update the specified task list in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            "title" => ['required', 'string']
        ]);

        $task = TaskList::findOrFail($id);

        $task->update($data);
    }

    /**
     * Remove the specified task list from storage.
     */
    public function destroy(string $id)
    {
        TaskList::findOrFail($id)->delete();
    }
}
