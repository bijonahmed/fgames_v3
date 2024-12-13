<?php

namespace App\Http\Controllers\Public;

use Cart;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;


class LanguageController extends Controller
{

    public function getTexts(Request $request)
    {
        // Validate the request
        $request->validate([
            'lang' => 'required|string|in:en,bn,hi,ta,zh,es', // Define allowed languages
        ]);

        // Define the texts for each language
        $texts = [
            'en' => [
                'greeting'       => 'Hello',
                'farewell'       => 'Goodbye',
                'welcome'        => 'Welcome to our application',
                'level_deposit'  => 'Deposit',
                'level_sign_in'  => 'Sign in',
                'level_sign_up'  => 'Sign up',
                'lvl_left_sidebar_video'  => 'Video',
                'lvl_left_sidebar_model'  => 'Model',
                'lvl_left_sidebar_star'   => 'Star',
                'lvl_left_sidebar_games'  => 'Games',
                'lvl_left_sidebar_profile'=> 'Profile',

                'lvl_index_casino'        => 'Casino',
                'lvl_index_sports'        => 'Sports',
                'lvl_index_lottery'       => 'Lottery',
                'lvl_index_racing'        => 'Racing',
                'lvl_index_updown'        => 'Updown',
                'lvl_index_bingo'         => 'Bingo',
            ],
            'bn' => [
                'greeting' => 'হ্যালো',
                'farewell' => 'বিদায়',
                'welcome' => 'আমাদের অ্যাপ্লিকেশনে স্বাগতম',
                'level_deposit'  => 'ডিপোজিট',
                'level_sign_in'  => 'সাইন ইন',
                'level_sign_up'  => 'সাইন আপ',
                'lvl_left_sidebar_video'  => 'ভিডিও',
                'lvl_left_sidebar_model'  => 'মডেল',
                'lvl_left_sidebar_star'   => 'ষ্টার',
                'lvl_left_sidebar_games'  => 'গেমস',
                'lvl_left_sidebar_profile'=> 'প্রোফাইল',

                'lvl_index_casino'        => 'ক্যাসিনো',
                'lvl_index_sports'        => 'খেলাধুলা',
                'lvl_index_lottery'       => 'লটারি',
                'lvl_index_racing'        => 'দৌড়',
                'lvl_index_updown'        => 'আপডন',
                'lvl_index_bingo'         => 'বিঙ্গো',

            ],
            'hi' => [
                'greeting' => 'नमस्ते',
                'farewell' => 'अलविदा',
                'welcome' => 'हमारे अनुप्रयोग में आपका स्वागत है',
                'level_deposit'  => 'जमा',
                'level_sign_in'  => 'साइन ইন',
                'level_sign_up'  => 'साइन अप करें',
                'lvl_left_sidebar_video'  => 'वीडियो',
                'lvl_left_sidebar_model'  => 'नमूना',
                'lvl_left_sidebar_star'   => 'तारा',
                'lvl_left_sidebar_games'  => 'खेल',
                'lvl_left_sidebar_profile'=> 'प्रोफ़ाइल',

                'lvl_index_casino'        => 'कैसीनो',
                'lvl_index_sports'        => 'खेल',
                'lvl_index_lottery'       => 'लॉटरी',
                'lvl_index_racing'        => 'दौड़',
                'lvl_index_updown'        => 'updon', ////
                'lvl_index_bingo'         => 'बिंगो',
            ],

            'zh' => [
                'greeting' => '你好',
                'farewell' => '再见',
                'welcome' => '欢迎使用我们的应用程序',
                'level_deposit'  => '訂金',
                'level_sign_in'  => '登入',
                'level_sign_up'  => '报名',
                'lvl_left_sidebar_video'  => '视频',
                'lvl_left_sidebar_model'  => '模型',
                'lvl_left_sidebar_star'   => '星星',
                'lvl_left_sidebar_games'  => '游戏',
                'lvl_left_sidebar_profile'=> '轮廓',

                'lvl_index_casino'        => '赌场',
                'lvl_index_sports'        => '运动的',
                'lvl_index_lottery'       => '彩票',
                'lvl_index_racing'        => '赛车',
                'lvl_index_updown'        => '乌普敦', ////
                'lvl_index_bingo'         => '宾果游戏',
            ],
            
        ];

        // Get the selected language from the request
        $language = $request->input('lang');

        // Return the texts for the selected language
        return response()->json($texts[$language]);
    }
}
