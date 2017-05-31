angular.module('webapp.chat').service({
    AESService: AESService
});

function AESService() {

    var akey = [0x56, 0x42, 0x4e, 0x58, 0x47, 0x48, 0x46, 0x4f, 0x46, 0x41, 0x47, 0x51, 0x42, 0x48, 0x49, 0x45, 0x4e, 0x53, 0x59, 0x4a, 0x56, 0x49, 0x41, 0x48, 0x47, 0x4c, 0x52, 0x45, 0x4c, 0x4a, 0x58, 0x42];

    var keyBv = new Uint8Array(akey);

    // WordArray
    var keyWA = CryptoJS.enc.u8array.parse(keyBv);

    var encryptString = function(plaintText) {


        var encrypted = CryptoJS.AES.encrypt(plaintText, keyWA, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        var encryptedBase64Str = encrypted.toString();


        return encryptedBase64Str;
    };

    return {
        encryptString: encryptString
    };
}
