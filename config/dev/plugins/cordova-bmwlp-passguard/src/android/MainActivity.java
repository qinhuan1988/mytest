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

package com.mcongroup.bmw.memberapp.dev;

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
                .setLicense("WU9mcWFzRjIreTNxZVhBelRsSXAzSkppTUlXMVpIOFk4WVFXeXVRMHprUXI0TkpZalRSbWJRQU9IY0RndzQ2YnpNUHozL0VrNVRSb25FeUNvbTFxekx3MHlIQTAvTHNTNHhCdEZycS8yRkw1VWNEaHVxWW00WGF4U1FpcU9wVi9Tc29rK1ZxRlNZcHlCZVJtMC85VTVsTDJ1NFFiQVNieGVBbFR4eE1wMUpVPXsiaWQiOjAsInR5cGUiOiJ0ZXN0IiwicGxhdGZvcm0iOjIsIm5vdGJlZm9yZSI6IjIwMTYxMDI0Iiwibm90YWZ0ZXIiOiIyMDE3MDEyNCJ9");
        loadUrl(launchUrl);
    }
}
