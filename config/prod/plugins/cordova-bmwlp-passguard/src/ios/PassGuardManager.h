//
//  PassGuardManager.h
//  PassGuardCtrlDemo_src
//
//  Created by microdone on 16/6/13.
//  Copyright (c) 2016年 microdone. All rights reserved.
//
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "PassGuardViewController.h"
#import "MainViewController.h"
@interface PassGuardManager : UIViewController<instertWebviewTextDelegate,UIWebViewDelegate,BarDelegate,DoneDelegate>
{
    NSTimer *mm_timer;
    NSString *currentPassGuardId;
    
}

// 获得单例对象
//+ (PassGuardManager*)getInstance;

// 是否存在直指定密码控件 true:存在;false:不存在
- (bool) hasPassGuard:(NSString *) passGuardId;

// 生成一个新的密码控件
- (void) newPassGuard:(NSString *) passGuardId;

//设置明密文模式
- (void) setPassGuardMode:(NSString *) passGuardId pmode:(BOOL)mode;

/**
 * 设置键盘是否显示ToolBar
 * id 密码控件id
 * ishow 显示开关
 */
- (void)editTexthasShowtoolbar:(NSString *) passGuardId  showToolbar:(BOOL)ishow;
/**
 * 开始启动指定密码控件键盘
 *  id 密码控件id
 */
- (void) StartPassGuardKeyBoard:(NSString *) passGuardId;

/**
 * 停止指定密码控件键盘
 *  id 密码控件id
 */
- (void) StopPassGuardKeyBoard: (NSString *) passGuardId;

/**
 * 停止所有密码控件键盘
 * @param id 密码控件id
 */
- (void) StopPassGuardKeyBoardAll;

- (void) StopPassGuardKeyBoardAllExceptID:(NSString*) passGuardId;

// 设置最大可输入长度
- (void) setMaxLength :(NSString *) passGuardId  maxLength:(int)maxLength ;

// 设置键盘输入正则规则,用来匹配字符框中已经输入字符。
- (void) setInputRegex:(NSString *) passGuardId  regex:(NSString *) regex;

// 设置正则表达式，供isMatch()函数使用
- (void) setMatchRegex:(NSString *) passGuardId  regex:(NSString *) regex;

// 校验输入格式
- (bool) checkMatch:(NSString *) passGuardId;

// 获得输入等级
- (NSArray  *) getPassLevel:(NSString *) passGuardId;

/** 键盘分为全键盘（数字，字符，字母）和数字键盘（纯数字），
 *  默认键盘为全键盘，而设置UIKeyboardTypeNumberPad类型，或者xib中直接设置NumberPad即为数字键盘。
 */
- (void) useNumberPad:(NSString *) passGuardId  use :(bool) use;

// 设置随机字符串，用来产生AES密钥（需要与解密端字符串同步）
- (void) setCipherKey:(NSString *) passGuardId key:(NSString *) key;

// 获取用户输入数据的加密密文（AES），用Base64编码。
- (NSString *) getOutput1 : (NSString *) passGuardId;

- (NSString *) getText : (NSString *) passGuardId;

// 获取用户输入数据的加密密文（RSA-AES），用Base64编码。
- (NSString *) getOutput0 :(NSString *) passGuardId;

// 获取用户输入数据的MD5值
- (NSString *) getOutput2 :(NSString *) passGuardId;

// 获取用户输入数据的长度
- (NSInteger) getOutput3 : (NSString *) passGuardId;

// 键盘是否启动
- (bool) isKeyBoardShowing : (NSString *) passGuardId;

// 是否有键盘是否启动
- (bool) hasKeyBoardShowing;

- (void) setWatchOutside:(NSString*) passGuardId need:(bool) need;

- (void) EditTextAlwaysShow :(NSString*) passGuardId need:(bool)need;

// 清除文本框内容
- (void) clear : (NSString *) passGuardId;

// 销毁密码控件
- (void) destory : (NSString *) passGuardId;

// 设置webview
- (void) setWebView : (IBOutlet UIWebView*) view;

//设置收起键盘JS事件名
- (void) hideKeyBoard : (NSString *) passGuardId onKeyBoardHide:(NSString *)hideFunNam;
- (void) doneKeyBoard : (NSString *) passGuardId onKeyBoardDone:(NSString *)doneFunName;
- (void) cancelKeyBoard : (NSString *) passGuardId onKeyBoardCancel:(NSString *)cancelFunName;
- (void) willShowKeyBoard : (NSString *) passGuardId onKeyBoardWillShow:(NSString *)WillShowName;

//@property (retain, nonatomic) IBOutlet UIWebView *webView;

// 密码控件集合
@property (nonatomic, strong) NSMutableDictionary *manager;
@property(nonatomic, strong) NSTimer *mm_timer;
@end
