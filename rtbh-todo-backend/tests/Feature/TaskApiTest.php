<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TaskApiTest extends TestCase
{

    public function test_get_all_tasks(): void
    {
        $response = $this->get('/api/v1/tasks');
        $response->assertStatus(200);
    }
}
