<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasGeographicalData;
use App\Traits\HandlesModeration;
use Illuminate\Support\Str;


class Stone extends Model
{
    use HasFactory, HasGeographicalData, HandlesModeration;

    protected $fillable = [
        'image',
        'title',
        'description',
        'latitude',
        'longitude',
        'country',
        'city',
        'active',
        'abuse',
        'code',
        'user_id',
        'moderation_status',
        'report_count',
        'location'
    ];

    protected $casts = [
        'active' => 'boolean',
        'abuse' => 'boolean',
    ];

    /**
     * The attributes that are spatial fields.
     *
     * @var array
     */
    protected $spatialFields = [
        'location'
    ];

    protected $hidden = ['location'];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['user', 'likes', 'comments', 'founds'];

    /**
     * Get the owning user of the stone.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all of the likes for the stone.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    /**
     * Get all of the comments for the stone.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     *
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * get all of the founds for the stone.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function founds()
    {
        return $this->hasMany(Found::class);
    }

    /**
     * Get all of the moderation logs for the stone.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function moderationLogs()
    {
        return $this->morphMany(ModerationLog::class, 'moderatable');
    }

    /**
     * The "booting" method of the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Before saving the Stone, handle setting code and location attributes.
        static::saving(function ($stone) {
            $stone->generateUniqueCode();
            $stone->setLocation();
        });
    }


    /**
     * Generate a unique code for the Stone model.
     * This method generates a unique code based on the user's initials and a random hexadecimal string.
     * It ensures the generated code is unique within the database.
     */
    protected function generateUniqueCode(): void
    {
        try {
            if (isset($this->user_id)) {
                do {
                    $user = User::find($this->user_id);
                    if ($user) {
                        $initials = strtoupper(substr($user->name, 0, 3));
                        $hex = strtoupper(Str::random(4));
                        $code = $initials . '-' . $hex;
                    } else {
                        // Handle the case where the user is not found
                        throw new \Exception("Unable to generate code: User with ID {$this->user_id} not found.");
                    }
                } while ($this->where('code', $code)->exists()); // Ensure code is unique

                $this->code = $code; // Set the unique code
            } else {
                // Handle the case where user_id is not set
                throw new \Exception("Unable to generate code: User ID is not set on the Stone model.");
            }
        } catch (\Exception $e) {
            // Log the error and provide a semantic error message
            report($e);
            // Rethrow with a semantic error message to inform upstream processes of the specific error
            throw new \Exception("Failed to generate a unique code for the Stone model: " . $e->getMessage(), 0, $e);
        }
    }
}
