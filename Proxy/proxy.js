function FindProxyForURL(url, host)
{
 if (dnsDomainIs(host, "vk.com"))
  return "212.192.120.42:8080";
}