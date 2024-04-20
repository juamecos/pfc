<?php

namespace App\Traits;

trait HandlesModeration
{
    public function report()
    {
        $this->increment('report_count');
        if ($this->report_count > 2) {
            $this->update(['moderation_status' => 'pending']);
        }
    }

    public function moderate($action, $reason)
    {
        $this->moderationLogs()->create([
            'action_by' => auth()->id(),
            'action_taken' => $action,
            'reason' => $reason
        ]);
        $this->update([
            'abuse' => $action !== 'approved',
            'active' => $action === 'approved' ? true : false,
            'moderation_status' => $action
        ]);
    }
}
