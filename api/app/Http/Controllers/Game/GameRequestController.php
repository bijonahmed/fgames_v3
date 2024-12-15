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
    protected $sn;
    protected $secretKey;
    protected $currency;
    protected $len;
    protected $ingress;
    public function __construct()
    {
        $this->middleware('auth:api');
        $id = auth('api')->user();
        if (!empty($id)) {
            $user = User::find($id->id);
            $this->userid = $user->id;
            $this->sn = "guw"; // Replace with your SN
            $this->secretKey = "2SW80tB9C22800TrO64f9HcA761JR299"; // Replace with your secret key
            $this->currency  = "USD";
            $this->len       = 'en';
            $this->ingress   = 'device1';
        }
    }



    public function platformTypeGames(Request $request)
    {
        // dd($request->all());
        $uCheckPoint  = User::where('id', $this->userid)->first();
        $username     = $uCheckPoint->username ?? "";
        $chkGameType  = GameType::where('id', $request->gameType)->first();
        $gameTypeCode = (int)$chkGameType->gameTypecode ?? "";

        // Input Data
        $playerId = $username; //"test001";
        $platType = $request->platType ?? ""; //"ag";
        $currency = $this->currency; //"CNY";
        $gameType = $gameTypeCode; //2; // Adding gameType parameter
        $return   = $this->createPlayer($playerId, $platType, $currency, $gameType);

        // $responseCode      = $return['response']['code'] ?? null;
        // $responseMessage   = $return['response']['msg'] ?? null;
        // $request_success   =  10000;

        $platformPlayGames = $this->platformPlayGames($playerId, $platType, $currency, $gameType, $gameTypeCode);
        // Decode the response
        $responseData = json_decode(json_encode($platformPlayGames), true);

        // Extract code and msg from response_url
        $responseCode    = $responseData['response_url']['code'] ?? null;
        $responseMessage = $responseData['response_url']['msg'] ?? null;
        $dataUrl         = $responseData['response_url']['data']['url'] ?? null;

        // Debug extracted variables
        // Conditions based on responseCode
        if ($responseCode == 10000) {
            // Success: Return JSON URL
            return response()->json([
                'success' => true,
                'url' => $dataUrl,
            ]);
        } else {
            // Map error codes to messages
            $errorMessages = [
                10001 => "Request error",
                10002 => "PlayerId already exists",
                10003 => "PlayerId does not exist",
                10004 => "PlayerId format error",
                10005 => "Transfer error",
                10006 => "Amount error",
                10007 => "Wrong time format",
                10008 => "ReturnUrl error",
                10009 => "Frequent interface requests",
                10010 => "Request error",
                10011 => "OrderId is not specified",
                10012 => "OrderId already exists",
                10013 => "OrderId does not exist",
                10014 => "Insufficient quota",
                10403 => "IP restricted access",
                10404 => "Signature verification failed",
                10405 => "Missing parameter: playerId/platType/amount/type/currency/gameType",
                10407 => "PlatType code error",
                10408 => "GameType error",
                10409 => "Type error",
            ];

            $errorMessage = $errorMessages[$responseCode] ?? "Unknown error";

            return response()->json([
                'success' => false,
                'code' => $responseCode,
                'message' => $errorMessage,
            ]);
        }
    }


    public function platformPlayGames($playerId, $platType, $currency, $gameType, $gameTypeCode)
    {
        //dd($request->all());

        // echo "$playerId, $platType, $currency, $gameType-----,$gameTypeCode";


        $uCheckPoint  = User::where('id', $this->userid)->first();
        $username     = $uCheckPoint->username ?? "";
        //dd($gameTypeCode);

        // Configuration
        $apiUrl     = "https://ap.api-bet.net/api/server/gameUrl";
        $sn         = $this->sn;
        $secretKey  = $this->secretKey; // Replace with your secret key

        // Input Data
        $playerId = $username; //"test001";
        $platType = $platType ?? ""; //"ag";
        $currency = $this->currency; //"CNY";
        $gameType = $gameTypeCode; //2; // Adding gameType parameter
        $this->createPlayer($playerId, $platType, $currency, $gameType);
        //exit;
        // Generate headers
        $random    = $this->generateRandomString();
        $signature = $this->generateSignature($random, $sn, $secretKey);

        // Prepare the request payload
        $data = [
            "playerId" => $playerId,
            "platType" => $platType,
            "currency" => $currency,
            "gameType" => $gameType,
            "lan"      => $this->len, //'en',
            "ingress"  => $this->ingress, //'device1',

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
        $err      = curl_error($curl);
        $jsonData = json_encode($data, JSON_PRETTY_PRINT);
        curl_close($curl);


        $decodedResponse = json_decode($response, true); // Decode the JSON response

        if ($err) {
            return [
                'error' => true,
                'message' => $err,
            ];
        }

        return [
            'httpCode' => $httpCode,
            'response_url' => json_decode($response, true),
            'requestPayload' => $data,
        ];

        // Handle the response
        /*
        if ($err) {
            echo "cURL Error: " . $err;
        } else {
            echo "<h3>Request Details</h3>";
            echo "<p>URL: $apiUrl</p>";
            echo "<p>Headers: <pre>" . print_r($headers, true) . "</pre></p>";
            echo "<p>Payload: <pre>" . json_encode($data, JSON_PRETTY_PRINT) . "</pre></p>";
            echo "<h3>Response</h3>";
            echo "<p>HTTP Status Code: $httpCode</p>";
            echo "<pre>" . htmlspecialchars($response) . "</pre>";
        }*/
    }

    public function createPlayer($playerId, $platType, $currency, $gameType)
    {
        //echo "$playerId , $platType, $currency, $gameType";
        // Configuration
        $apiUrl     = "https://ap.api-bet.net/api/server/create";
        $sn         = $this->sn;
        $secretKey  = $this->secretKey; // Replace with your secret key

        // Input Data
        $playerId = $playerId; //"test01";
        $platType = $platType; //"bg";
        $currency = $currency; //"CNY";
        $gameType = $gameType; //1; // Adding gameType parameter

        // Generate headers
        $random    = $this->generateRandomString();
        $signature = $this->generateSignature($random, $sn, $secretKey);

        // Prepare the request payload
        $data = [
            "platType" => $platType,
            "playerId" => $playerId,
            "currency" => $currency,
            "gameType" => $gameType,
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

        $createPlayerResponse = htmlspecialchars($response);
        $jsondata = json_encode($data, JSON_PRETTY_PRINT);

        //$jdata['createPlayerResponse']=$createPlayerResponse;
        //$jdata['jsondata']            =$jsondata;

        if ($err) {
            return [
                'error' => true,
                'message' => $err,
            ];
        }

        return [
            'httpCode' => $httpCode,
            'response' => json_decode($response, true),
            'requestPayload' => $data,
        ];

        // echo '<pre>';
        //print_r($jdata);


        // return response()->json($jsondata,200);

        // Handle the response
        // if ($err) {
        //     echo "cURL Error: " . $err;
        // } else {
        //     echo "<h3>Request Details</h3>";
        //     echo "<p>URL: $apiUrl</p>";
        //     echo "<p>Headers: <pre>" . print_r($headers, true) . "</pre></p>";
        //     echo "<p>Payload: <pre>" . json_encode($data, JSON_PRETTY_PRINT) . "</pre></p>";
        //     echo "<h3>Response</h3>";
        //     echo "<p>HTTP Status Code: $httpCode</p>";
        //     echo "<pre>" . htmlspecialchars($response) . "</pre>";
        // }

    }







    function generateRandomString($length = 16)
    {
        return substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyz', $length)), 0, $length);
    }

    function generateSignature($random, $sn, $secretKey)
    {
        return md5($random . $sn . $secretKey);
    }
}
