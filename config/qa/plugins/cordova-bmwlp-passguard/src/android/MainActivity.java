/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.mcongroup.bmw.memberapp.sit;

import android.os.Bundle;
import org.apache.cordova.*;

import cn.passguard.PassGuardEdit;

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        PassGuardManager.getInstance(this);
        PassGuardEdit
                .setLicense("TVM1MWlhNnRQNzdaUWdkdm5yOU03SVRwdmxaVDVpVWZ2Sk8xZFNTbk9EblAvZmxnSTNDRmhCQWtYYW1udHJtSnVlL041ZHc3Z3JYYU9LelZKUlpPdjRPSnB1YnBVdE9CL0IrWnZsSXFCSE5HcFdaK3RRQWp5bnFkZno2Q1V6N2FNcTlVdTJ3YUlhUW9GQkx1OGNNMTdBMXhOWDdwdVBIODBFSEt5V3hqR3JjPXsiaWQiOjAsInR5cGUiOiJwcm9kdWN0IiwicGFja2FnZSI6WyJjb20ubWNvbmdyb3VwLmJtdy5tZW1iZXJhcHAuc2l0Il0sImFwcGx5bmFtZSI6WyJCTVdMUCJdLCJwbGF0Zm9ybSI6Mn0=");
        loadUrl(launchUrl);
    }
}
