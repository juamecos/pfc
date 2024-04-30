<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasGeographicalData;

class Found extends Model
{
    use HasFactory, HasGeographicalData;

    protected $fillable = ['stone_id', 'user_id', 'latitude', 'longitude', 'location', 'country', 'city'];

    /**
     * The attributes that are spatial fields.
     *
     * @var array
     */
    protected $spatialFields = [
        'location'
    ];

    protected $hidden = ['location'];



    public function stone()
    {
        return $this->belongsTo(Stone::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The "booting" method of the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Before saving the Stone, handle setting code and location attributes.
        static::saving(function ($found) {
            $found->setLocation();
        });
    }
}
