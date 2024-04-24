<?php

namespace App\Services;

use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\HttpClientException;
use Illuminate\Support\Facades\Log;

class GuildApplicationService
{
    public function assignRole($role, $user)
    {
        try {
            $role = Role::where('name', $role)->firstOrFail();
            Http::withHeaders([
                'Authorization' => 'Bot ' . env('DISCORD_APPLICATION_TOKEN'),
                'Content-Type' => 'application/x-www-form-urlencoded',
            ])->put('https://discord.com/api/guilds/' . env('DISCORD_GUILD_ID') . '/members/' . $user->id . '/roles/' . $role->id);
        } catch (\Exception $e) {
            Log::error('Error sending message: ' . $e->getMessage());

            throw $e;
        }
    }

    public function removeRole($role, $user)
    {
        try {
            $role = Role::where('name', $role)->firstOrFail();
            Http::withHeaders([
                'Authorization' => 'Bot ' . env('DISCORD_APPLICATION_TOKEN'),
                'Content-Type' => 'application/x-www-form-urlencoded',
            ])->delete('https://discord.com/api/guilds/' . env('DISCORD_GUILD_ID') . '/members/' . $user->id . '/roles/' . $role->id);
        } catch (\Exception $e) {
            Log::error('Error sending message: ' . $e->getMessage());

            throw $e;
        }
    }

    public function createChannel($user)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bot ' . env('DISCORD_APPLICATION_TOKEN'),
                'Content-Type' => 'application/json',
            ])->post('https://discord.com/api/users/@me/channels', [
                'recipient_id' => $user->id,
            ]);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('Error sending message: ' . $e->getMessage());

            throw $e;
        }
    }

    public function sendMessage($channel, $message)
    {
        try {
            Http::withHeaders([
                'Authorization' => 'Bot ' . env('DISCORD_APPLICATION_TOKEN'),
                'Content-Type' => 'application/json',
            ])->post('https://discord.com/api/channels/' . $channel['id'] . '/messages', [
                'content' => $message,
            ])->throw();
        } catch (\Exception $e) {
            Log::error('Error sending message: ' . $e->getMessage());

            throw $e;
        }
    }

    public function generateWelcomeMessage()
    {
        return "Welcome to the Guild! Incoming copypasta with some information

You will be given a guildmate role in our Discord, you can find all the information about our guild here:  https://discord.com/channels/944203277552197673/1034014408516567060/1034027338670809148

- You will have a trial member status until we are sure you are a good fit for our community.
- We will accept you into the guild and in-game global chat.
- If you are applying to our alt guilds please let us know your character names so we know its you. Let an officer know or post here https://discord.com/channels/944203277552197673/950515768750137415

**Most Important:**
- Change your Discord nickname to your IGN (you can put preferred name in brackets)
- Choose your roles in <id:customize> 
- Go to Anamcara server settings and check \"Show all Channels\" to ensure you see everything
- Introduce yourself https://discord.com/channels/944203277552197673/963124464348954675
- Sign up for GVG https://discord.com/channels/944203277552197673/976986400048185434
- Find parties in https://discord.com/channels/944203277552197673/952271026593624095

Please feel free to hop into VC anytime and get to know us, we are extremely lucky to have such a friendly community and we look forward to getting to know you!

If you have any more questions please let me know.";
    }
}
