<?php

namespace App\Http\Controllers\Game;

use DB;
use Auth;
use Helper;
use Session;
use Validator;
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
use App\Models\GamePlatformOnly;
use Illuminate\Http\JsonResponse;
use App\Models\GamesListTranslate;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class GameController extends Controller
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

        $gameRow   = GameList::where('slug', $request->slug)->first();
        //  dd($gameRow);
        $userId    = $this->userid;
        $user      = User::find($userId);
        $username  = !empty($user->username) ? $user->username : "";

        $apiConfig = ApiConfig::where('id', 1)->first(); // You can pass 'AG' dynamically if needed
        $apiurl   = $apiConfig->api_url;
        $api_key  = $apiConfig->api_key;
        $app_id   = $apiConfig->app_id;

        $chk = "APIURL: $apiurl, <br>APIKEY: $api_key, <br>APPID:$app_id";

        //start new script 
        $request->validate([
            // 'gameid'    => 'required|string',
            'token'     => 'required|string',
            'lang'      => 'nullable|string',
            //'nick' => 'required|string|max:40',
            'app_id'    => 'required|string',
            'cid'       => 'required|integer',
        ]);

        // Get form input
        $gameid         = !empty($gameRow) ? $gameRow->gameid : ""; //$request->input('gameid');
        $token          = $request->input('token');
        $lang           = 'en'; //$request->input('lang', 'en'); // Default language is 'en'
        $nick           = $username; //$request->input('nick');
        $app_id         = $app_id;
        $cid            = 0; //$request->input('cid');

        // API endpoint
        $apiUrl = '{APIURL}/api/usr/ingame'; // Replace {APIURL} with your actual API URL

        // Make the API request
        $response = Http::post($apiUrl, [
            'gameid' => $gameid,
            'token' => $token,
            'lang' => $lang,
            'nick' => $nick,
            'app_id' => $app_id,
            'cid' => $cid,
        ]);

        // Handle the response
        if ($response->successful()) {
            $data = $response->json();
            if ($data['code'] == 0) {
                // Success response
                return redirect()->back()->with('success', 'Successfully redirected to the game!')->with('gameurl', $data['data']['gameurl']);
            } else {
                return redirect()->back()->with('error', 'Error: ' . $data['msg']);
            }
        } else {
            // Handle failed API response
            return redirect()->back()->with('error', 'Failed to connect to the API.');
        }
        //END 

        // $url = isset($responseData['Data']['url']) ? $responseData['Data']['url'] : null;
        // return response()->json(['url' => $url]);
    }

    public function playerList(Request $request)
    {

        $page           = $request->input('page', 1);
        $pageSize       = $request->input('pageSize', 10);
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        $fitlergameytype = (int)$request->game_type;

        $query = playerList::orderBy('id', 'desc')
            ->select('players.*', 'users.name as playername')
            ->join('users', 'players.user_id', '=', 'users.id')
            ->orderBy('id', 'desc');

        if ($searchQuery !== null) {
            $query->where('name', 'like', '%' . $searchQuery . '%');
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);
        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            return [
                'user_id'          => $item->user_id,
                'account'          => $item->account,
                'api_key'          => $item->api_key,
                'api_code'         => $item->api_code,
                'username'         => $item->username,
                'show_password'    => $item->show_password,
                'playername'       => $item->playername,
                'created_at'       => date('d-m-Y', strtotime($item->created_at))

            ];
        });

        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }

    public function updateGame(Request $request)
    {

        $validator  = Validator::make($request->all(), [
            'gameName_en' => 'required',
            'status'      => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data['status']        = $request->status;
        $data['gameName_en']   = $request->gameName_en;


        if (!empty($request->file('files'))) {
            $files      = $request->file('files');
            $fileName   = Str::random(20);
            $ext        = strtolower($files->getClientOriginalExtension());
            $path       = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url   = $uploadPath . $path;
            $data['game_images'] = $file_url;
        }

        $post           = GamesAll::find($request->id);
        $post->update($data);
        $resdata['id']  = $request->id;

        return response()->json($resdata);
    }

    public function addonlyGamepltform(Request $request)
    {

        $validator  = Validator::make($request->all(), [
            'name'          => 'required',
            'status'        => 'required',
            'files'         => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'status'                     => $request->status,
        );

        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['image'] = $file_url;
        }

        if (empty($request->id)) {
            $resdata['id']               = GamePlatformOnly::insertGetId($data);
        } else {
            $post = GamePlatformOnly::find($request->id);
            $post->update($data);
            $resdata['id']               = $request->id;
        }
        return response()->json($resdata);
    }

    public function addGameCategory(Request $request)
    {
        // dd($request->all());

        $validator  = Validator::make($request->all(), [
            'name'          => 'required',
            'status'        => 'required',
            'game_type_id'  => 'required',
            'files'         => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'game_type_id'               => $request->game_type_id,
            'status'                     => $request->status,
        );

        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['image'] = $file_url;
        }

        if (empty($request->id)) {
            $resdata['id']               = GamePlatform::insertGetId($data);
        } else {
            $post = GamePlatform::find($request->id);
            $post->update($data);
            $resdata['id']               = $request->id;
        }
        return response()->json($resdata);
    }

    public function checkGameTypeRow($id)
    {
        $rowcheck = GameType::find($id);
        $imageurl = !empty($rowcheck->image) ? url($rowcheck->image) : "";
        $data['data']   = $rowcheck;
        $data['image']  = $imageurl;
        return response()->json($data);
    }

    public function checkGameCategory($id)
    {
        $rowcheck = GamePlatform::find($id);
        $imageurl = !empty($rowcheck->image) ? url($rowcheck->image) : "";
        $data['data']   = $rowcheck;
        $data['image']  = $imageurl;

        return response()->json($data);
    }

    public function checkGamePltfm($id)
    {
        $rowcheck = GamePlatformOnly::find($id);
        $imageurl = !empty($rowcheck->image) ? url($rowcheck->image) : "";
        $data['data']   = $rowcheck;
        $data['image']  = $imageurl;

        return response()->json($data);
    }

    public function checkGame($id)
    {
        $rowcheck = GamesAll::where('id', $id)->first();

        $roomData = [
            'id'        => $rowcheck->id,
            'gameName_en'=> $rowcheck->gameName_en,
            'status'    => $rowcheck->status,
            'images'    => !empty($rowcheck->game_images) ? url($rowcheck->game_images) :  ""
        ];

        return response()->json($roomData);
    }

    public function allGamesTypes()
    {
        $result = GameType::where('status', 1)->get();
        return response()->json($result);
    }

    public function addGameLangauges(Request $request)
    {

        $validator  = Validator::make($request->all(), [
            'name'          => 'required',
            'status'        => 'required',
            'langauge'      => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = array(
            'name'                       => $request->name,
            'status'                     => $request->status,
            'language'                   => $request->langauge,
        );

        if (empty($request->id)) {
            $resdata['id']               = GamesListTranslate::insertGetId($data);
        } else {
            $post = GamesListTranslate::find($request->id);
            $post->update($data);
            $resdata['id']               = $request->id;
        }
        return response()->json($resdata);
    }

    public function addGameType(Request $request)
    {

        // dd($request->file('files'));

        $validator  = Validator::make($request->all(), [
            'name'          => 'required',
            'status'        => 'required',
            'gameTypecode'  => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'status'                     => $request->status,
            'gameTypecode'               => $request->gameTypecode,
        );

        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['image'] = $file_url;
        }

        if (empty($request->id)) {
            $resdata['id']               = GameTypeModel::insertGetId($data);
        } else {
            $post = GameTypeModel::find($request->id);
            $post->update($data);
            $resdata['id']               = $request->id;
        }
        return response()->json($resdata);
    }

    public function allGamesListTranslate(Request $request)
    {

        //dd($request->all());
        $page           = $request->input('page', 1);
        $pageSize       = $request->input('pageSize', 10);
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        $searchGameCode = $request->searchGameCode;
        $filter_language = $request->filter_language;

        $query = GamesListTranslate::orderBy('id', 'desc')
            ->orderBy('id', 'desc');

        if ($searchQuery !== null) {
            $query->where('name', 'like', '%' . $searchQuery . '%');
        }

        if ($selectedFilter !== null) {
            $query->where('status', $selectedFilter);
        }

        if ($filter_language !== null) {
            $query->where('language', $filter_language);
        }

        if ($searchGameCode !== null) {
            $query->where('game_code', 'like', '%' . $searchGameCode . '%');
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);
        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'                => $item->id,
                'name'              => $item->name,
                'language'          => $item->language,
                'game_code'         => $item->game_code,
                'status'            => $item->status == 1 ? 'Active' : 'Inactive',
            ];
        });

        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }

    public function allGamesList(Request $request)
    {
       // dd($request->all());
        $page           = $request->input('page', 1);
        $pageSize       = $request->input('pageSize', 10);
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        $fitlergameytype= (int)$request->game_type;
        $game_platform  = $request->game_platform;
        $searchGameCode = $request->searchGameCode;

        //images
        $query = GamesAll::orderBy('id', 'desc')
            ->orderBy('id', 'desc');

        if ($searchQuery !== null) {
            $query->where('name', 'like', '%' . $searchQuery . '%');
        }
        if ($searchGameCode !== null) {
            $query->where('gameCode', 'like', '%' . $searchGameCode . '%');
        }

        if (!empty($fitlergameytype)) {
            $query->where('gametype_id', $fitlergameytype);
        }

        if (!empty($game_platform)) {
            //$query->where('platType', $game_platform);
            $query->where('platType', 'like', '%' . $game_platform . '%');
        }

        if ($selectedFilter !== null) {
            $query->where('status', $selectedFilter);
        }

        // if ($searchGameCode !== null) {
        //     $query->where('game_code', 'like', '%' . $searchGameCode . '%');
        // }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            $gtype = GameTypeModel::where('id', $item->gametype_id)->first();
            $pfrm  = GamePlatforms::where('id', $item->platform_id)->first();

            $gametypeId = $item->platType;

            $chkGameType = GameType::where('gameTypecode', $gametypeId)->first();
            $ingressStatus = '';
            // Check the value of $item->ingress using if-else statements
            if ($item->ingress == 1) {
                $ingressStatus = 'Computer web page';
            } elseif ($item->ingress == 2) {
                $ingressStatus = 'Mobile web page';
            } elseif ($item->ingress == 3) {
                $ingressStatus = 'Mobile web page';
            } elseif ($item->ingress == 4) {
                $ingressStatus = 'Launch in App';
            } elseif ($item->ingress == 6) {
                $ingressStatus = 'PC web page';
            } elseif ($item->ingress == 7) {
                $ingressStatus = 'Ultimate version';
            } else {
                $ingressStatus = 'Unknown'; // Default if no match
            }
            return [
                'id'                => $item->id,
                'platType'          => $item->platType ?? "",
                'gameType'          => $item->gameType ?? "",
                'gameTypeName'      => $item->gameTypeName ?? "",
                'gameCode'          => $item->gameCode ?? "",
                'ingress'           => $item->ingress ?? "",
                'game_images'       => !empty($item->game_images) ? url($item->game_images) : "" ,
                'ingressStatus'     => $ingressStatus ?? "",
                'gameName_zh_hant'  => $item->gameName_zh_hant ?? null,
                'gameName_zh_hans'  => $item->gameName_zh_hans ?? null,
                'gameName_en'       => $item->gameName_en ?? null,
                'status'            => 1,
                'created_at'        => now(),
                'updated_at'        => now(),
                'game_type'         => !empty($gtype) ? $gtype->name : "",
                'game_platfrm'      => !empty($pfrm) ? $pfrm->name : "",
                'status'            => $item->status == 1 ? 'Active' : 'Inactive',
            ];
        });

        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }

    public function onlyPltformList(Request $request)
    {
        $page           = $request->input('page', 1);
        $pageSize       = $request->input('pageSize', 100);
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        $fitlergameytype = (int)$request->game_type_id;

        $query = GamePlatformOnly::orderBy('id', 'desc')
            ->orderBy('id', 'desc');

        if ($searchQuery !== null) {
            $query->where('name', 'like', '%' . $searchQuery . '%');
        }

        if ($selectedFilter !== null) {
            $query->where('status', $selectedFilter);
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);
        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'                => $item->id,
                'name'              => $item->name,
                'image'             => !empty($item->image) ? url($item->image) : "",
                'status'            => $item->status == 1 ? 'Active' : 'Inactive',
            ];
        });

        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }

    public function allGameCategoryList(Request $request)
    {

        $page           = $request->input('page', 1);
        $pageSize       = $request->input('pageSize', 100);
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        $fitlergameytype = (int)$request->game_type_id;

        $query = GamePlatform::orderBy('id', 'desc')
            ->orderBy('id', 'desc');

        if ($searchQuery !== null) {
            $query->where('name', 'like', '%' . $searchQuery . '%');
        }

        if ($selectedFilter !== null) {
            $query->where('status', $selectedFilter);
        }

        if (!empty($fitlergameytype)) {
            $query->where('game_type_id', $fitlergameytype);
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);
        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            $gametypeRow = GameType::where('id', $item->game_type_id)->first() ?? '';

            return [
                'id'                => $item->id,
                'name'              => $item->name,
                'gametypeName'      => $gametypeRow->name ?? "",
                'image'             => !empty($item->image) ? url($item->image) : "",
                'status'            => $item->status == 1 ? 'Active' : 'Inactive',
            ];
        });

        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }

    public function allGameType(Request $request)
    {
        //dd($request->all());
        $page           = $request->input('page', 1);
        $pageSize       = $request->input('pageSize', 10);
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        $query = GameType::orderBy('gameTypecode', 'asc');

        if ($searchQuery !== null) {
            $query->where('name', 'like', '%' . $searchQuery . '%');
        }

        if ($selectedFilter !== null) {

            $query->where('status', $selectedFilter);
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);
        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            return [
                'id'                => $item->id,
                'name'              => substr($item->name, 0, 250),
                'gameTypecode'      => $item->gameTypecode,
                'image'             => !empty($item->image) ? url($item->image) : "",
                'status'            => $item->status == 1 ? 'Active' : 'Inactive',
            ];
        });

        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }
}