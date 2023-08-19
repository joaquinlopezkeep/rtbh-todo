<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;


    protected function setUp(): void
    {
        parent::setUp();

        $this->withHeaders([
            'Accept' => 'application/json'
        ]);
    }

    public function test_get_all_tasks_status()
    {
        $this->get('/api/v1/tasks')->assertSuccessful();
    }

    public function test_store_task_with_valid_payload()
    {
        $data = [
            'description' => 'Task 1',
        ];
        $this->post('/api/v1/tasks', $data)
            ->assertStatus(200);
        $this->assertDatabaseHas('tasks', $data);
    }

    public function test_store_two_tasks_with_same_payload()
    {
        $data = [
            'description' => 'Duplicate',
        ];
        $this->post('/api/v1/tasks', $data)->assertSuccessful();
        $this->post('/api/v1/tasks', $data)->assertSuccessful();
        $tasks = Task::where('description', 'Duplicate')->get();
        $this->assertCount(2, $tasks);
    }

    public function test_store_task_with_empty_description()
    {
        $data = [
            'description' => '',
        ];
        $this->post('/api/v1/tasks', $data)->assertUnprocessable();
    }

    public function test_store_task_with_invalid_payload()
    {
        $data = [
            'bad_field' => 'Task 1',
        ];
        $this->post('/api/v1/tasks', $data)->assertUnprocessable();
    }

    public function test_get_specific_task_with_valid_id()
    {
        $task = Task::factory()->create();
        $task_id = $task->id;
        $this->get("/api/v1/tasks/{$task_id}")->assertSuccessful()
            ->assertJson([
                'id' => $task_id
            ]);
    }

    public function test_get_specific_task_with_invalid_id()
    {
        $task = Task::factory()->create();
        $task_id = $task->id  + 100;
        $this->get("/api/v1/tasks/{$task_id}")->assertNotFound();
    }

    public function test_update_task_with_valid_id()
    {
        $data = [
            'description' => 'A patched title',
            'is_complete' => true
        ];
        $task = Task::factory()->create();
        $task_id = $task->id;
        $this->patch("/api/v1/tasks/{$task_id}", $data)->assertSuccessful();
        $updatedTask = Task::find($task_id);
        $this->assertEquals($data['description'], $updatedTask->description);
        $this->assertEquals($data['is_complete'], $updatedTask->is_complete);
    }

    public function test_update_task_with_valid_id_and_empty_description()
    {
        $data = [
            'description' => '',
            'is_complete' => true
        ];
        $task = Task::factory()->create();
        $task_id = $task->id;
        $this->patch("/api/v1/tasks/{$task_id}", $data)->assertUnprocessable();
    }

    public function test_update_task_with_invalid_id()
    {
        $data = [
            'description' => 'This should fail',
            'is_complete' => true
        ];
        $task = Task::factory()->create();
        $task_id = $task->id  + 100;
        $this->patch("/api/v1/tasks/{$task_id}", $data)->assertNotFound();
    }

    public function test_update_task_with_invalid_payload()
    {
        $data = [
            'title' => 'This change should fail',
            'is_complete' => true
        ];
        $task = Task::factory()->create();
        $task_id = $task->id;
        $this->patch("/api/v1/tasks/{$task_id}", $data)->assertUnprocessable();
        $updatedTask = Task::find($task_id);
        $this->assertNotEquals($data['title'], $updatedTask->description);
    }

    public function test_delete_task_with_valid_id()
    {
        $task = Task::factory()->create();
        $task_id = $task->id;
        $this->delete("/api/v1/tasks/{$task_id}")->assertSuccessful();
        $this->assertDatabaseMissing('tasks', ['id' => $task_id]);
    }

    public function test_delete_task_with_invalid_id()
    {
        $task = Task::factory()->create();
        $task_id = $task->id + 100;
        $this->delete("/api/v1/tasks/{$task_id}")->assertNotFound();
        $this->assertDatabaseHas('tasks', ['id' => $task->id]);
    }

    public function test_get_all_complete_tasks()
    {
        Task::factory()->count(10)->state(function () {
            return [
                'is_complete' => true
            ];
        })->create();
        $response = $this->get('/api/v1/tasks/complete');
        $data = $response->json();
        foreach ($data['data'] as $task) {
            $this->assertTrue($task['is_complete']);
        }
    }

    public function test_get_all_incomplete_tasks()
    {
        Task::factory()->count(10)->state(function () {
            return [
                'is_complete' => false
            ];
        })->create();
        $response = $this->get('/api/v1/tasks/incomplete');
        $data = $response->json();
        foreach ($data['data'] as $task) {
            $this->assertFalse($task['is_complete']);
        }
    }

    public function test_store_task_then_delete_then_add_again()
    {
        $data = [
            'description' => 'This task will be added again.'
        ];
        $this->post('/api/v1/tasks', $data)->assertSuccessful();
        $task = Task::where('description', 'This task will be added again.')->get();
        $this->assertCount(1, $task);
        $task_id = $task[0]->id;
        $this->delete("/api/v1/tasks/{$task_id}")->assertSuccessful();
        $this->assertDatabaseMissing('tasks', $data);
        $this->post('/api/v1/tasks', $data)->assertSuccessful();
        $this->assertDatabaseHas('tasks', $data);
    }
}
