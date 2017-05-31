//
//  CDVPassGuardManager.m
//
//
//  Created by microdone  on 16/6/14.
//
//

#import "CDVPassGuardManager.h"

@implementation CDVPassGuardManager


@synthesize passGuardManager;

// 是否存在直指定密码控件 true:存在;false:不存在
- (bool) hasPassGuard:(CDVInvokedUrlCommand*)command {
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    
    [self initPassGuardManager];
    [self outPluginResult :command resultValue :[NSString stringWithFormat:@"%d",[self.passGuardManager hasPassGuard : passGuardId]]];
    return [self.passGuardManager hasPassGuard : passGuardId];
}

// 生成一个新的密码控件
- (void) newPassGuard:(CDVInvokedUrlCommand*)command {
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    NSString *key = [command.arguments objectAtIndex:1];
    [self initPassGuardManager];
    // 创建新密码控件
    [self.passGuardManager newPassGuard : passGuardId];
    // 设置随机数
    [self.passGuardManager setCipherKey : passGuardId key:key];
    
    //[self newPassGuard :id key:key];
}

// 生成两个新的密码控件时调用newPassGuardTwof方法
// 这样做的目的是防止js同时调用phonegap插件的同一个方法时[self.passGuardManager getInstance]出现指针问题
- (void) newPassGuardTwo:(CDVInvokedUrlCommand*)command {
    [self initPassGuardManager];

    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    NSString *repeatPassGuardId  = [command.arguments objectAtIndex:1];
    NSString *key = [command.arguments objectAtIndex:2];
    
    //[self newPassGuard :id key:key];
    // 创建新密码控件
    [self.passGuardManager newPassGuard : passGuardId];
    // 设置随机数
    [self.passGuardManager setCipherKey : passGuardId key:key];
    
    //[self newPassGuard :repeatId key:key];
    // 创建新密码控件
    [self.passGuardManager newPassGuard : repeatPassGuardId];
    // 设置随机数
    [self.passGuardManager setCipherKey : repeatPassGuardId key:key];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) setPassMode:(CDVInvokedUrlCommand*)command{
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    NSString *mode = [command.arguments objectAtIndex:1];
    
    [self.passGuardManager setPassGuardMode:passGuardId pmode:[mode intValue]];
}
/**
 * 设置键盘是否显示ToolBar
 * id 密码控件id
 * ishow 显示开关
 */
- (void) setPassGuardKeyBoardHasShowtoolbar:(CDVInvokedUrlCommand*)command{
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    int isshow = [[command.arguments objectAtIndex:1] intValue];
    [self.passGuardManager editTexthasShowtoolbar:passGuardId showToolbar:isshow];
}

/**
 * 开始启动指定密码控件键盘
 *  id 密码控件id
 */
- (void) StartPassGuardKeyBoard:(CDVInvokedUrlCommand*)command {

    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    
    [self.passGuardManager StartPassGuardKeyBoard : passGuardId];
    
    BOOL retisshow =  [self.passGuardManager isKeyBoardShowing: passGuardId];
}

/**
 * 停止指定密码控件键盘
 *  id 密码控件id
 */
- (void) StopPassGuardKeyBoard:(CDVInvokedUrlCommand*)command {

    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    
    [self.passGuardManager StopPassGuardKeyBoard : passGuardId];
}

/**
 * 停止所有密码控件键盘
 * @param id 密码控件id
 */
- (void) StopPassGuardKeyBoardAll :(CDVInvokedUrlCommand*)command{

    [self.passGuardManager StopPassGuardKeyBoardAll];
}

- (void) StopPassGuardKeyBoardAllExceptID:(CDVInvokedUrlCommand*)command {
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    

    
    [self.passGuardManager StopPassGuardKeyBoardAllExceptID : passGuardId];
    
}

// 设置最大可输入长度
- (void) setMaxLength :(CDVInvokedUrlCommand*)command {
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    
    NSString *maxLength = [command.arguments objectAtIndex:1];

    [self.passGuardManager setMaxLength : passGuardId maxLength: [maxLength intValue]];
}

// 设置键盘输入正则规则,用来匹配字符框中已经输入字符。
- (void) setInputRegex:(CDVInvokedUrlCommand*)command {
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    
    NSString *regex = [command.arguments objectAtIndex:1];

    [self.passGuardManager setInputRegex : passGuardId regex:regex];
}

// 设置正则表达式，供isMatch()函数使用
- (void) setMatchRegex:(CDVInvokedUrlCommand*)command {
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    
    NSString *regex = [command.arguments objectAtIndex:1];

    [self.passGuardManager setMatchRegex : passGuardId regex:regex];
}

// 校验输入格式
- (bool) checkMatch:(CDVInvokedUrlCommand*)command {
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];

    NSString *test = [NSString stringWithFormat:@"%d",[self.passGuardManager checkMatch : passGuardId]]; ;
    
    [self outPluginResult :command resultValue :test];
    
    return [self.passGuardManager checkMatch : passGuardId];
}

// 获得输入等级
- (NSArray  *) getPassLevel:(CDVInvokedUrlCommand*)command {
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];

    return [self.passGuardManager getPassLevel : passGuardId];
}

/** 键盘分为全键盘（数字，字符，字母）和数字键盘（纯数字），
 *  默认键盘为全键盘，而设置UIKeyboardTypeNumberPad类型，或者xib中直接设置NumberPad即为数字键盘。
 */
- (void) useNumberPad:(CDVInvokedUrlCommand*)command {
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    
    NSString *use = [command.arguments objectAtIndex:1];

    [self.passGuardManager useNumberPad : passGuardId use: ([use  isEqual: @"1"])? true:false];
}

// 设置随机字符串，用来产生AES密钥（需要与解密端字符串同步）
- (void) setCipherKey:(CDVInvokedUrlCommand*)command {
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    NSString *key = [command.arguments objectAtIndex:1];

    [self.passGuardManager setCipherKey : passGuardId key:key];
}

// 获取用户输入数据的加密密文（AES），用Base64编码。
- (NSString *) getOutput1 :(CDVInvokedUrlCommand*)command {
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    
    NSString *test = [self.passGuardManager getOutput1 : passGuardId];
    
    [self outPluginResult :command resultValue :test];
    
    return [self.passGuardManager getOutput1 : passGuardId];
}

- (NSString *) getText :(CDVInvokedUrlCommand*)command {
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    [self outPluginResult :command resultValue :[self.passGuardManager getOutput1 : passGuardId]];
    
    return [self.passGuardManager getOutput1 : passGuardId];
}

// 获取用户输入数据的加密密文（RSA-AES），用Base64编码。
- (void) getOutput0 :(CDVInvokedUrlCommand*)command {
    NSString *passGuardId  = [command.arguments objectAtIndex:0];

    NSString *test = [self.passGuardManager getOutput0 : passGuardId];
    
    [self outPluginResult :command resultValue :test];
}

// 获取用户输入数据的MD5值
- (NSString *) getOutput2 :(CDVInvokedUrlCommand*)command {
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    [self outPluginResult :command resultValue :[self.passGuardManager getOutput2 : passGuardId]];
    return [self.passGuardManager getOutput2 : passGuardId];
}

// 获取用户输入数据的长度
- (NSInteger) getOutput3 :(CDVInvokedUrlCommand*)command{
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    [self outPluginResult :command resultValue :[NSString stringWithFormat:@"%ld",(long)[self.passGuardManager getOutput3 : passGuardId]]];
    return [self.passGuardManager getOutput3 : passGuardId];
}

// 键盘是否启动
- (bool) isKeyBoardShowing :(CDVInvokedUrlCommand*)command {
    NSString *passGuardId  = [command.arguments objectAtIndex:0];

    return [self.passGuardManager isKeyBoardShowing : passGuardId];
}

// 是否有键盘是否启动
- (bool) hasKeyBoardShowing :(CDVInvokedUrlCommand*)command{

    return [self.passGuardManager hasKeyBoardShowing];
}

- (void) setWatchOutside:(CDVInvokedUrlCommand*)command {
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    NSString *needValue = [command.arguments objectAtIndex:1];

    [self.passGuardManager setWatchOutside : passGuardId need: ([needValue  isEqual: @"1"])? true:false];
}

- (void) EditTextAlwaysShow:(CDVInvokedUrlCommand*)command {
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    NSString *needValue = [command.arguments objectAtIndex:1];

    [self.passGuardManager EditTextAlwaysShow : passGuardId need: ([needValue  isEqual: @"1"])? true:false];
}

// 清除文本框内容
- (void) clear :(CDVInvokedUrlCommand*)command {
    NSString *passGuardId  = [command.arguments objectAtIndex:0];

    [self.passGuardManager clear : passGuardId];
}

// 销毁密码控件
- (void) destory :(CDVInvokedUrlCommand*)command {
    NSString *passGuardId  = [command.arguments objectAtIndex:0];

    [self.passGuardManager destory : passGuardId];
}

// 验证支付密码是否满足要求
- (void) validatePwdParams :(CDVInvokedUrlCommand*)command {
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    
    // 密码正确
    NSString *result =  @"1";
    // 请输入支付密码
    if ([self.passGuardManager getOutput3 : passGuardId] < 1)
        result = @"2";
    
    [self outPluginResult :command resultValue:result];
}

// 验证设置支付密码是否满足要求
- (void) validateSetPwdParams :(CDVInvokedUrlCommand*)command{
    
    NSString *passGuardId  = [command.arguments objectAtIndex:0];
    
    NSString *repeatPassGuardId = [command.arguments objectAtIndex:1];

    // 密码正确
    NSString *result =  @"1";
    
    // 请输入支付密码
    if ([self.passGuardManager getOutput3 : passGuardId] < 1)
        result = @"2";
    
    // 支付密码应由6-20位的数字和字母组成
    else if (![self.passGuardManager checkMatch : passGuardId])
        result = @"3";
    
    // 请再次输入支付密码
    else if ([self.passGuardManager getOutput3 : repeatPassGuardId] < 1)
        result = @"4";
    
    // 两次密码不一致
    else if ([self.passGuardManager getOutput2 : passGuardId] != [self.passGuardManager getOutput2 : repeatPassGuardId])
        result = @"5";
    
    [self outPluginResult :command resultValue:result];
}

- (void) outPluginResult :(CDVInvokedUrlCommand*)command resultValue:(NSString *) resultValue {
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                      messageAsString:resultValue];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

// 生成一个新的密码控件
- (void) newPassGuard:(NSString*)passGuardId key:(NSString*) key {

    // 创建新密码控件
    [self.passGuardManager newPassGuard : passGuardId];
    // 设置随机数
    [self.passGuardManager setCipherKey : passGuardId key:key];
}

- (void) initPassGuardManager {
    
    if(self.passGuardManager == nil) {
        // 初始控件集合默认大小为3
        self.passGuardManager = [[PassGuardManager alloc] init];
        [self.passGuardManager setWebView :super.webView];
    }
}

//事件结合
- (void) setHideKeyBoardJSName :(CDVInvokedUrlCommand*)command{
    NSString *r1  = [command.arguments objectAtIndex:0];
    NSString *r2  = [command.arguments objectAtIndex:1];
    [self.passGuardManager hideKeyBoard:r1 onKeyBoardHide:r2];
}
- (void) setDoneKeyBoardJSName :(CDVInvokedUrlCommand*)command{
    NSString *r1  = [command.arguments objectAtIndex:0];
    NSString *r2  = [command.arguments objectAtIndex:1];
    [self.passGuardManager doneKeyBoard:r1 onKeyBoardDone:r2];
}
- (void) setCancelKeyBoardJSName :(CDVInvokedUrlCommand*)command{
    NSString *r1  = [command.arguments objectAtIndex:0];
    NSString *r2  = [command.arguments objectAtIndex:1];
    [self.passGuardManager cancelKeyBoard:r1 onKeyBoardCancel:r2];
}
- (void) setWillShowKeyBoardJSName :(CDVInvokedUrlCommand*)command{
    NSString *r1  = [command.arguments objectAtIndex:0];
    NSString *r2  = [command.arguments objectAtIndex:1];
    [self.passGuardManager willShowKeyBoard:r1 onKeyBoardWillShow:r2];
}
@end
