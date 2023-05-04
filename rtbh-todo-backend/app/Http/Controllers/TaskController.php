<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

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
        try {
            if(!$request->description){
                throw new Exception("The description field is required.");
            }
            $task = Task::create([
                'description' => $request->description,
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified task.
     */
    public function show(string $id)
    {
        try{
            return Task::findOrFail($id);
        }
        catch(ModelNotFoundException $e)
        {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
