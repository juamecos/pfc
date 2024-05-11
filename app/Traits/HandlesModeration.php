<?php

namespace App\Traits;

use App\Models\ModerationLog;
use Illuminate\Support\Facades\Auth;
use Exception;

trait HandlesModeration
{
    /**
     * Increment the report count and possibly change moderation status.
     *
     * @return void
     * @throws Exception
     */
    public function report()
    {
        try {
            $this->increment('report_count');
            $this->update(['moderation_status' => 'pending']);
            // Log log this change
            ModerationLog::create([
                'moderatable_id' => $this->id,
                'moderatable_type' => get_class($this),
                'action_by' => Auth::check() ? Auth::id() : null,
                'action_taken' => 'pending',
                'reason' => 'Automatic moderation status update after multiple reports'
            ]);
        } catch (Exception $e) {
            throw new Exception("Error reporting " . get_class($this) . ": {$e->getMessage()}");
        }
    }

    /**
     * Moderate the specific entity based on action and reason provided by a moderator or admin.
     *
     * @param string $action The moderation action ('approved' or 'rejected')
     * @param string $reason The reason for the moderation action
     * @return void
     * @throws Exception
     */
    public function moderate($action, $reason)
    {
        if (!Auth::check() || !in_array(Auth::user()->role, ['moderator', 'admin'])) {
            throw new Exception("Unauthorized access. Only moderators or admins can perform moderation.");
        }

        try {
            $this->moderationLogs()->create([
                'action_by' => Auth::id(),
                'action_taken' => $action,
                'reason' => $reason
            ]);

            $this->update([
                'abuse' => $action !== 'approved',
                'active' => $action === 'approved',
                'moderation_status' => $action
            ]);
        } catch (Exception $e) {
            throw new Exception("Error moderating " . get_class($this) . ": {$e->getMessage()}");
        }
    }
}


