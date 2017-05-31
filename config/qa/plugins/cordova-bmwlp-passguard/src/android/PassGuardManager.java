package com.mcongroup.bmw.memberapp.sit;

import android.app.Activity;
import android.webkit.WebView;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONException;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;

import cn.passguard.PassGuardEdit;
import cn.passguard.doAction;

public class PassGuardManager extends CordovaPlugin {
	private static Activity m_context;
	private WebView webView;
	private static PassGuardManager INSTANCE = new PassGuardManager();

	HashMap<String, PassGuardEdit> manager = new HashMap<String, PassGuardEdit>();

	@Override
	public boolean execute(String action, final CordovaArgs args,
			CallbackContext callbackContext) throws JSONException {
		if ("hasPassGuard".equals(action)) {

			if (hasPassGuard(args.getString(0))) {
				callbackContext.success();
			} else {
				callbackContext.error(0);
			}

			return true;
		} else if ("newPassGuard".equals(action)) {
			newPassGuard(args.getString(0));

			return true;
		} else if ("setCipherKey".equals(action)) {
			setCipherKey(args.getString(0), args.getString(1));

			return true;
		} else if ("setPassGuardKeyBoardHasShowtoolbar".equals(action)) {
			EditTextAlwaysShow(args.getString(0), args.getBoolean(1));

			return true;
		} else if ("setWebViewSyn".equals(action)) {
			setWebViewSyn(args.getString(0), args.getBoolean(1));

			return true;
		} else if ("setMaxLength".equals(action)) {
			setMaxLength(args.getString(0), args.getInt(1));

			return true;
		} else if ("StartPassGuardKeyBoard".equals(action)) {
			StartPassGuardKeyBoard(args.getString(0));

			return true;
		} else if ("initPassGuardKeyBoard".equals(action)) {
			initPassGuardKeyBoard(args.getString(0));

			return true;
		} else if ("getOutput1".equals(action)) {
			callbackContext.success(getOutput1(args.getString(0)));

			return true;
		} else if ("getOutput2".equals(action)) {
			callbackContext.success(getOutput2(args.getString(0)));

			return true;
		} else if ("getOutput3".equals(action)) {
			callbackContext.success(getOutput3(args.getString(0)));

			return true;
		} else if ("getText".equals(action)) {
			getText(args.getString(0));

			return true;
		} else if ("StopPassGuardKeyBoard".equals(action)) {
			StopPassGuardKeyBoard(args.getString(0));

			return true;
		} else if ("StopPassGuardKeyBoardAll".equals(action)) {
			StopPassGuardKeyBoardAll();

			return true;
		} else if ("setPassGuardMode".equals(action)) {
			System.out.println("sss=="+args.getString(1));
			setEncrypt(args.getString(0), args.getString(1).equals("0") ? true : false);

			return true;
		} else if ("setButtonPress".equals(action)) {
			setButtonPress(args.getString(0),  args.getBoolean(1));

			return true;
		} else if ("setInputRegex".equals(action)) {
			setInputRegex(args.getString(0), args.getString(1));

			return true;
		} else if ("setMatchRegex".equals(action)) {
			setMatchRegex(args.getString(0), args.getString(1));

			return true;
		} else if ("setReorder".equals(action)) {
			setReorder(args.getString(0), args.getInt(1));

			return true;
		} else if ("checkMatch".equals(action)) {
			if (checkMatch(args.getString(0))) {
				callbackContext.success();
			} else {
				callbackContext.error(0);
			}

			return true;
		} else if ("getPassLevel".equals(action)) {
			callbackContext.success(getPassLevel(args.getString(0)).toString());

			return true;
		} else if ("useNumberPad".equals(action)) {
			useNumberPad(args.getString(0), args.getBoolean(1));

			return true;
		} else if ("isKeyBoardShowing".equals(action)) {
			if (isKeyBoardShowing(args.getString(0))) {
				callbackContext.success();
			} else {
				callbackContext.error(0);
			}

			return true;
		} else if ("hasKeyBoardShowing".equals(action)) {
			if (hasKeyBoardShowing()) {
				callbackContext.success();
			} else {
				callbackContext.error(0);
			}

			return true;
		} else if ("setWatchOutside".equals(action)) {
			setWatchOutside(args.getString(0), args.getBoolean(0));

			return true;
		} else if ("clear".equals(action)) {
			clear(args.getString(0));

			return true;
		} else if ("destory".equals(action)) {
			destory(args.getString(0));

			return true;
		}

		return false;
	}

	public static PassGuardManager getInstance(Activity context) {
		m_context = context;
		return INSTANCE;
	}

	public void setWebView(WebView wv) {
		webView = wv;
	}


	public boolean hasPassGuard(String id) {
		return manager.containsKey(id);
	}


	public void newPassGuard(final String id) {
		final PassGuardEdit passGuardEdit = new PassGuardEdit(m_context, null);
		passGuardEdit.m_strid = id;
		passGuardEdit.m_webview = (WebView) super.webView.getView();
		webView = passGuardEdit.m_webview;
		doAction hideaction = new doAction() {
			@Override
			public void doActionFunction() {
				((Activity) m_context).runOnUiThread(new Runnable() {
					@Override
					public void run() {
						webView.loadUrl("javascript:"
								+ "var keyboard = document.getElementById('keyboard');"
								+ "document.body.removeChild(keyboard);");
						webView.loadUrl("javascript:doHideAction(\"" + id
								+ "\")");
					}
				});
			}
		};
		doAction showaction = new doAction() {
			@Override
			public void doActionFunction() {
				((Activity) m_context).runOnUiThread(new Runnable() {
					@Override
					public void run() {
						webView.loadUrl("javascript:"
								+ "var edittext = document.getElementById('"
								+ id
								+ "');"
								+ "var keyboardheight = "
								+ passGuardEdit.getHeight()
								/ webView.getScale()
								+ ";"
								+ "var clientHeight;"
								+ "if ( document.compatMode == 'CSS1Compat' ) {"
								+ "clientHeight = document.documentElement.clientHeight;"
								+ "} else {"
								+ "clientHeight = document.body.clientHeight;"
								+ "}"
								+ "var actualTop = edittext.offsetTop; var current = edittext.offsetParent; while (current !== null){actualTop += current.offsetTop; current = current.offsetParent;};"
								+ "var screenbottom = clientHeight - actualTop + document.body.scrollTop - edittext.clientHeight;"
								+ "var keyboard = document.createElement('div');"
								+ "keyboard.style.height = keyboardheight + 'px';"
								+ "keyboard.id = 'keyboard';"
								+ "document.body.appendChild(keyboard);"
								+ "if (screenbottom < keyboardheight) {"
								+ "document.body.scrollTop = actualTop + edittext.clientHeight - clientHeight + keyboardheight;"
								+ "}");
						webView.loadUrl("javascript:doShowAction(\"" + id
								+ "\")");
					}
				});
			}
		};
		passGuardEdit.setKeyBoardShowAction(showaction);
		passGuardEdit.setKeyBoardHideAction(hideaction);
		passGuardEdit.EditTextAlwaysShow(true);
		manager.put(id, passGuardEdit);
	}


	public void initPassGuardKeyBoard(String id) {
		manager.get(id).initPassGuardKeyBoard();
	}


	public void StartPassGuardKeyBoard(String id) {
		StopPassGuardKeyBoardAllExceptID(id);
		manager.get(id).StartPassGuardKeyBoard();
	}


	public void StopPassGuardKeyBoard(String id) {
		manager.get(id).StopPassGuardKeyBoard();
	}


	public void StopPassGuardKeyBoardAll() {
		Iterator<Entry<String, PassGuardEdit>> it = manager.entrySet()
				.iterator();
		while (it.hasNext()) {
			Entry<String, PassGuardEdit> entry = it.next();

			if (entry.getValue().isKeyBoardShowing()) {
				entry.getValue().StopPassGuardKeyBoard();
			}
		}
	}


	public void StopPassGuardKeyBoardAllExceptID(String id) {
		Iterator<Entry<String, PassGuardEdit>> it = manager.entrySet()
				.iterator();
		while (it.hasNext()) {
			Entry<String, PassGuardEdit> entry = it.next();

			if (entry.getKey().equals(id))
				continue;

			if (entry.getValue().isKeyBoardShowing()) {
				entry.getValue().StopPassGuardKeyBoard();
			}
		}
	}


	public void setEncrypt(String id, boolean need) {
		System.out.println("setEncrypt");
		System.out.println("setEncrypt："+id);
		System.out.println("setEncrypt："+need);
		manager.get(id).setEncrypt(need);
	}


	public void setWebViewSyn(String id, boolean need) {
		manager.get(id).setWebViewSyn(need);
	}

	public void setButtonPress(String id, boolean need) {
		manager.get(id).setButtonPress(need);
	}


	public void setMaxLength(String id, int MaxLength) {
		manager.get(id).setMaxLength(MaxLength);
	}


	public void setInputRegex(String id, String regex) {
		manager.get(id).setInputRegex(regex);
	}


	public void setMatchRegex(String id, String regex) {
		manager.get(id).setMatchRegex(regex);
	}


	public void setReorder(String id, int type) {
		manager.get(id).setReorder(type);
	}


	public boolean checkMatch(String id) {
		return manager.get(id).checkMatch();
	}


	public int[] getPassLevel(String id) {
		return manager.get(id).getPassLevel();
	}


	public void useNumberPad(String id, boolean use) {
		manager.get(id).useNumberPad(use);
	}


	public void setCipherKey(String id, String key) {
		manager.get(id).setCipherKey(key);
	}


	public String getOutput1(String id) {
		return manager.get(id).getAESCiphertext();
	}


	public String getText(String id) {
		return manager.get(id).getText().toString();
	}


	public String getOutput2(String id) {
		return manager.get(id).getMD5();
	}


	public int getOutput3(String id) {
		return manager.get(id).getLength();
	}


	public boolean isKeyBoardShowing(String id) {
		return manager.get(id).isKeyBoardShowing();
	}


	public boolean hasKeyBoardShowing() {
		Iterator<Entry<String, PassGuardEdit>> it = manager.entrySet()
				.iterator();
		while (it.hasNext()) {
			Entry<String, PassGuardEdit> entry = it.next();

			if (entry.getValue().isKeyBoardShowing()) {
				return true;
			}
		}
		return false;
	}


	public void setWatchOutside(String id, boolean need) {
		manager.get(id).setWatchOutside(need);
	}


	public void EditTextAlwaysShow(String id, boolean need) {
		manager.get(id).EditTextAlwaysShow(need);
	}


	public void clear(String id) {
		manager.get(id).clear();
	}


	public void destory(String id) {
		//manager.get(id).destory();
		manager.remove(id);
	}

}
