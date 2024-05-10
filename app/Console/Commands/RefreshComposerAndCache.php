<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class RefreshComposerAndCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:refresh-composer-and-cache';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Clearing and refreshing Laravel caches...');

        // Clear and refresh Laravel caches
        Artisan::call('config:clear');
        $this->info(Artisan::output());

        Artisan::call('route:clear');
        $this->info(Artisan::output());

        Artisan::call('view:clear');
        $this->info(Artisan::output());

        Artisan::call('cache:clear');
        $this->info(Artisan::output());

        Artisan::call('config:cache');
        $this->info(Artisan::output());

        Artisan::call('route:cache');
        $this->info(Artisan::output());

        Artisan::call('view:cache');
        $this->info(Artisan::output());

        // Run `composer dump-autoload`
        $this->info('Running composer dump-autoload...');
        exec('composer dump-autoload', $output, $returnVar);

        foreach ($output as $line) {
            $this->info($line);
        }

        if ($returnVar === 0) {
            $this->info('Composer dump-autoload completed successfully.');
            return Command::SUCCESS;
        } else {
            $this->error('Composer dump-autoload failed.');
            return Command::FAILURE;
        }
    }
}
