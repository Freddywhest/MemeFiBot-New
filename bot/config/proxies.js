//Currently only http and https proxies are supported.
//HTTP proxies are not supported as they required a completely different connection type.

const proxies = [
  // EXAMPLE:
  {
    ip: "123.456.789.123", // Proxy host (IP or hostname)
    port: 1234, // Proxy port
    protocol: "http", // Proxy protocol [http/https].
    username: "username", // If use Socks with auth then you need to provide a username.
    password: "password", // If use Socks with auth then you need to provide a password.
  },
  {
    ip: "123.456.789.123", // Proxy host (IP or hostname)
    port: 1234, // Proxy port
    protocol: "http", // Proxy protocol [http/https].
    username: "username", // If use Socks with auth then you need to provide a username.
    password: "password", // If use Socks with auth then you need to provide a password.
  },
  {
    ip: "123.456.789.123", // Proxy host (IP or hostname)
    port: 1234, // Proxy port
    protocol: "http", // Proxy protocol [http/https].
    username: "username", // If use Socks with auth then you need to provide a username.
    password: "password", // If use Socks with auth then you need to provide a password.
  },
];

module.exports = proxies;
