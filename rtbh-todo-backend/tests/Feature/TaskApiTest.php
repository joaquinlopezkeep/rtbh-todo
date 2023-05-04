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

    public function test_store_task_with_invalid_payload(){
        $data = [
            'bad_field' => 'Task 1',
        ];
        $response = $this->post('/api/v1/tasks', $data);
        $response->assertStatus(400)
                ->assertExactJson([
                    'message' => 'The description field is required.'
                ]);
    }

}
