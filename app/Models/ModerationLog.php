<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class ModerationLog
 * 
 * Model for storing logs of moderation actions on various entities.
 *
 * @property int $id
 * @property int $moderatable_id ID of the model being moderated
 * @property string $moderatable_type Type of the model being moderated
 * @property int $action_by ID of the user who performed the action
 * @property string $action_taken Action taken (e.g., 'approved', 'rejected')
 * @property string $reason Reason for the moderation action
 *
 * @package App\Models
 */
class ModerationLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'moderatable_id',
        'moderatable_type',
        'action_by',
        'action_taken',
        'reason'
    ];

    /**
     * Get the model that the moderation log belongs to via polymorphic relation.
     *
     * This allows the moderation log to be associated with any model that can be moderated,
     * such as stones or comments.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function moderatable()
    {
        return $this->morphTo();
    }

    /**
     * Get the user who performed the moderation action.
     *
     * This relationship provides a link to the user model, allowing us to trace who
     * took what action on the moderated entity.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'action_by');
    }
}

