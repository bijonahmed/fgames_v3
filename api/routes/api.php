<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CheckUserStatus;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\Chat\ChatController;
use App\Http\Controllers\Game\GameController;
use App\Http\Controllers\Game\SessionVerificationController;
use App\Http\Controllers\Game\GameRequestController;
use App\Http\Controllers\Post\PostController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Api\GameApiController;
use App\Http\Controllers\Brands\BrandsController;
use App\Http\Controllers\Public\PublicController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Public\LanguageController;
use App\Http\Controllers\Setting\SettingController;
use App\Http\Controllers\UnauthenticatedController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Game\GameController as Gcontroller;

Route::get('/clear-cache', function () {
    $exitCode = Artisan::call('optimize:clear');
    echo 'clean done';
    // return what you want
});
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::post('/sendVerifySession', [SessionVerificationController::class, 'verifySession']);
Route::post('/luck/user/verify_session', [SessionVerificationController::class, 'verifySession']);
Route::post('/luck/balance/get_balance', [SessionVerificationController::class, 'get_balance']);

Route::get('checkGamesPlatform', [GameApiController::class, 'allGamesPltfrmData']);
Route::get('api_gameList', [GameApiController::class, 'gameList']);
Route::get('gamePlatformOnly', [GameApiController::class, 'gamePlatformOnly']);
Route::get('api_gameCategory', [GameApiController::class, 'GameCategory']);
Route::get('api_getGames', [GameApiController::class, 'getgame']);
Route::get('api_checkgamerow', [GameApiController::class, 'gameRow']);
Route::post('applyFiterGames', [GameApiController::class, 'filterGames']);
Route::get('getAllchaturbateApiV1Data', [ApiController::class, 'getAllchaturbateApiV1Data']);
Route::get('chaturbateApiV1', [ApiController::class, 'chaturbateApiV1Data']);
Route::get('countByeporner', [ApiController::class, 'countByeporner']);
Route::get('filterByeporner', [ApiController::class, 'filterByeporner']);
Route::get('deleteGalleryId', [ApiController::class, 'deleteGalleryId']);
Route::get('galleryData', [ApiController::class, 'galleryData']);
Route::get('insertForGalleryVideo', [ApiController::class, 'insertForGalleryVideo']);
Route::get('removeFourZeroFourNotfound', [ApiController::class, 'removeFourZero']);
Route::get('deleteVideoId', [ApiController::class, 'deleteVideoId']);
Route::get('filterCategoryWiseVideoGallery', [ApiController::class, 'filterCategoryWiseVideoGallery']);
Route::get('getPornCategory', [ApiController::class, 'getPornCategory']);
Route::get('filterCategoryWiseGallery', [ApiController::class, 'filterCategoryWiseGallery']);
Route::post('messages', [ChatController::class, 'message']);
Route::get('/messages/{community_slug}', [ChatController::class, 'getMessages']);
Route::get('/long-poll/{communitySlug}', [ChatController::class, 'longPoll']);
Route::get('settingrowClient', [UnauthenticatedController::class, 'settingrowClient']);

Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'auth',
    ],
    function () {
        Route::post('userRegister', [UserAuthController::class, 'userRegister']);
        Route::post('userLogin', [UserAuthController::class, 'login']);

        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);

        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('profile', [AuthController::class, 'profile']);
        Route::post('me', [AuthController::class, 'me']);
        Route::post('updateprofile', [AuthController::class, 'updateprofile']);
        Route::post('updateUserProfileSocial', [AuthController::class, 'updateUserProfileSocial']);
        Route::post('changesPassword', [AuthController::class, 'changesPassword']);
        Route::post('updatePassword', [AuthController::class, 'updatePassword']);
        Route::get('showProfileData', [AuthController::class, 'showProfileData']);
        Route::post('payment/createOrder', [PaypalController::class, 'paypal']);
        //Route::post('password/email', [ForgotPasswordController::class, 'sendPasswordResetEmail']);
        //Route::post('password/reset', [ResetPasswordController::class, 'updatePassword']);
    },
);

Route::group(
    [
        'prefix' => 'public',
    ],
    function () {
        Route::get('getonlyPltform', [PublicController::class, 'getonlyPltform']);
        Route::get('pltformWiseGame', [PublicController::class, 'pltformWiseGame']);
        Route::get('/language', [LanguageController::class, 'index']);
        Route::post('/texts', [LanguageController::class, 'getTexts']);
        Route::get('getPornStarPic/', [PublicController::class, 'getPornStarPics']);
        Route::get('checkGameData', [PublicController::class, 'checkGameData']);
        Route::get('checkVideoAppId', [PublicController::class, 'checkVideoAppId']);
        Route::get('getAllGames', [PublicController::class, 'getAllGames']);
        Route::get('getPublicAllGames', [PublicController::class, 'getPublicAllGames']);
        Route::get('gameCategoryGame', [PublicController::class, 'gameCategoryGame']);
        Route::get('/gameTypeWiseCategory/{slug}', [PublicController::class, 'gameTypeWiseCategory']);
        Route::get('/gameTypeWisePlatformList', [PublicController::class, 'gameTypeWisePlatformList']);
        Route::get('/categoryWiseGames/{slug}', [PublicController::class, 'categoryWiseGames']);

        Route::get('/allGamesType', [PublicController::class, 'allGamesTypes']);
        Route::get('/makeIframeCode', [PublicController::class, 'htmlIframeCode']);
        Route::get('/getAllVideos', [PublicController::class, 'getAllVideos']);
        Route::get('/getAllHosters', [PublicController::class, 'getAllHosters']);
        Route::get('/getMobileAllHosters', [PublicController::class, 'getMobileAllHosters']);
        Route::get('/galleryApiData', [PublicController::class, 'galleryApiData']);
        Route::get('/checkHosterProfile/{slug}', [PublicController::class, 'checkHosterProfile']);
        Route::get('/checkLiveHosterProfile/{slug}', [PublicController::class, 'checkLiveHosterProfile']);
        Route::get('/getAllCaegorys', [PublicController::class, 'getAllCaegorys']);
        Route::get('/getCategorySlug/{slug}', [PublicController::class, 'getCategorySlug']);
        Route::get('/countPerDayValidation', [UnauthenticatedController::class, 'countPerDayValidation']);
        Route::get('/countPerDayValidationSplit', [UnauthenticatedController::class, 'countPerDayValidationSplit']);
        Route::post('/insertSplitData', [UnauthenticatedController::class, 'insertSplitData']);
        Route::get('/allGamesTypes', [UnauthenticatedController::class, 'allGamesTypes']);
        Route::get('/filterGames', [PublicController::class, 'filterGames']);
    },
);

Route::middleware(['auth:api', CheckUserStatus::class])->group(function () {
    Route::group(
        [
            'prefix' => 'user',
        ],
        function () {
            Route::get('findUserDetails', [UserController::class, 'findUserDetails']);
            Route::get('allModels', [UserController::class, 'allModels']);
            Route::get('checkCurrentUser', [UserController::class, 'checkCurrentUser']);
            Route::get('getRoleList', [UserController::class, 'getRoleList']);
            Route::get('allrolelistsInfo', [UserController::class, 'allrolelistsInfo']);
            Route::get('allrolelist', [UserController::class, 'allrolelist']);
            Route::get('roleCheck/{id}', [UserController::class, 'roleCheck']);
            Route::get('getUserRow/{id}', [UserController::class, 'editUserId']);
            Route::get('getCountry', [UserController::class, 'getCountry']);
            Route::get('getTime', [UserController::class, 'getTime']);
            Route::get('inactiveEmployee', [UserController::class, 'inactiveEmployee']);
            Route::get('inactiveUser', [UserController::class, 'inactiveUser']);
            Route::get('getInviteCode', [UserController::class, 'getInviteCode']);
            Route::get('autocompleteUser', [UserController::class, 'autocompleteUser']);
            Route::get('allUsers', [UserController::class, 'AllUsersList']);
            Route::get('allAgent', [UserController::class, 'allAgent']);
            Route::get('allAdmin', [UserController::class, 'allAdmin']);
            Route::get('allSuperAdmin', [UserController::class, 'allSuperAdmin']);
            Route::get('getUserWiseCurrentBalance', [UserController::class, 'getUserWiseCurrentBalance']);
            Route::post('changePassword', [UserController::class, 'changePassword']);
            Route::post('changePasswordClient', [UserController::class, 'changePasswordClient']);
            Route::post('updateUserProPass', [UserController::class, 'updateUserProPass']);
            Route::post('saveUser', [UserController::class, 'saveUser']);
            Route::post('updateUser', [UserController::class, 'updateUser']);
            Route::post('updateUserProfileImg', [UserController::class, 'updateUserProfileImg']);
            Route::post('assignToUser', [UserController::class, 'assignToUser']);
            Route::post('saveRole', [UserController::class, 'saveRole']);
        },
    );

    Route::group(
        [
            'prefix' => 'category',
        ],
        function () {
            Route::post('inserMiningCategory', [CategoryController::class, 'inserMiningCategory']);
            Route::post('editMiningCategory', [CategoryController::class, 'editMiningCategory']);
            Route::post('save', [CategoryController::class, 'save']);
            Route::post('edit', [CategoryController::class, 'edit']);
            Route::post('saveAttribute', [CategoryController::class, 'saveAttribute']);
            Route::post('saveAttributeVal', [CategoryController::class, 'saveAttributeVal']);
            Route::get('getCategoryList', [CategoryController::class, 'allCategory']);
            Route::get('allMiningCategoryes', [CategoryController::class, 'allMiningCategoryes']);
            Route::get('getInacCategoryList', [CategoryController::class, 'allInacCategory']);
            Route::get('categoryRow/{id}', [CategoryController::class, 'findCategoryRow']);
            Route::get('getCategoryListParent', [CategoryController::class, 'getCategoryListParent']);
            Route::get('getSubCategoryChild/{id}', [CategoryController::class, 'getSubCategoryChild']);
            Route::get('minningCategoryrow/{id}', [CategoryController::class, 'minningCategoryrow']);
            Route::get('attributeRow/{id}', [CategoryController::class, 'attributeRow']);
            Route::get('attributeValRow/{id}', [CategoryController::class, 'attributeValRow']);
            Route::get('attributeValRows/{product_id}/{product_attribute_id}', [CategoryController::class, 'attributeValRows']);
            Route::get('search', [CategoryController::class, 'searchCategory']);
            Route::get('attributes', [CategoryController::class, 'getAttribute']);
            Route::get('attributes-list', [CategoryController::class, 'getAttributeList']);
            Route::get('attributes-val-list', [CategoryController::class, 'getAttributeValList']);
            Route::get('postCategorysearch', [CategoryController::class, 'postCategorysearch']);
            Route::get('allCategorys', [CategoryController::class, 'getCategoryList']);
            Route::get('getCategoryUnderSubCat', [CategoryController::class, 'getCategoryUnderSubCat']);
        },
    );

    Route::group(
        [
            'prefix' => 'product',
        ],
        function () {
            Route::get('categoryWiseProduct', [ProductController::class, 'categoryWiseProduct']);
            Route::post('save', [ProductController::class, 'save']);
            Route::get('dashboardCounting', [ProductController::class, 'dashboardCounting']);
            Route::post('product-update', [ProductController::class, 'productUpdate']);
            Route::post('insertVarientGroup', [ProductController::class, 'insertVarientGroup']);
            Route::get('getProductList', [ProductController::class, 'getProductList']);
            Route::get('insertProductAttrAndValues', [ProductController::class, 'insertProductAttrAndValues']);
            Route::get('insertProductVarient', [ProductController::class, 'insertProductVarient']);
            Route::get('deleteValrient', [ProductController::class, 'deleteValrient']);
            Route::get('getAttrHistory/{id}', [ProductController::class, 'getAttrHistory']);
            Route::get('productrow/{id}', [ProductController::class, 'productrow']);
            Route::get('additionaIMagesDelete', [ProductController::class, 'additionaIMagesDelete']);
            Route::get('deleteCategory', [ProductController::class, 'deleteCategory']);
            Route::get('getVarientHistory', [ProductController::class, 'getVarientHistory']);
            Route::get('removeProducts/{id}', [ProductController::class, 'removeProducts']);
        },
    );

    Route::group(
        [
            'prefix' => 'post',
        ],
        function () {
            Route::post('save', [PostController::class, 'save']);
            Route::post('update', [PostController::class, 'update']);
            Route::get('postrow/{id}', [PostController::class, 'postrow']);
            Route::get('allPost', [PostController::class, 'allPostList']);
            Route::get('postCategoryData', [PostController::class, 'postCategoryData']);
        },
    );

    Route::group(
        [
            //'middleware' => 'api',
            'prefix' => 'brands',
        ],
        function () {
            Route::post('save', [BrandsController::class, 'save']);
            Route::get('allbrandlist', [BrandsController::class, 'allbrandlist']);
            Route::get('allCouminitylist', [BrandsController::class, 'allCouminitylist']);
            Route::get('brandrow/{id}', [BrandsController::class, 'brandrow']);
            Route::get('communityrow/{id}', [BrandsController::class, 'communityrow']);
            // Route::get('searchmodels', [BrandsController::class, 'searchmodels']);
            Route::post('communitySave', [BrandsController::class, 'communitySave']);
        },
    );

    Route::group(
        [
            'prefix' => 'project',
        ],
        function () {
            Route::post('saveTask', [ProjectController::class, 'saveTask']);
            Route::post('saveProject', [ProjectController::class, 'save']);
            Route::get('allProject', [ProjectController::class, 'allProject']);
            Route::get('geTaskList', [ProjectController::class, 'geTaskList']);
            Route::get('checkProjectId/{id}', [ProjectController::class, 'editId']);
            Route::get('taskRow/{id}', [ProjectController::class, 'editTaskId']);
        },
    );
    Route::group(
        [
            'prefix' => 'games',
        ],
        function () {
            Route::post('/sendVerifySession', [SessionVerificationController::class, 'verifySession']);
            Route::get('playerList', [GameController::class, 'playerList']);
            Route::post('requesttoGame', [GameRequestController::class, 'requesttoGame']);
            Route::post('platformTypeGames', [GameRequestController::class, 'platformTypeGames']);
            Route::post('updateGame', [Gcontroller::class, 'updateGame']);
            Route::get('allGamesList', [Gcontroller::class, 'allGamesList']);
            Route::get('allGamesListTranslate', [GameController::class, 'allGamesListTranslate']);
            Route::post('addGameCategory', [Gcontroller::class, 'addGameCategory']);
            Route::post('addonlyGamepltform', [Gcontroller::class, 'addonlyGamepltform']);
            Route::get('allGameCategoryList', [Gcontroller::class, 'allGameCategoryList']);
            Route::get('onlyPltformList', [Gcontroller::class, 'onlyPltformList']);

            Route::get('checkGameType/{id}', [Gcontroller::class, 'checkGameTypeRow']);
            Route::get('checkGameCategory/{id}', [Gcontroller::class, 'checkGameCategory']);
            Route::get('checkGamePltfm/{id}', [Gcontroller::class, 'checkGamePltfm']);
            Route::get('checkGame/{id}', [Gcontroller::class, 'checkGame']);
            Route::get('allgametype', [Gcontroller::class, 'allGameType']);
            Route::post('addGameType', [Gcontroller::class, 'addGameType']);
            Route::post('addGameLangauges', [GameController::class, 'addGameLangauges']);
            Route::get('allGamesTypes', [GameController::class, 'allGamesTypes']);
        },
    );

    Route::group(
        [
            'prefix' => 'setting',
        ],
        function () {
            Route::post('insertLanguageAdd', [SettingController::class, 'insertLanguageAdd']);
            Route::post('upateSetting', [SettingController::class, 'upateSetting']);
            Route::get('settingrowSystem', [SettingController::class, 'settingrow']);
            Route::get('getLanguageList', [SettingController::class, 'getLanguageList']);
            Route::get('getLanguageActiveList', [SettingController::class, 'getLanguageActiveList']);
            Route::get('getTranslationList', [SettingController::class, 'getTranslationList']);
            Route::get('languagerow/{id}', [SettingController::class, 'chkLanguagerow']);
            Route::get('updateTransationRow', [SettingController::class, 'updateTransationRow']);
        },
    );

    Route::group(
        [
            'prefix' => 'payment',
        ],
        function () {
            Route::get('checkwalletAddress', [PaymentController::class, 'checkwalletAddress']);
        },
    );
});
