// Declare app level module which depends on filters, and services
angular.module('webapp.config', [])
    .constant('DEFAULT_SETTING', {
        // 10000 ms -> 10s
        'timeout': 10000,
        'defaultCountDown': 120,
        // /content/BMW-Loyalty/zh/ for chinese content
        'translate': {
            // zh_CN for Chinese translation
            // en for English translation
            // no more others right now
            'lang': 'en',
            // zh-CN to set chinese as the default language
            'debug': false
        },
        'IDTypes': [{
            id: '1',
            name: 'ID Card'
        }, {
            id: '2',
            name: 'Passport'
        }],
        'communicationTypes': [{
            id: 'S',
            name: 'Phone'
        }, {
            id: 'E',
            name: 'Email'
        }]
    })
    .constant('moment', require('moment'));
