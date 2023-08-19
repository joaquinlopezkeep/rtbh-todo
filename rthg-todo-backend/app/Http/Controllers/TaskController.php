<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the tasks.
     */
    public function index()
    {
        return Task::all();
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "description" => ['required', 'string']
        ]);

        $task = Task::create([
            'description' => $data["description"],
        ]);

        $task->save();
    }

    /**
     * Display the specified task.
     */
    public function show(string $id)
    {
        return Task::findOrFail($id);
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            "description" => ['required', 'string'],
            "is_complete" => ['required', "boolean"]
        ]);

        $task = Task::findOrFail($id);
        $task->description = $data["description"];
        $task->is_complete = $request["is_complete"];
        $task->save();
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(string $id)
    {
        return Task::findOrFail($id)->delete();
    }

    /**
     * Displays tasks where is_complete is true with pagination.
     */
    public function complete()
    {
        return Task::where("is_complete", true)->paginate(15);
    }

    /**
     * Displays tasks where is_complete is false with pagination.
     */
    public function incomplete()
    {
        return Task::where("is_complete", false)->paginate(15);
    }
}
