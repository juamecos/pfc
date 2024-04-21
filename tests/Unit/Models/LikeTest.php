<?php

namespace Tests\Unit;

use App\Models\Like;
use App\Models\Stone;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class LikeTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function fillable_properties_are_correctly_defined()
    {
        $like = new Like();
        $fillable = ['stone_id', 'user_id'];

        $this->assertEquals($fillable, $like->getFillable());
    }

    #[Test]
    public function stone_relationship_is_correctly_defined()
    {
        $like = new Like();
        $this->assertEquals('stone_id', $like->stone()->getForeignKeyName());
        $this->assertInstanceOf(Stone::class, $like->stone()->getRelated());
    }

    #[Test]
    public function user_relationship_is_correctly_defined()
    {
        $like = new Like();
        $this->assertEquals('user_id', $like->user()->getForeignKeyName());
        $this->assertInstanceOf(User::class, $like->user()->getRelated());
    }
}
