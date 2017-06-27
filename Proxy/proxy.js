function FindProxyForURL(url, host)
{
  if (dnsDomainIs(host, "vk.com")) {
   return "185.88.127.113:53281";
  }
}