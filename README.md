# Provisioner plugin

### Configuration

```
<!-- The page that is launched to start the application -->
<preference name="provisioning_startpage" value="index.html" />

<!-- URL to download the versions manifest JSON -->
<preference name="provisioning_manifest" value="http://graham2:3001/versionInfo" />

<!-- Time in minutes between fetching versions manifest -->
<preference name="provisioning_poll" value="2" />

<!-- Whether to check/download new versions automatically -->
<preference name="provisioning_manual" value="false" />

<!-- Download when on wifi only -->
<preference name="provisioning_wifionly" value="true" />

<!-- Checksum algorithm (none/MD5/SHA-1/SHA-256) -->
<preference name="provisioning_checksum" value="SHA-1" />

<!-- Custom headers -->
<preference name="provisioning_custom_headers" value="{'appKey': 'xyz123', 'xxxx': 'zzzz'}" />

<!-- Allow navigation ##SUPER IMPORTANT## -->
<allow-navigation href="*" />
```

### Manifest format

```
{
  "1.0.7-rc.1+build.1": {
    "url": "http://192.168.3.81:8081/build.zip",
    "description": "1.0.7-rc.1+build.1",
    "readme": "This release fixed some things",
    "checksum": "ff933528ece1d78887dc49521084a0d622709d844f070cac324233d54eb43549"
  },
  "0.0.2": {
    "url": "http://ipv4.download.thinkbroadband.com/20MB.zip",
    "description": "0.0.2",
    "readme": "This was an old release",
    "checksum": "48b4e8f64d7c24533ee5ad34cf583ab14ce1b221fcb9263d131c6ce2b9e59c06"
  }
}
```

### Events

```
document.addEventListener('updateprogress', onProgress, false);

function onProgress(event) {
	document.getElementById("progress").value = event.detail.progress;
	document.getElementById("status").innerHTML = event.detail.state + ": " + event.detail.progress + "%";
	console.dir(event.detail);
}
```

```
document.addEventListener('updateavailable', onUpdateAvailable, false);

function onUpdateAvailable(event) {
	if( confirm("Update to: " + event.detail.version + "?") ) {
		...
	}
}
```

### Calls

**_plugins.provisioning.updateVersions( success, fail );_**
```
plugins.provisioning.updateVersions(function(result) { 
	console.log(JSON.stringify(result));
}, function(error) { 
	console.error(result); 
});

{latestVersion: "1.0.7-rc.1+build.1"}
```

**_plugins.provisioning.downloadVersion( success, fail, options );_**
```
var options = {
	"version": "1.0.0"
};
plugins.provisioning.downloadVersion(function(result) { 
	console.log(result); 
}, function(error) { 
	console.error(error); 
}, {"version":"1.0.7-rc.1+build.1"});

OK
```

**_plugins.provisioning.installVersion( success, fail, options );_**
```
var options = {
	"version": "1.0.0"
};
plugins.provisioning.installVersion(function(result) { 
	console.log(result); 
}, function(error) { 
	console.error(error); 
}, {"version":"1.0.7-rc.1+build.1"});

OK
```

**_plugins.provisioning.getLatestVersionNumber( success, fail );_**
```
plugins.provisioning.getLatestVersionNumber(function(result) { 
	console.log(result); 
}, function(error) { 
	console.error(error); 
});

1.0.7-rc.1+build.1
```

**_plugins.provisioning.getVersionsInfo( success, fail );_**
```
plugins.provisioning.getVersionsInfo(function(result) { 
	console.log(JSON.stringify(result)); 
}, function(error) { 
	console.error(error); 
});

{"versions":{"0.0.2":{"state":0,"readme":"This was an old release","checksum":"jkwfkaerfkjawfn","description":"0.0.2","url":"http://ipv4.download.thinkbroadband.com/20MB.zip"},"1.0.7-rc.1+build.1":{"state":2,"readme":"This release fixed some things","checksum":"5b37e46fe09121ba455f4194646093600537d4764f583e68d8eaae0e7902c4f5x","description":"1.0.7-rc.1+build.1","url":"http://192.168.3.81:8081/build.zip"}}}
```

**_plugins.provisioning.getInstalledVersion( success, fail );_**
```
plugins.provisioning.getInstalledVersion(function(result) { 
	console.log(result); 
}, function(error) { 
	console.error(error); 
});

1.0.7-rc.1+build.1
```

**_plugins.provisioning.restartApplication( success, fail );_**
```
plugins.provisioning.restartApplication(function(result) { 
	console.log(result); 
}, function(error) { 
	console.error(error); 
});

[reloads app]
```