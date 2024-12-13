<?php

namespace App\Http\Controllers\Game;

use DB;
use Auth;
use Helper;
use Session;
use Validator;
use App\Models\Game;
use App\Models\User;
use App\Models\GameList;
use App\Models\GamesAll;
use App\Models\GameType;
use App\Models\ApiConfig;
use App\Models\playerList;
use Illuminate\Support\Str;
use App\Models\GameCategory;
use App\Models\GamePlatform;
use Illuminate\Http\Request;
use App\Models\GamePlatforms;
use App\Models\GameTypeModel;
use App\Rules\MatchOldPassword;
use Illuminate\Http\JsonResponse;
use App\Models\GamesListTranslate;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class GameRequestController extends Controller
{
    protected $userid;
    public function __construct()
    {
        $this->middleware('auth:api');
        $id = auth('api')->user();
        if (!empty($id)) {
            $user = User::find($id->id);
            $this->userid = $user->id;
        }
    }

    public function requesttoGame(Request $request)
    {

        // dd($request->all());

        $gamechkPoint = GamesAll::where('slug', $request->slug)->first();
        $uCheckPoint  = User::where('id', $this->userid)->first();

        $gameId       = $gamechkPoint->gameid ?? ""; // Use null coalescing operator to handle null cases
        $uname        = $uCheckPoint->username ?? ""; // Use null coalescing operator to handle null cases
        
        //dd($gameId);
        $apiUrl       = 'https://api-gametest.omgapi.cc/api/usr/ingame';
        $secretKey    = 'dc7df6a77d8e82fcf26062d773b8d385'; // Replace with your actual secret key
        $appId        = '771'; // Replace with your actual app ID
        $traceId      = uniqid();

        /*
        $request->validate([
            'gameId'    => 'required',
            'token'     => 'required',
            'lang'      => 'required',
            'nick'      => 'required',
            //'nick'      => 'required|unique:request_games,nick',
            'cid'       => 'required',
        ]);
        */

        // Dynamic request parameters
        $getDynamicToken = $this->generateToken();
        $gameId = "{$gameId}";
        $token  = "{$getDynamicToken}"; //"{$request->token}";  
        $lang   = "en";   //'{$request->lang}';
        $nick   = "{$uname}"; //'{$request->nick}';
        $cid    = 0;

        // Generate a unique trace ID for this request
        $traceId = uniqid();

        // Prepare request data as an array
        $requestData = [
            'gameid' => $gameId,
            'token'  => $token,
            'lang'   => $lang,
            'nick'   => $nick,
            'app_id' => $appId,
            'cid'    => $cid
        ];


        $originalJsonBody = json_encode($requestData, JSON_UNESCAPED_SLASHES);
        // Create URL parameters for signature
        $urlParams = 'trace_id=' . $traceId;
        // Generate the signature using the original JSON string
        $signature = $this->generateSignature($urlParams, $originalJsonBody, $secretKey);
        // Prepare request data as an array
        $requestData['sign']      = $signature;
        $requestData['traceId']   = $traceId;
        $requestData['uname']     = $uname;
        $requestData['userid']    = $this->userid;

        // Convert the request data to JSON without re-encoding for signature
        // Initialize cURL
        $ch = curl_init();

        // Set cURL options
        curl_setopt($ch, CURLOPT_URL, $apiUrl . '?' . $urlParams);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json;charset=UTF-8',
            'sign: ' . $signature,
        ]);
        // Attach the original JSON body to the request
        curl_setopt($ch, CURLOPT_POSTFIELDS, $originalJsonBody);
        // Execute the cURL request
        $response = curl_exec($ch);

        // Check for cURL errors
        if ($response === false) {
            echo 'cURL Error: ' . curl_error($ch);
        } else {
            // Decode the API response
            $responseData = json_decode($response, true);
            if (isset($responseData['data']['gameurl']) && !empty($responseData['data']['gameurl'])) {
                $gameUrl = $responseData['data']['gameurl'];
                // dd($gameUrl);
                Game::create($requestData);

                $url = isset($responseData['Data']['url']) ? $responseData['Data']['url'] : null;
                return response()->json(['url' => $gameUrl]);

                return response()->json([
                    'url'   => $gameUrl,
                    'token' => $token, // Passing traceId along with the URL
                ]);

                //  header("Location: $gameUrl");
                // exit(); // Important to stop further script execution after redirect
            } else {
                // Output the response if no game URL is present
                $code = isset($responseData['code']) ? $responseData['code'] : 'Unknown Code';
                $msg  = isset($responseData['msg']) ? $responseData['msg'] : 'No message available';
               
                return response()->json([
                    'success' => false,
                    'code' => $code,
                    'message' => $msg,
                    'data' => $responseData['data'] ?? [],
                ]);
            }
        }

        // Close cURL session
        curl_close($ch);
        return response()->json("Success");
    }


    function generateToken()
    {

        $uniqueId = uniqid('', true);
        // Create a version 4 UUID format (like your example)
        $data = random_bytes(16);
        // Set the version (4) and variant (10xx) bits according to RFC 4122
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 4
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set variant to 10xx

        // Format the data into a UUID string
        $uuid = vsprintf('%s-%s-%s-%s-%s', str_split(bin2hex($data), 4));
        return $uuid;
    }

    private function generateTraceId()
    {
        return 'omg_' . time() . '_' . bin2hex(random_bytes(8));
    }

    function generateSignature($urlParams, $body, $secretKey)
    {
        // Concatenate URL parameters, original JSON body string, and secret key
        return md5($urlParams . $body . $secretKey);
    }
}
