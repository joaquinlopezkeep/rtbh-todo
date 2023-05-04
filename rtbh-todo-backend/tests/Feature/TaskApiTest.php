<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_tasks_status()
    {
        $response = $this->get('/api/v1/tasks');
        $response->assertStatus(200);
    }

    public function test_store_task_with_valid_payload()
    {
        $data = [
            'description' => 'Task 1',
        ];
        $response = $this->post('/api/v1/tasks', $data);
        $response->assertStatus(200);
        $this->assertDatabaseHas('tasks', $data);
    }

    public function test_store_task_with_invalid_payload()
    {
        $data = [
            'bad_field' => 'Task 1',
        ];
        $response = $this->post('/api/v1/tasks', $data);
        $response->assertStatus(400)
                ->assertExactJson([
                    'message' => 'The description field is required.'
                ]);
    }

    public function test_get_specific_task_with_valid_id()
    {
        $task = Task::factory()->create();
        $task_id = $task->id;
        $response = $this->get("/api/v1/tasks/{$task_id}");
        $response->assertStatus(200)
                ->assertJson([
                    'id' => $task_id
                ]);
    }

    public function test_get_specific_task_with_invalid_id()
    {
        $task = Task::factory()->create();
        $task_id = $task->id  + 100;
        $response = $this->get("/api/v1/tasks/{$task_id}");
        $response->assertStatus(404);
    }

    public function test_update_task_with_valid_id()
    {
        $data = [
            'description' => 'A patched title',
            'is_complete' => true
        ];
        $task = Task::factory()->create();
        $task_id = $task->id;
        $response = $this->patch("/api/v1/tasks/{$task_id}", $data);
        $response->assertStatus(200);
        $updatedTask = Task::find($task_id);
        $this->assertEquals($data['description'], $updatedTask->description);
        $this->assertEquals($data['is_complete'], $updatedTask->is_complete);
    }

    public function test_update_task_with_invalid_id()
    {
        $data = [
            'description' => 'This should fail',
            'is_complete' => true
        ];
        $task = Task::factory()->create();
        $task_id = $task->id  + 100;
        $response = $this->patch("/api/v1/tasks/{$task_id}", $data);
        $response->assertStatus(404);
    }

    public function test_update_task_with_invalid_payload()
    {
        $data = [
            'title' => 'This change should fail',
            'is_complete' => true
        ];
        $task = Task::factory()->create();
        $task_id = $task->id;
        $response = $this->patch("/api/v1/tasks/{$task_id}", $data);
        $response->assertStatus(400);
        $updatedTask = Task::find($task_id);
        $this->assertNotEquals($data['title'], $updatedTask->description);
    }

}
