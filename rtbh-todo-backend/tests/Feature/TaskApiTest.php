<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TaskApiTest extends TestCase
{

    public function test_get_all_tasks_status(): void
    {
        $response = $this->get('/api/v1/tasks');
        $response->assertStatus(200);
    }

}
