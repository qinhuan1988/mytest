//
//  密码控件管理器
//  PassGuardself.manager.m
//  PassGuardCtrlDemo_src
//
//  Created by microdone on 16/6/13.
//  Copyright (c) 2016年 microdone. All rights reserved.
//

#import "PassGuardManager.h"

@implementation PassGuardManager
@synthesize manager,mm_timer;
// 单例对象
//__strong static PassGuardManager *passGuardManager = nil;

// 密码控件集合
//__strong static NSMutableDictionary *manager = nil;

__strong static IBOutlet UIWebView *webView;

// 初始方法
- (instancetype)init {
    self = [super init];
    if (self) {
        // 初始控件集合默认大小为3
        self.manager = [[NSMutableDictionary alloc] init];
        mm_timer = nil;
    }

    return self;
}

//+ (PassGuardManager *)getInstance {
//    static dispatch_once_t dgonceToken;
//    dispatch_once(&dgonceToken, ^{
//        passGuardManager = [[PassGuardManager alloc] init];
//    });
//
//    return passGuardManager;
//}

// 获得单例对象
//+ (PassGuardManager*)getInstance {
//
//    @synchronized(self) {
//        if (passGuardManager == nil) {
//
//            passGuardManager = [[self alloc] init]; // assignment not done here
//        }
//    }
//
//    return passGuardManager;
//}

//+ (PassGuardManager*) getInstance {
//    static dispatch_once_t onceToken ;
//    dispatch_once(&onceToken, ^{
//        passGuardManager = [[super allocWithZone:NULL] init] ;
//    }) ;
//
//    return passGuardManager ;
//}




//+(id) allocWithZone:(struct _NSZone *)zone {
//    return [PassGuardManager getInstance] ;
//}
//
//-(id) copyWithZone:(struct _NSZone *)zone {
//    return [PassGuardManager getInstance] ;
//}

// 是否存在直指定密码控件 true:存在;false:不存在
- (bool) hasPassGuard:(NSString *) passGuardId {

    return [self.manager objectForKey : passGuardId];
}

// 生成一个新的密码控件
- (void) newPassGuard:(NSString *) passGuardId {

    PassGuardViewController *pgvc = [[PassGuardViewController alloc] init];

    [pgvc setPassGuardViewControllerID:passGuardId];

    [[pgvc m_tf] setWebdelegate:self];

    [pgvc setDelegate:self];

    //setting attributes

    // 控件正常运行所需的license，分为生产版和测试版。
    [[pgvc m_tf] setM_license:@"R3F4VEJVT2tENGcrdDlJVFg1ZzNITmtxRUNhYmhuTFVVNlA2Q1d4YlpPV1VmN3REOGh4cTJSc2FISTEzaDBOZlhqUmh0QVhhSEQ5Y1grb3FtN1NURG90Z29VbkVvQVJ2bG14TUFUcGxFRElZbjJXdnl0NnVjallONTBzMmg5aEt0aGd0dlhBQ2pYc1VQQVJsY0ViYVZRU3QrR205dDFid2ZGcjlqYlNsN1BjPXsiaWQiOjAsInR5cGUiOiJwcm9kdWN0IiwicGFja2FnZSI6WyJjb20ubWNvbmdyb3VwLmJtdy5tZW1iZXJhcHAucHJvZCJdLCJhcHBseW5hbWUiOlsiQk1XTFAiXSwicGxhdGZvcm0iOjF9"];

    // true:密码显示明文;false:密码显示星号
    [[pgvc m_tf] setM_mode:true];

    //AES encypt key
    // 设置随机字符串，该字符串用来生产AES加密密钥，用来对用户输入的数据进行AES加密。
    //[[pgvc m_tf] setM_strInput1:[[NSString alloc] initWithFormat:@"%s", "11111111111111111111111111111111"]];

    /** 键盘分为全键盘（数字，字符，字母）和数字键盘（纯数字），
     *  默认键盘为全键盘，而设置UIKeyboardTypeNumberPad类型，或者xib中直接设置NumberPad即为数字键盘。
     */
    // [pgvc m_tf].keyboardType = UIKeyboardTypeNumberPad;

    // 设置RSA加密公钥
    [pgvc m_tf].m_strInput2 =@"MIIDSjCCAjKgAwIBAgIEUpVW4DANBgkqhkiG9w0BAQUFADBmMQswCQYDVQQGEwJDTjESMBAGA1UECBMJZ3Vhbmdkb25nMRIwEAYDVQQHEwlndWFuZ3pob3UxHTAbBgNVBAoTFG5hbmhhbmcgQ29tcGFueSBOYW1lMRAwDgYDVQQDEwduYW5oYW5nMCAXDTEzMTEyNzAyMjAxNloYDzIxMTIwNjIxMDIyMDE2WjBmMQswCQYDVQQGEwJDTjESMBAGA1UECBMJZ3Vhbmdkb25nMRIwEAYDVQQHEwlndWFuZ3pob3UxHTAbBgNVBAoTFG5hbmhhbmcgQ29tcGFueSBOYW1lMRAwDgYDVQQDEwduYW5oYW5nMIIBIjANBgkqhkiG 9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtaKLzTmvry9nVDNjSker0if2MMGy1iuc4rzi mowHQIWNtm8VvnXlLrQ3JYXi2RvIx2KDAT9JY5OSZ0AvlFkmseaqZ0vOVNUUrhCEiwY0vXqdQ3SVmLzH5x1XZBdw9fECxFBbSOi1QJsiwhG3QdaCcv4kSXQtIcepSUd/Y+lpyelNKw3D7ycwiT9r7epKbScnN9htVZcDXe3Ir6UON3j893i5dA8tiSoR+Fwsxiu1ioMxFMIW9nvzfvqTPFXlat1lsLzzSehT4W8c26IRkbRKg+fU7liEeWkd3CGY+2AR6U9lVqPhWwy76re0NY5nurDpU6L4IZjDFk8l8T0C5jQevQIDAQABMA0GCSqGSIb3DQEBBQUAA4IBAQAok2aNbtpjLcrtkdIreagRD83meZHytqbv+F7obKlj/DPuYR8W53OVAufPyOCU9EObST+umnJcpcapgyjQB75v7DeiY3l6zenLfdRaWOWo+09aK/9cpag4FYqEwzT/Opi3gt5T/5vkrlp8ZYWTXW8rzffIoQ0MS9zhK8nLRbSAMFQO+h17Bvf3nxZLTtNzp4rbmXjO/Xsta7QdF2vFM5qqT0Gi4rJosCKH4kqF3FPijCQuc12CVEavQ45pbUnhnaIjtGONYO9CPoxNFKroqWBLr6TningQ9iFNUJrBP5DtVlejzlfZ8jPU00vuyUlC+OoDqYK9fWemeWNRpKw4+ZYs";

    // 键盘不混乱（默认不混乱）
    // [[pgvc m_tf] setM_ikeyordertype:KEY_CHAOS_SWITCH_VIEW|KEY_CHAOS_PRESS_KEY];


    //[pgvc m_tf].m_strInput1 =@"11111111111111111111111111111111";

    // 设置最大可输入长度
    [pgvc m_tf].m_iMaxLen = 20;

    // 设置正则表达式，供isMatch()函数使用。
    [pgvc m_tf].m_strInputR2 = @"^(?=.*\\d.*)(?=.*[a-zA-Z].*).{6,20}$";

    [pgvc setM_bshowtoolbar:false];
    //[pgvc show];

    // 存放到集合中
    [self.manager setObject:pgvc forKey: passGuardId];

    // 设置当前的密码控件Id
    currentPassGuardId = passGuardId;
}

- (void) setPassGuardMode:(NSString *) passGuardId pmode:(BOOL)mode{
    [[self.manager objectForKey: passGuardId] m_tf].m_mode = mode;
}

/**
 * 设置键盘是否显示ToolBar
 * id 密码控件id
 * ishow 显示开关
 */
- (void)editTexthasShowtoolbar:(NSString *) passGuardId  showToolbar:(BOOL)ishow{
    [[self.manager objectForKey: passGuardId] setM_bshowtoolbar:ishow];
}

/**
 * 开始启动指定密码控件键盘
 *  id 密码控件id
 */
- (void) StartPassGuardKeyBoard:(NSString *) passGuardId {

    // StopPassGuardKeyBoardAllExceptID(id);

    // 设置当前的密码控件Id
    currentPassGuardId = passGuardId;

    [[self.manager objectForKey:passGuardId] show];

    [self displayKeyboard:passGuardId ];
}

/**
 * 停止指定密码控件键盘
 *  id 密码控件id
 */
- (void) StopPassGuardKeyBoard: (NSString *)passGuardId {
    [[self.manager objectForKey:passGuardId] dismiss];
}

/**
 * 停止所有密码控件键盘
 * @param id 密码控件id
 */
- (void) StopPassGuardKeyBoardAll {

    // 得到词典中所有Value值
    NSEnumerator * enumeratorValue = [self.manager objectEnumerator];

    //快速枚举遍历所有KEY的值
    for (PassGuardViewController *object in enumeratorValue) {

        [object dismiss];
    }
}

- (void) StopPassGuardKeyBoardAllExceptID:(NSString*) passGuardId {

    // 得到词典中所有KEY值
    NSEnumerator * enumeratorKey = [self.manager keyEnumerator];

    // 快速枚举遍历所有KEY的值
    for (NSString *key in enumeratorKey) {

        if (passGuardId == key) {
            continue;
        }

        // 停掉其他键盘
        [[self.manager objectForKey: key] dismiss];
    }
}

// 设置最大可输入长度
- (void) setMaxLength :(NSString *) passGuardId  maxLength:(int)maxLength {

    [[self.manager objectForKey: passGuardId] m_tf].m_iMaxLen = maxLength;
}


// 设置键盘输入正则规则,用来匹配字符框中已经输入字符。
- (void) setInputRegex:(NSString *) passGuardId  regex:(NSString *) regex{

    [[self.manager objectForKey: passGuardId] m_tf].m_strInputR1 = regex;
}

// 设置正则表达式，供isMatch()函数使用
- (void) setMatchRegex:(NSString *) passGuardId  regex:(NSString *) regex {
    [[self.manager objectForKey: passGuardId] m_tf].m_strInputR2 = regex;
}

// 校验输入格式
- (bool) checkMatch:(NSString *) passGuardId {
    return [[[self.manager objectForKey: passGuardId] m_tf] isMatch];
}

// 获得输入等级
- (NSArray  *) getPassLevel:(NSString *) passGuardId {

    return [[[self.manager objectForKey: passGuardId] m_tf] getInputLevel];
}

/** 键盘分为全键盘（数字，字符，字母）和数字键盘（纯数字），
 *  默认键盘为全键盘，而设置UIKeyboardTypeNumberPad类型，或者xib中直接设置NumberPad即为数字键盘。
 */
- (void) useNumberPad:(NSString *)passGuardId  use :(bool) use {

    if (use) {
        [[self.manager objectForKey: passGuardId] m_tf].keyboardType = UIKeyboardTypeNumberPad;
    } else {
        [[self.manager objectForKey: passGuardId] m_tf].keyboardType = UIKeyboardTypeDefault;
    }
}

// 设置随机字符串，用来产生AES密钥（需要与解密端字符串同步）
- (void) setCipherKey:(NSString *) passGuardId key:(NSString *) key {

    [[self.manager objectForKey: passGuardId] m_tf].m_strInput1 = key;
}

// 获取用户输入数据的加密密文（AES），用Base64编码。
- (NSString *) getOutput1 : (NSString *) passGuardId {

    return [[[self.manager objectForKey: passGuardId] m_tf] getOutput1];
}

- (NSString *) getText : (NSString *)passGuardId {
    return [[[self.manager objectForKey: passGuardId] m_tf] text];
}

// 获取用户输入数据的加密密文（RSA-AES），用Base64编码。
- (NSString *) getOutput0 :(NSString *) passGuardId {
    return [[[self.manager objectForKey: passGuardId] m_tf] getOutput4:3];
}

// 获取用户输入数据的MD5值
- (NSString *) getOutput2 :(NSString *) passGuardId {
    return [[[self.manager objectForKey: passGuardId] m_tf] getOutput2];
}

// 获取用户输入数据的长度
- (NSInteger) getOutput3 : (NSString *) passGuardId {
    return [[[self.manager objectForKey: passGuardId] m_tf] getOutput3];
}

// 键盘是否启动
- (bool) isKeyBoardShowing : (NSString *) passGuardId {
     return  [[self.manager objectForKey:passGuardId] isShow];
}

// 是否有键盘是否启动
- (bool) hasKeyBoardShowing{
    return true;
}


- (void) setWatchOutside:(NSString*)passGuardId  need:(bool) need {

}

- (void) EditTextAlwaysShow :(NSString*)passGuardId  need:(bool)need {

}

// 清除文本框内容
- (void) clear : (NSString *)passGuardId {

    [[[self.manager objectForKey: passGuardId] m_tf] Clean];
}

// 销毁密码控件
- (void) destory : (NSString *) passGuardId {
    [[[self.manager objectForKey: passGuardId] m_tf] delegate];
    // 从集合中删除
    [self.manager removeObjectForKey:passGuardId];
}

#pragma mark -光标处理
-(void)displayKeyboard:(NSString *) passGuardId
{
    PassGuardViewController* pgvc = [self.manager objectForKey : passGuardId];

    if(pgvc)
    {
        //tmpPGV = pgvc;

        [pgvc show];

        if((mm_timer != nil)&&([mm_timer isValid]))
        {
            [mm_timer invalidate];
        }

        NSTimeInterval timeInterval = 0.5f ;

        mm_timer = [NSTimer scheduledTimerWithTimeInterval:timeInterval
                                                    target:self
                                                  selector:@selector(handleTimer:)
                                                  userInfo:passGuardId
                                                   repeats:YES];
    }
}

-(void)displaycusor:(NSString *) passGuardId strvalue:(NSString*)strv iflag:(int)iv placeHolder:(NSString *)placeHolder
{
    //if(passGuardId
      // &&[passGuardId length])
    {
        NSString *strcallfun = [[NSString alloc] initWithFormat:@"mycursorFunction('%@', '%@', '%d');document.getElementById('%@').placeholder=\
                                 '%@'", passGuardId, strv?strv:@"", iv,passGuardId,placeHolder] ;
        //NSLog(@"strcallfun is %@\n", strcallfun);
        [webView stringByEvaluatingJavaScriptFromString:strcallfun];


        //[strid release];
    }
}

-(void)handleTimer:(NSTimer *) timer
{
    static int icout = 1;

    NSString *passGuardId = (NSString *)[timer userInfo];

    PassGuardViewController* pgvc = [self.manager objectForKey : passGuardId];

    if([pgvc isShow])
    {
        [self displaycusor:passGuardId strvalue:[[pgvc m_tf] text] iflag:icout++%2 placeHolder:@""];
    }
    else
    {
        icout = 1;

        [self displaycusor:passGuardId strvalue:[[pgvc m_tf] text] iflag:0 placeHolder:[pgvc m_tf].html5Placehoder];

        [mm_timer invalidate];
    }
}


-(void)instertWText{

    NSMutableString * _out =[[NSMutableString alloc]init ];

    [_out appendFormat:@"var field = document.getElementById('%@');", currentPassGuardId];

    [_out appendFormat:@"field.value= '%@';",[[self.manager objectForKey: currentPassGuardId] m_tf].text];
    //[self.commandDelegate evalJs:_out];
   [webView stringByEvaluatingJavaScriptFromString:_out];
}
// 销毁密码控件
- (void) setWebView : (UIWebView*) view {
    webView = view;
    NSMutableString *jscusor = [[NSMutableString alloc] init];
    [jscusor appendString:@"var script = document.createElement('script');"];
    [jscusor appendString:@"script.type = 'text/javascript';"];
    [jscusor appendString:@"script.text = \"function mycursorFunction(strid, str, iflag){ "];
    //[jscusor appendString:@"alert('1');"];
    [jscusor appendString:@"var e = document.getElementById(strid);"];
    [jscusor appendString:@"if (iflag == '1')"];
    [jscusor appendString:@"{e.value = str+'|';}"];
    [jscusor appendString:@"else {e.value = str;}"];
    [jscusor appendString:@"}\";"];
    [jscusor appendString:@"document.getElementsByTagName('head')[0].appendChild(script);"];
    [view stringByEvaluatingJavaScriptFromString:jscusor];

}

- (void) hideKeyBoard : (NSString *) passGuardId onKeyBoardHide:(NSString *)hideFunName{
    [[self.manager objectForKey: passGuardId] setJsBHideFunName:hideFunName];
}
- (void) doneKeyBoard : (NSString *) passGuardId onKeyBoardDone:(NSString *)doneFunName{
    [[self.manager objectForKey: passGuardId] setJsBDoneFunName:doneFunName];
}
- (void) cancelKeyBoard : (NSString *) passGuardId onKeyBoardCancel:(NSString *)cancelFunName{
    [[self.manager objectForKey: passGuardId] setJsBCancelFunName:cancelFunName];
}
- (void) willShowKeyBoard : (NSString *) passGuardId onKeyBoardWillShow:(NSString *)WillShowName{
    [[self.manager objectForKey: passGuardId] setJsWillShowKeyBoardFunName:WillShowName];
}

- (void) barJS:(id)sender jsName:(NSString *)jsName{


    //NSLog(@"strid is %@\n", strid);
    NSString *strid = [sender passGuardViewControllerID];
    if(strid
       &&[strid length]&&jsName&&[jsName length])
    {
        [webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@('%@')",jsName,strid]];
    }
}

- (void) BDoneFun:   (id)sender{
    [self barJS:sender jsName:[sender jsBCancelFunName]];
}
- (void) BCancelFun: (id)sender{
     [self barJS:sender jsName:[sender jsBCancelFunName]];
}
- (void) BHideFun:   (id)sender{
     [self barJS:sender jsName:[sender jsBCancelFunName]];
}


-(void)DoneFun:(id)sender{

}

-(void)HideFun:(id)sender
{
//    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"press button" message:@"hide button" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
//
//    [alert show];
}


@end
