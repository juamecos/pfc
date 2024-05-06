<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\HandlesModeration;

class Comment extends Model
{

    use HasFactory, HandlesModeration;

    protected $fillable = [
        'stone_id',
        'user_id',
        'content',
        'active',
        'abuse',
        'moderation_status',
        'report_count'
    ];

    // protected $with = ['user', 'stone'];

    /**
     * Get the user that owns the comment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the stone that owns the comment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function stone()
    {
        return $this->belongsTo(Stone::class, 'stone_id');
    }

    /**
     * Get all of the comment's moderation logs.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function moderationLogs()
    {
        return $this->morphMany(ModerationLog::class, 'moderatable');
    }

}
