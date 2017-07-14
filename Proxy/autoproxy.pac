function FindProxyForURL(url, host) {
  var PROXY = "PROXY 178.140.216.229:8080;SOCKS5 178.140.216.229:8080";
  var DEFAULT = "DIRECT";
  
  if (shExpMatch(host, "vk.com")) return PROXY;
  
  return DEFAULT;
}