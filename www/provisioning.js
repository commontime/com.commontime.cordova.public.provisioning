
module.exports = {
  updateVersions: function (success, fail) {
    try {
      cordova.exec(success, fail, "Provisioning", "updateVersions", []);
    } catch (e) { }
  },
  downloadVersion: function (success, fail, options) {
    try {
      cordova.exec(success, fail, "Provisioning", "downloadVersion", [options]);
    } catch (e) { }
  },
  installVersion: function (success, fail, options) {
    try {
      cordova.exec(success, fail, 'Provisioning', 'installVersion', [options]);
    } catch (e) { }
  },
  getLatestVersionNumber: function (success, fail, id) {
    try {
      cordova.exec(success, fail, 'Provisioning', 'getLatestVersionNumber', []);
    } catch (e) { }
  },
  getVersionsInfo: function (success, fail, id) {
    try {
      cordova.exec(success, fail, 'Provisioning', 'getVersionsInfo', []);
    } catch (e) { }
  },
  getInstalledVersion: function (success, fail) {
    try {
      cordova.exec(success, fail, 'Provisioning', 'getInstalledVersion', []);
    } catch (e) { }
  },
  restartApplication: function (success, fail) {
    try {
      cordova.exec(success, fail, 'Provisioning', 'restartApplication', []);
    } catch (e) { }
  }
}

document.addEventListener("deviceready", function () {

  cordova.exec(function (version) {
    var event = document.createEvent("CustomEvent");

    event.initCustomEvent("updateavailable", true, true, { version: version });
    setTimeout(function () { document.dispatchEvent(event); }, 0);
  }, function () { }, 'Provisioning', 'listenForUpdates', []);

  cordova.exec(function (progress) {
    var event = document.createEvent("CustomEvent");

    event.initCustomEvent("updateprogress", true, true, progress);
    document.dispatchEvent(event);
  }, function () { }, 'Provisioning', 'listenForProgress', []);

  cordova.exec(function (result) {
    if (result) {
      cordova.exec(function () { }, function () { }, 'Provisioning', 'startChecking', []);
    } else {
      cordova.exec(function () { }, function () { }, 'Provisioning', 'restartApplication', []);
    }
  }, function (error) {
    alert("Could not restart into installed app: " + error);
  }, 'Provisioning', 'isUsingInstalledVersion', []);
}, false);
