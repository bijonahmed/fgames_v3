<?php

namespace App\Http\Controllers\Api;

use Auth;
use Helper;
use Session;
use Validator;
use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use App\Models\GameList;
use App\Models\GameType;

use App\Models\ApiConfig;
use App\Models\GameTypes;
use Illuminate\Support\Str;
use App\Models\GameCategory;
use Illuminate\Http\Request;
use App\Models\GamePlatforms;
use App\Rules\MatchOldPassword;
use App\Models\GamePlatformOnly;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http; // Add this import

class GameApiController extends Controller
{

    protected $apiUrl;
    protected $secretKey;
    protected $sn;

    public function __construct(Request $request)
    {
        // Fetch configuration from the database
        $this->sn = "guw";
        $this->secretKey = "2SW80tB9C22800TrO64f9HcA761JR299"; // Replace with your secret key
        $this->apiUrl = "https://ap.api-bet.net/api/server/gameCode";
    }


    public function gameList(Request $request)
    {

        $platform_name = $request->platform_name ?? "";
        // Configuration
        $apiUrl     = $this->apiUrl;
        $sn         = $this->sn; // Replace with your SN
        $secretKey  = $this->secretKey; // Replace with your secret key
        $platType   = "$platform_name"; //"yoo";
        // Generate headers
        $random = $this->generateRandomString();
        $signature = $this->generateSignature($random, $sn, $secretKey);
        // Prepare the request payload
        $data = [
            // "platType" => $platType
            "platType" => $platType
        ];

        $headers = [
            "Content-Type: application/json",
            "random: $random",
            "sign: $signature",
            "sn: $sn",
        ];

        // Initialize cURL
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $apiUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => $headers,
        ]);

        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $err = curl_error($curl);

        curl_close($curl);

        // Handle the response
        if ($err) {
            //   echo "<h3>cURL Error:</h3><p>" . htmlspecialchars($err) . "</p>";
        } else {
            // echo "<h3>Request Details</h3>";
            // echo "<p>URL: $apiUrl</p>";
            // echo "<p>Headers: <pre>" . print_r($headers, true) . "</pre></p>";
            // echo "<p>Payload: <pre>" . json_encode($data, JSON_PRETTY_PRINT) . "</pre></p>";
            // echo "<h3>Response</h3>";
            // echo "<p>HTTP Status Code: $httpCode</p>";

            $responseData = json_decode($response, true); // Decode JSON into an associative array

            if (json_last_error() === JSON_ERROR_NONE) {
                //echo "<h3>Response Data:</h3>";
                // Iterate over the array and display data
                //echo '<pre>';
                //print_r($responseData);
            }

            if (empty($data) || !is_array($data)) {
                return response()->json(['error' => 'Invalid data provided'], 400);
            }


            $data = $responseData['data'] ?? [];
            //dd($data);
            if (empty($data) || !is_array($data)) {
                return response()->json(['error' => 'Invalid data provided'], 400);
            }

            $gamesToInsert = [];

            foreach ($data as $game) {
                // Check if the game with the same platType and gameType exists
                $exists = GameList::where('platType', $game['platType'])
                    ->where('gameType', $game['gameType'])
                    ->exists();
                
                $gametypeId = $game['gameType'] ?? "";

                $chkGameType = GameType::where('gameTypecode',$gametypeId)->first(); 
                $ingressStatus = '';
                // Check the value of $game['ingress'] using if-else statements
                if ($game['ingress'] == 1) {
                    $ingressStatus = 'Computer web page';
                } elseif ($game['ingress'] == 2) {
                    $ingressStatus = 'Mobile web page';
                } elseif ($game['ingress'] == 3) {
                    $ingressStatus = 'Mobile web page';
                } elseif ($game['ingress'] == 4) {
                    $ingressStatus = 'Launch in App';
                } elseif ($game['ingress'] == 6) {
                    $ingressStatus = 'PC web page';
                } elseif ($game['ingress'] == 7) {
                    $ingressStatus = 'Ultimate version';
                } else {
                    $ingressStatus = 'Unknown'; // Default if no match
                }
                if (!$exists) {
                    $gamesToInsert[] = [
                        'platType'          => $game['platType'],
                        'gameType'          => $game['gameType'] ?? "",
                        'gameTypeName'      => $chkGameType->name ?? "", 
                        'gameCode'          => $game['gameCode'] ?? "",
                        'ingress'           => $game['ingress'] ?? "",
                        'ingressStatus'     => $ingressStatus ?? "",
                        'gameName_zh_hant'  => $game['gameName']['zh-hant'] ?? null,
                        'gameName_zh_hans'  => $game['gameName']['zh-hans'] ?? null,
                        'gameName_en'       => $game['gameName']['en'] ?? null,
                        'status'            => 1,
                        'created_at'        => now(),
                        'updated_at'        => now(),
                    ];
                }
            }

            if (!empty($gamesToInsert)) {
                try {
                    // Insert multiple rows at once
                    GameList::insert($gamesToInsert);
                    // Fetch all newly inserted records
                    $insertedGames = GameList::whereIn('platType', array_column($gamesToInsert, 'platType'))
                        ->whereIn('gameType', array_column($gamesToInsert, 'gameType'))
                        ->get();

                    return response()->json([
                        'message' => 'Games inserted successfully',
                        'data' => $insertedGames,
                    ], 200);
                } catch (\Exception $e) {
                    return response()->json(['error' => $e->getMessage()], 500);
                }
            }

            return response()->json(['message' => 'No new games to insert'], 200);
        }
    }

    function generateRandomString($length = 16)
    {
        return substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyz', $length)), 0, $length);
    }

    function generateSignature($random, $sn, $secretKey)
    {
        return md5($random . $sn . $secretKey);
    }


    public function gamePlatformOnly()
    {

        $data['data'] = GamePlatformOnly::where('status', 1)->get();
        return response()->json($data);
    }
}
