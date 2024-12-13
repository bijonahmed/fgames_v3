<?php

namespace App\Http\Controllers\Game;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;



class SessionVerificationController extends Controller
{
    public function verifySession(Request $request)
    {

      //  echo "test";
        // echo "<pre>";
      // dd($request->all());

        
        $rawData = file_get_contents("php://input");

        // this returns null if not valid json
        $var1 = time();
        $rawData = json_decode($rawData);
       // dd($rawData);
        file_put_contents("{$var1}_1.txt", json_encode($rawData));

        // $data = $request->validate([
        //     'app_id' => 'required',
        //     'timestamp' => 'required',
        //     'operator_player_session' => 'required',
        //     'ip' => 'nullable|string',
        //     'custom_parameter' => 'nullable',
        //     'game_id' => 'nullable',
        // ]);

        $data['app_id']                  = '771';
        $data['timestamp']               = time();
        $data['operator_player_session'] = $request->operator_player_session;
       

        file_put_contents("{$var1}_2.txt", json_encode($data));
        //echo json_encode($data);
        $traceId = $request->operator_player_session;


        // Step 3.4: Send the POST Request to OMG API
        if (!empty($traceId)) {
            $chk =  Game::where('token', $traceId)->first();
            //dd($chk);

            $succ = [
                "code" => 1,
                "msg" => "ok",
                "data" => [
                    "uname" => !empty($chk) ? $chk->nick : "", //"10003803",
                    "nickname" => !empty($chk) ? $chk->nick : "", //"bill",
                    "balance" => "42766.25"
                ]
            ];


            return response()->json($succ);
        } else {
            echo '{
            "code": 10002,
            "msg": "sign invalid"
        }';
            return;
        }

        // Step 3.5: Handle the Response
        if ($response->successful() && $response->json('code') == 1) {
        }
        return response()->json(['status' => 'error', 'msg' => $response->json('msg') ?? 'Failed to connect to OMG API'], 400);
    }


    public function get_balance(Request $request)
    {
        $uname = $request->uname;
        if (!empty($uname)) {
            $chk =  Game::where('nick', $uname)->first();
            //dd($chk);
            $succ = [
                "code" => 1,
                "msg" => "ok",
                "data" => [
                    "balance" => "42766.25"
                ]
            ];

            return response()->json($succ);
        } else {
            echo '{
                    "code": 10002,
                    "msg": "sign invalid"
                }';
            return;
        }
    }



    private function generateTraceId()
    {
        return 'omg_' . time() . '_' . bin2hex(random_bytes(8));
    }

    private function generateSign($urlParams, $body)
    {
        $secretKey = "dc7df6a77d8e82fcf26062d773b8d385";
        // Concatenate URL parameters, original JSON body string, and secret key
        return md5($urlParams . $body . $secretKey);
    }
}