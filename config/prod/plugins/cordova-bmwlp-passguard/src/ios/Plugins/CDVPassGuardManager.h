/*
 *密码控件插件
 */
#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "PassGuardManager.h"
@interface CDVPassGuardManager : CDVPlugin {
//    UIActivityIndicatorView* _activityView;
//    UIImageView* _imageView;
//    NSString* _curImageName;
//    BOOL _visible;
}

// 是否存在直指定密码控件 true:存在;false:不存在
- (bool) hasPassGuard:(CDVInvokedUrlCommand*)command;

// 生成一个新的密码控件
- (void) newPassGuard:(CDVInvokedUrlCommand*)command;

// 生成两个新的密码控件时先调用newPassGuardTwof方法，再调用newPassGuard方法
// 这样做的目的是防止js同时调用phonegap插件的同一个方法是出现指针问题
- (void) newPassGuardTwo:(CDVInvokedUrlCommand*)command;

//设置明密文模式
- (void) setPassMode:(CDVInvokedUrlCommand*)command;
/**
 * 设置键盘是否显示ToolBar
 * id 密码控件id
 * ishow 显示开关
 */
- (void)setPassGuardKeyBoardHasShowtoolbar:(CDVInvokedUrlCommand*)command;

/**
 * 开始启动指定密码控件键盘
 *  id 密码控件id
 */
- (void) StartPassGuardKeyBoard:(CDVInvokedUrlCommand*)command;

/**
 * 停止指定密码控件键盘
 *  id 密码控件id
 */
- (void) StopPassGuardKeyBoard:(CDVInvokedUrlCommand*)command;

/**
 * 停止所有密码控件键盘
 * @param id 密码控件id
 */
- (void) StopPassGuardKeyBoardAll:(CDVInvokedUrlCommand*)command;

- (void) StopPassGuardKeyBoardAllExceptID:(CDVInvokedUrlCommand*)command;

// 设置最大可输入长度
- (void) setMaxLength :(CDVInvokedUrlCommand*)command;

// 设置键盘输入正则规则,用来匹配字符框中已经输入字符。
- (void) setInputRegex:(CDVInvokedUrlCommand*)command;

// 设置正则表达式，供isMatch()函数使用
- (void) setMatchRegex:(CDVInvokedUrlCommand*)command;

// 校验输入格式
- (bool) checkMatch:(CDVInvokedUrlCommand*)command;

// 获得输入等级
- (NSArray  *) getPassLevel:(CDVInvokedUrlCommand*)command;

/** 键盘分为全键盘（数字，字符，字母）和数字键盘（纯数字），
 *  默认键盘为全键盘，而设置UIKeyboardTypeNumberPad类型，或者xib中直接设置NumberPad即为数字键盘。
 */
- (void) useNumberPad:(CDVInvokedUrlCommand*)command;

// 设置随机字符串，用来产生AES密钥（需要与解密端字符串同步）
- (void) setCipherKey:(CDVInvokedUrlCommand*)command;

// 获取用户输入数据的加密密文（AES），用Base64编码。
- (NSString *) getOutput1 :(CDVInvokedUrlCommand*)command;

- (NSString *) getText :(CDVInvokedUrlCommand*)command;

// 获取用户输入数据的加密密文（RSA-AES），用Base64编码。
- (void) getOutput0 :(CDVInvokedUrlCommand*)command;

// 获取用户输入数据的MD5值
- (NSString *) getOutput2 :(CDVInvokedUrlCommand*)command;

// 获取用户输入数据的长度
- (NSInteger) getOutput3 :(CDVInvokedUrlCommand*)command;

// 键盘是否启动
- (bool) isKeyBoardShowing :(CDVInvokedUrlCommand*)command;

// 是否有键盘是否启动
- (bool) hasKeyBoardShowing:(CDVInvokedUrlCommand*)command;

- (void) setWatchOutside:(CDVInvokedUrlCommand*)command;

- (void) EditTextAlwaysShow:(CDVInvokedUrlCommand*)command;

// 清除文本框内容
- (void) clear :(CDVInvokedUrlCommand*)command;

// 销毁密码控件
- (void) destory :(CDVInvokedUrlCommand*)command;

// 验证支付密码是否满足要求 1:参数正确; 2:参数为空
- (void) validatePwdParams :(CDVInvokedUrlCommand*)command;

// 验证设置支付密码是否满足要求
- (void) validateSetPwdParams :(CDVInvokedUrlCommand*)command;

- (void) outPluginResult :(CDVInvokedUrlCommand*)command resultValue:(NSString *) resultValue;


// 密码控件集合
@property(nonatomic,strong) PassGuardManager *passGuardManager;

@end
