<?php

namespace App\Http\Controllers\Trading;

use App\Http\Controllers\Controller;
use App\Models\BuyToken;
use App\Models\MiningBalanceSum;
use App\Models\Setting;
use App\Models\Trade;
use App\Models\TradingCategory;
use App\Models\TradingDuration;
use App\Models\TradingSubCategory;
use App\Models\ManualAdjustment;
use Illuminate\Http\Request;
use Auth;
use Validator;
use Helper;
use App\Models\User;
use Illuminate\Support\Str;
use App\Rules\MatchOldPassword;
use Illuminate\Support\Facades\Hash;
use Session;
use DB;
use PhpParser\Node\Stmt\TryCatch;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class TradingController extends Controller
{
    protected $userid;
    protected $name;
    public function __construct()
    {
        $this->middleware('auth:api');
        $id = auth('api')->user();
        $user = User::find($id->id);
        $this->userid = $user->id;
        $this->name = $user->name;
    }

    public function getCurrentPrice()
    {

        $data                    = Setting::where('id', 1)->first();
        $total_supply            = $data->total_supply;
        $liquidity_total_supply  = $data->liquidity_total_supply;
        $buyToken                = BuyToken::sum('usdt_amount');

        $result_1 = floatval($liquidity_total_supply) + floatval($buyToken);
        $b_price = $result_1 / $total_supply;
        $current_price = number_format($b_price, 10, '.', '');
        $response = [
            'current_price'    => $current_price,
            'message'          => 'success'
        ];

        return response()->json($response, 200);
    }

    public function getToken()
    {

        $response          = app('App\Http\Controllers\Balance\BalanceController')->getBalance();
        $ocntoken          = $response instanceof JsonResponse ? $response->getData(true)['ocn_token'] : 0;
        $response = [
            'ocntoken'    => $ocntoken,
            'message'          => 'success'
        ];

        return response()->json($response, 200);
    }

    public function cerculatingSupply()
    {

        $buyToken = BuyToken::sum('get_token');
        $miningBalanceSum     = MiningBalanceSum::where('user_id', $this->userid)
            ->whereNotNull('ocn_balance')
            ->sum('ocn_balance');

        $totalSum = $buyToken + $miningBalanceSum;
        $response = [
            'csupply'    => $totalSum,
            'message'    => 'success'
        ];

        return response()->json($response, 200);
    }

    public function buyocnToken(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'usdt_amount'  => 'required|numeric|gt:0',
                'current_price' => 'required',
                'get_token'    => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $setting = Setting::find(1);
            $checkSetting = $setting->minimum_purchages_amt;

            if ($request->usdt_amount <= $checkSetting) {
                return response()->json(['errors' => ['usdt_amount' => ['Your usdt amount is low']]], 422);
            }
            $data = array(

                'usdt_amount'        => $request->usdt_amount,
                'current_price'      => $request->current_price,
                'get_token'          => $request->get_token,
                'user_id'            => $this->userid
            );
            $last_Id = BuyToken::insertGetId($data);

            return response()->json($last_Id);
        } catch (QueryException $e) {
            // Log the error or handle it as needed
            return response()->json(['error' => 'Database error occurred.'], 500);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['error' => 'An unexpected error occurred.'], 500);
        }
    }

    public function allTradingHistoryData()
    {
        try {
            $history = Trade::where('user_id', $this->userid)
                ->join('trading_category', 'trade.category_id', '=', 'trading_category.id')
                ->join('trading_subcategory', 'trade.subcategory_id', '=', 'trading_subcategory.id')
                ->orderBy('id', 'desc')
                ->select('trade.*', 'trading_category.name as category_name', 'trading_subcategory.name as subcategory_name')
                ->get();
            $customTimeZone = 'Asia/Dhaka';
            $currentTime    = Carbon::now($customTimeZone);
            // Format the datetime as needed
            $realtimeUpdate = $currentTime->format('Y-m-d H:i:s');

            foreach ($history as $trade) {
                $trade->request_datetime = $realtimeUpdate;
                $trade->save();
            }
            $response = [
                'data'    => $history,
                'message' => 'success'
            ];

            return response()->json($response, 200);
        } catch (\Exception $e) {
            // Log the exception message
            Log::error('Error retrieving trade history: ' . $e->getMessage());
            $response = [
                'data'    => [],
                'message' => 'Failed to retrieve trade history. Please try again later.'
            ];

            return response()->json($response, 500);
        }
    }

    public function insertTrading(Request $request)
    {
        //dd($request->all());
        $validator = Validator::make($request->all(), [
            'durationId'         => 'required|integer',
            'durationDay'        => 'required',
            'percentage'         => 'required',
            'estProfit'          => 'required',
            'tradingAmount'      => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userId  = $this->userid;
        $tradeID = $userId; // Assuming $userId is the tradeID
        $hash    = md5(time()); // Generate MD5 hash

        $customTimeZone = 'Asia/Dhaka';
        $currentTime    = Carbon::now($customTimeZone);
        $endTime        = Carbon::now($customTimeZone);
        $endTime->addHours($request->durationHours);
        // Format the datetime as needed
        $start_datetime    = $currentTime->format('Y-m-d H:i:s');
        $end_datetime      = $endTime->format('Y-m-d H:i:s');

        $tradingAmount  = !empty($request->tradingAmount) ? $request->tradingAmount : 0;
        $tfee           = !empty($request->trading_fee) ? $request->trading_fee : 0;
        $netprofit      = $request->estProfit - $tfee;

        $data    = array(
            'unique_md5'           => $hash,
            'user_id'              => $userId,
            'category_id'          => $request->category_id,
            'subcategory_id'       => $request->subcategory_id,
            'durationId'           => $request->durationId,
            'durationDay'          => $request->durationDay,
            'durationHours'        => $request->durationHours,
            'durationPercentage'   => $request->percentage,
            'estProfit'            => $request->estProfit,
            'tradeAmount'          => $request->tradingAmount,
            'trading_fee'          => $request->trading_fee,
            'net_profit'           => $netprofit,
            'start_datetime'       => $start_datetime,
            'end_datetime'         => $end_datetime,
        );

        $response          = app('App\Http\Controllers\Balance\BalanceController')->getBalance();
        $usdtdepositAmount = $response instanceof JsonResponse ? $response->getData(true)['usdtamount'] : 0;
        $tradingAmount     = !empty($request->tradingAmount) ? $request->tradingAmount : "";

        if ($tradingAmount > $usdtdepositAmount) {
            return response()->json(['invalid_amount' => "Sorry, invalid request. Your balance is now $usdtdepositAmount USDT"], 422);
        }

        if ($tradingAmount < $request->min_trade) {
            return response()->json(['invalid_min_amount' => "Sorry, minimum trade request amount $request->min_trade USDT "], 422);
        }

        $lastId             = Trade::insertGetId($data);
        $formatedNumbe      = sprintf('%06d', $lastId);
        Trade::where('id', $lastId)->update(['tradeID' => 'TID' . $formatedNumbe]);

        $response = [
            'message' => 'success',
        ];
        return response()->json($response, 200);
    }

    public function getDurationList()
    {
        try {

            $response          = app('App\Http\Controllers\Balance\BalanceController')->getBalance();
            $usdtAmount        = $response instanceof JsonResponse ? $response->getData(true)['usdt_amount'] : 0;

            $rows = TradingDuration::where('status', 1)->get();
            $data['data']       = $rows;
            $data['usdtAmount'] = $usdtAmount;
            if ($data) {
                return response()->json($data, 200);
            } else {
                return response()->json(['message' => 'Data not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    public function checksubcategoryRow(Request $request)
    {

        try {
            $data = TradingSubCategory::where('slug', $request->slug)->first();

            if ($data) {
                return response()->json($data, 200);
            } else {
                return response()->json(['message' => 'Subcategory not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    public function getsubCategorySlugrow(Request $request)
    {

        $check       = TradingCategory::where('slug', $request->slug)->first();
        $category_id =  !empty($check->id) ? $check->id : "";

        $rows        = TradingSubCategory::where('category_id', $category_id)->orderBy('id', 'asc')->get();

        $arryData = [];
        foreach ($rows as $v) {
            $arryData[] = [
                'id'                         => $v->id,
                'name'                       => $v->name,
                'slug'                       => $v->slug,
                'thumnail_img'               => url($v->thumnail_img),
                'trading_amunt'              => $v->trading_amunt,
                'status'                     => $v->status,
                'min_trade'                  => $v->min_trade,
                'selected_graph'             => $v->selected_graph,
                'trading_fee'                => $v->trading_fee,

            ];
        }
        $data['categorybannerImages'] = !empty($check->banner_images) ? url($check->banner_images) : "";
        $data['categoryName']         = !empty($check->name) ? $check->name : "";
        $data['data']                 = $arryData;
        return response()->json($data, 200);
    }

    public function saveSubCategory(Request $request)
    {

        if (empty($request->id)) {
            $validator = Validator::make($request->all(), [
                'category_id'       => 'required',
                'name'              => 'required',
                'selected_graph'    => 'required',
                'min_trade'         => 'required|numeric',
                'trading_fee'       => 'required|numeric',
                'trading_amunt'     => 'required|numeric',
                'status'            => 'required',
                'files'             => 'required|file|mimes:jpg,png,pdf|max:2048', // Add your file validation here

            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
        } else {

            $validator = Validator::make($request->all(), [
                'category_id'       => 'required',
                'name'              => 'required',
                'selected_graph'    => 'required',
                'min_trade'         => 'required|numeric',
                'trading_fee'       => 'required|numeric',
                'trading_amunt'     => 'required|numeric',
                'status'            => 'required',

            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
        }
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'category_id'                => $request->category_id,
            'name'                       => $request->name,
            'selected_graph'             => $request->selected_graph,
            'min_trade'                  => $request->min_trade,
            'trading_fee'                => $request->trading_fee,
            'trading_amunt'              => $request->trading_amunt,
            // 'slug'                     => $slug,
            'status'                     => !empty($request->status) ? $request->status : "",
        );
        // dd($data);
        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['thumnail_img'] = $file_url;
        }

        if (empty($request->id)) {
            TradingSubCategory::insert($data);
        } else {
            TradingSubCategory::where('id', $request->id)->update($data);
        }

        $response = [
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }

    public function tradingCategoryRow($id)
    {
        $data = TradingCategory::where('id', $id)->first();

        $responseData['id']                     = !empty($data->id) ? $data->id : "";
        $responseData['name']                   = !empty($data->name) ? $data->name : "";
        $responseData['status']                 = !empty($data->status) ? $data->status : "";
        $responseData['selected_graph']         = !empty($data->status) ? $data->selected_graph : "";
        $responseData['thumnail_img']           = !empty($data->thumnail_img) ? url($data->thumnail_img) : "";
        $responseData['banner_images']          = !empty($data->banner_images) ? url($data->banner_images) : "";

        return response()->json($responseData);
    }

    public function tradingDurationRow($id)
    {
        $data = TradingDuration::where('id', $id)->first();
        $responseData['id']                     = !empty($data->id) ? $data->id : "";
        $responseData['name']                   = !empty($data->name) ? $data->name : "";
        $responseData['status']                 = !empty($data->status) ? $data->status : "";
        $responseData['percentage']             = !empty($data->percentage) ? $data->percentage : "";
        $responseData['hours']                  = !empty($data->hours) ? $data->hours : "";

        return response()->json($responseData);
    }

    public function tradingSubCategoryRow($id)
    {

        $data  = TradingSubCategory::where('id', $id)->first();
        $responseData['id']                     = !empty($data->id) ? $data->id : "";
        $responseData['category_id']            = !empty($data->category_id) ? $data->category_id : "";
        $responseData['min_trade']              = !empty($data->min_trade) ? $data->min_trade : "";
        $responseData['name']                   = !empty($data->name) ? $data->name : "";
        $responseData['trading_amunt']          = !empty($data->trading_amunt) ? $data->trading_amunt : "";
        $responseData['selected_graph']         = !empty($data->selected_graph) ? $data->selected_graph : "";
        $responseData['status']                 = !empty($data->status) ? $data->status : "";
        $responseData['trading_fee']            = !empty($data->trading_fee) ? $data->trading_fee : "";
        $responseData['thumnail_img']           = !empty($data->thumnail_img) ? url($data->thumnail_img) : "";
        return response()->json($responseData);
    }

    public function updateCategory(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name'           => 'required',
            'status'         => 'required',
            'files'          => 'required',
            'selected_graph' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'status'                     => !empty($request->status) ? $request->status : "",
            //  'selected_graph'             => !empty($request->selected_graph) ? $request->selected_graph : "",
        );
        // dd($data);
        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['thumnail_img'] = $file_url;
        }

        // dd($data);
        if (!empty($request->file('banner_images'))) {
            $files = $request->file('banner_images');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['banner_images'] = $file_url;
        }

        TradingCategory::where('id', $request->id)->update($data);
        //TradingCategory::insert($data);
        $response = [
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }

    public function saveDuration(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name'           => 'required',
            'status'         => 'required',
            'percentage'     => 'required',
            'hours'          => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = array(
            'name'                       => $request->name,
            'percentage'                 => $request->percentage,
            'status'                     => !empty($request->status) ? $request->status : "",
            'hours'                      => !empty($request->hours) ? $request->hours : "",
        );

        if (empty($request->id)) {
            TradingDuration::insert($data);
        } else {
            TradingDuration::where('id', $request->id)->update($data);
        }

        $response = [
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }

    public function saveCategory(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name'           => 'required',
            'status'         => 'required',
            'files'          => 'required',
            'selected_graph' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->input('name'))));
        $data = array(
            'name'                       => $request->name,
            'slug'                       => $slug,
            'status'                     => !empty($request->status) ? $request->status : "",
            //'selected_graph'             => !empty($request->selected_graph) ? $request->selected_graph : "",
        );
        // dd($data);
        if (!empty($request->file('files'))) {
            $files = $request->file('files');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['thumnail_img'] = $file_url;
        }

        // dd($data);
        if (!empty($request->file('banner_images'))) {
            $files = $request->file('banner_images');
            $fileName = Str::random(20);
            $ext = strtolower($files->getClientOriginalExtension());
            $path = $fileName . '.' . $ext;
            $uploadPath = '/backend/files/';
            $upload_url = $uploadPath . $path;
            $files->move(public_path('/backend/files/'), $upload_url);
            $file_url = $uploadPath . $path;
            $data['banner_images'] = $file_url;
        }

        TradingCategory::insert($data);
        $response = [
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }

    public function tradingdurationList(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter    = $request->selectedFilter;
        // dd($selectedFilter);
        $query =  TradingDuration::orderBy('trading_duration.id', 'desc');

        if ($searchQuery !== null) {
            $query->where('trading_duration.name', 'like', '%' . $searchQuery . '%');
        }

        if (!empty($selectedFilter)) {
            $query->whereIn('trading_duration.status', [0, 1]);
        } else {
            $query->where('trading_duration.status', $selectedFilter);
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);
        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'             => $item->id,
                'name'           => $item->name,
                'hours'          => $item->hours,
                'percentage'     => $item->percentage,
                'status'         => $item->status,
            ];
        });

        // Return the modified collection along with pagination metadata
        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }

    public function alltradingsubCategoryList(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter    = $request->selectedFilter;
        // dd($selectedFilter);
        $query =  TradingSubCategory::orderBy('trading_subcategory.id', 'desc')
            ->join('trading_category', 'trading_subcategory.category_id', '=', 'trading_category.id')
            ->select('trading_category.name as categoryName', 'trading_subcategory.*');

        if ($searchQuery !== null) {
            $query->where('trading_category.name', 'like', '%' . $searchQuery . '%');
        }

        if (!empty($selectedFilter)) {
            $query->whereIn('trading_subcategory.status', [0, 1]);
        } else {
            $query->where('trading_subcategory.status', $selectedFilter);
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);
        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'             => $item->id,
                'status'         => $item->status,
                'categoryName'   => $item->categoryName,
                'selected_graph' => $item->selected_graph,
                'name'           => $item->name,
                'slug'           => $item->slug,
                'trading_amunt'  => $item->trading_amunt,
                'min_trade'      => $item->min_trade,
                'trading_fee'    => $item->trading_fee,
                'images'         => url($item->thumnail_img),
            ];
        });

        // Return the modified collection along with pagination metadata
        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }

    public function alltracatLists()
    {

        $rows = TradingCategory::orderBy('id', 'desc')->get();
        $arryData = [];
        foreach ($rows as $v) {
            $arryData[] = [
                'id'                         => $v->id,
                'name'                       => $v->name,
                'slug'                       => $v->slug,
                'thumnail_img'               => url($v->thumnail_img),
                'banner_images'              => url($v->banner_images),
                'status'                       => $v->status,
            ];
        }

        return response()->json(['data' => $arryData], 200);
    }

    public function alltraCatList()
    {

        $rows = TradingCategory::orderBy('id', 'desc')->get();
        return response()->json(['data' => $rows], 200);
    }

    public function alltradingCategoryList(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);

        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter    = $request->selectedFilter;
        // dd($selectedFilter);
        $query = TradingCategory::orderBy('id', 'desc')
            ->select('trading_category.*');

        if ($searchQuery !== null) {
            $query->where('trading_category.name', 'like', '%' . $searchQuery . '%');
        }

        if (!empty($selectedFilter)) {
            $query->whereIn('status', [0, 1]);
        } else {
            $query->where('status', $selectedFilter);
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);
        $modifiedCollection = $paginator->getCollection()->map(function ($item) {
            return [
                'id'             => $item->id,
                'status'         => $item->status,
                'name'           => $item->name,
                'slug'           => $item->slug,
                'images'         => url($item->images),
                'banner_images'  => url($item->banner_images),
                'selected_graph' => $item->selected_graph,
            ];
        });

        // Return the modified collection along with pagination metadata
        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }

    public function settingrowSystem()
    {
        $data = Setting::find(1);
        $buyToken = BuyToken::sum('usdt_amount');
        $response = [
            'data'     => $data,
            'BuyToken' => $buyToken,
            'message' => 'success'
        ];
        return response()->json($response, 200);
    }

    public function getManualAdjustmentReport(Request $request)
    {

        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);
        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        // dd($selectedFilter);
        $query = ManualAdjustment::orderBy('manual_adjustment.id', 'desc') // Base query
            ->join('users', 'manual_adjustment.user_id', '=', 'users.id') // Join on user_id
            ->select( // Select the relevant columns
                'manual_adjustment.*', // Select all columns from ManualAdjustment
                'users.name', // Additional user data
                'users.email',
                'users.id  as userid'
            );

        if (!empty($searchQuery)) {
            // $query->where('depositID', 'like', '%' . $searchQuery . '%');
            $query->where('users.email', $searchQuery);
        }

        if ($selectedFilter == 5) {
            $query->whereIn('manual_adjustment.adjustment_type', [1, 2]);
        } else {
            $query->where('manual_adjustment.adjustment_type', $selectedFilter);
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            if ($item->adjustment_type == 1) {
                $status = "Loan";
            } else if ($item->adjustment_type == 2) {
                $status = "Reward";
            }
            $userrow = User::find($item->user_id);
            return [
                'id'                  => $item->id,
                'name'                => !empty($userrow->name) ?  $userrow->name : "N/A",
                'email'               => !empty($userrow->email) ?  $userrow->email : "N/A",
                'phone'               => !empty($userrow->phone_number) ?  $userrow->phone_number : "N/A",
                'adjustment_amount'   => $item->adjustment_amount,
                'detailed_remarks'    => $item->detailed_remarks,
                'created_at'          => date("Y-m-d", strtotime($item->created_at)),
                'status'              => $status,
                'adjustment_type'     => $item->adjustment_type,
            ];
        });

        // Return the modified collection along with pagination metadata
        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }

    public function getTradingListAdmin(Request $request)
    {

        $page           = $request->input('page', 1);
        $pageSize       = $request->input('pageSize', 10);
        // Get search query from the request
        $searchQuery    = $request->searchQuery;
        $selectedFilter = (int)$request->selectedFilter;
        $searchEmail    = $request->searchEmail;
        $filterFrmDate  = $request->filterFrmDate;
        $filterToDate   = $request->filterToDate;
        $searchOrderId  = $request->searchOrderId;

        // dd($selectedFilter);
        $query = Trade::orderBy('trade.id', 'desc')
            ->join('users', 'trade.user_id', '=', 'users.id') // Join condition
            ->select('trade.*', 'users.email', 'users.name', 'users.phone_number')
            ->orderBy('trade.id', 'desc'); // Sorting by 'id' in descending order

        $customTimeZone = 'Asia/Dhaka';
        $currentTime    = Carbon::now($customTimeZone);
        $realtimeUpdate = $currentTime->format('Y-m-d H:i:s');

        $udata['request_datetime'] = $realtimeUpdate;
        Trade::where('id', 1)->update($udata);

        // Check if filter dates are provided
        if (!empty($filterFrmDate) && !empty($filterToDate)) {
            // Filter by range (inclusive)
            $query->whereBetween(DB::raw('DATE(trade.created_at)'), [$filterFrmDate, $filterToDate]);
        } elseif (!empty($filterFrmDate)) {
            // If only from date is provided, filter by that specific date
            $query->where(DB::raw('DATE(trade.created_at)'), $filterFrmDate);
        } elseif (!empty($filterToDate)) {
            // If only to date is provided, filter by that specific date
            $query->where(DB::raw('DATE(trade.created_at)'), $filterToDate);
        }

        if (!empty($searchEmail)) {
            $query->where('users.email', $searchEmail);
        }

        if (!empty($searchOrderId)) {
            // $query->where('depositID', 'like', '%' . $searchQuery . '%');
            $query->where('trade.tradeID', $searchOrderId);
        }

        // $cleanedSelectedFilter = isset($selectedFilter) ? (int) trim($selectedFilter) : null;

        if ($selectedFilter == 5) {
            $query->whereIn('trade.status', [0, 1, 2]);
        } else {
            $query->where('trade.status', $selectedFilter);
        }

        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);

        $modifiedCollection = $paginator->getCollection()->map(function ($item) {

            $status = "";
            if ($item->status == 0) {
                $status = "In Progress";
            } else if ($item->status == 1) {
                $status = "Approved";
            }
            $tcateName       = TradingCategory::where('id', $item->category_id)->first();
            $tscateName      = TradingSubCategory::where('id', $item->subcategory_id)->first();

            $userrow = User::find($item->user_id);
            return [
                'id'                => $item->id,
                'user_info_name'    => !empty($userrow->name) ?  $userrow->name : "N/A",
                'user_info_email'   => !empty($userrow->email) ?  $userrow->email : "N/A",
                'user_info_phone'   => !empty($userrow->phone_number) ?  $userrow->phone_number : "N/A",
                //                
                'tradeID'               => $item->tradeID,
                'categoryName'          => !empty($tcateName) ? $tcateName->name : "",
                'subCategoryName'       => !empty($tscateName) ? $tscateName->name . '/USDT' : "",
                'durationPercentage'    => $item->durationPercentage,
                'estProfit'             => $item->estProfit,
                'trading_fee'           => $item->trading_fee,
                'net_profit'            => $item->net_profit,
                'return_amount'         => $item->return_amount,
                'start_datetime'        => $item->start_datetime,
                'end_datetime'          => $item->end_datetime,
                'tradeAmount'           => $item->tradeAmount,
                'durationDay'           => $item->durationDay,
                'durationHours'         => $item->durationHours,
                'created_at'            =>  date("Y-m-d H:i:s", strtotime($item->created_at)),
                'status'                => $status,
                'sts'                   => $item->status,
            ];
        });

        // Return the modified collection along with pagination metadata
        return response()->json([
            'data' => $modifiedCollection,
            'current_page' => $paginator->currentPage(),
            'total_pages' => $paginator->lastPage(),
            'total_records' => $paginator->total(),
        ], 200);
    }
}
