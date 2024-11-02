const user_agents = [
  //Samsung Galaxy S22 5G
  "Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; SM-S901U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Samsung Galaxy S22 Ultra 5G
  "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; SM-S908U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Samsung Galaxy S21 5G
  "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Samsung Galaxy S21 Ultra 5G
  "Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; SM-G998U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Samsung Galaxy A53 5G
  "Mozilla/5.0 (Linux; Android 13; SM-A536B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; SM-A536U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Samsung Galaxy A51
  "Mozilla/5.0 (Linux; Android 13; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; SM-A515U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Samsung Galaxy S10
  "Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 12; SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Google Pixel 6
  "Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Google Pixel 6a
  "Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Google Pixel 6 Pro
  "Mozilla/5.0 (Linux; Android 13; Pixel 6 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Google Pixel 7
  "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Google Pixel 7 Pro
  "Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Motorola Moto G Pure
  "Mozilla/5.0 (Linux; Android 12; moto g pure) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Motorola Moto G Stylus 5G
  "Mozilla/5.0 (Linux; Android 12; moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Motorola Moto G Stylus 5G (2022)
  "Mozilla/5.0 (Linux; Android 12; moto g stylus 5G (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Motorola Moto G 5G (2022)
  "Mozilla/5.0 (Linux; Android 12; moto g 5G (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Motorola Moto G Power (2022)
  "Mozilla/5.0 (Linux; Android 12; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Motorola Moto G Power (2021)
  "Mozilla/5.0 (Linux; Android 11; moto g power (2021)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Redmi Note 9 Pro
  "Mozilla/5.0 (Linux; Android 12; Redmi Note 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Redmi Note 8 Pro
  "Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Huawei P30 Pro
  "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Huawei P30 lite
  "Mozilla/5.0 (Linux; Android 10; MAR-LX1A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Redmi Note 10 Pro
  "Mozilla/5.0 (Linux; Android 13; M2101K6G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Xiaomi Poco X3 Pro
  "Mozilla/5.0 (Linux; Android 12; M2102J20SG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Redmi Note 11 Pro 5G
  "Mozilla/5.0 (Linux; Android 12; 2201116SG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //OnePlus Nord N200 5G
  "Mozilla/5.0 (Linux; Android 12; DE2118) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Samsung Galaxy S23 Ultra 5G
  "Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; SM-S918U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Samsung Galaxy S23 5G
  "Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; SM-S911U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Samsung Galaxy Note 20 Ultra 5G
  "Mozilla/5.0 (Linux; Android 13; SM-N986B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; SM-N986U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Samsung Galaxy Note 20 5G
  "Mozilla/5.0 (Linux; Android 13; SM-N981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; SM-N981U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //OnePlus 9 Pro
  "Mozilla/5.0 (Linux; Android 13; LE2121) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; LE2125) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //OnePlus 9
  "Mozilla/5.0 (Linux; Android 13; LE2113) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; LE2115) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //OnePlus 8T
  "Mozilla/5.0 (Linux; Android 13; KB2001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; KB2005) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Huawei P40 Pro
  "Mozilla/5.0 (Linux; Android 10; ELS-NX9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 10; ELS-N04) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Huawei P40
  "Mozilla/5.0 (Linux; Android 10; ANA-NX9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 10; ANA-N29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Xiaomi Mi 11
  "Mozilla/5.0 (Linux; Android 13; M2011K2C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; M2011K2G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Xiaomi Mi 11 Ultra
  "Mozilla/5.0 (Linux; Android 13; M2102K1C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; M2102K1G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Xiaomi Mi 11i
  "Mozilla/5.0 (Linux; Android 13; M2012K11G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Oppo Find X5 Pro
  "Mozilla/5.0 (Linux; Android 13; CPH2305) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 13; CPH2307) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Oppo Find X3 Pro
  "Mozilla/5.0 (Linux; Android 13; CPH2173) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Oppo Reno 6 Pro 5G
  "Mozilla/5.0 (Linux; Android 13; CPH2247) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Vivo X70 Pro+
  "Mozilla/5.0 (Linux; Android 13; V2114) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Vivo X60 Pro+
  "Mozilla/5.0 (Linux; Android 13; V2056A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //LG Velvet 5G
  "Mozilla/5.0 (Linux; Android 13; LM-G900N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Sony Xperia 1 III
  "Mozilla/5.0 (Linux; Android 13; XQ-BC72) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Sony Xperia 5 II
  "Mozilla/5.0 (Linux; Android 13; XQ-AS72) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Nokia 8.3 5G
  "Mozilla/5.0 (Linux; Android 13; Nokia 8.3 5G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Nokia 7.2
  "Mozilla/5.0 (Linux; Android 12; Nokia 7.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Realme GT 2 Pro
  "Mozilla/5.0 (Linux; Android 13; RMX3301) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Realme X7 Pro
  "Mozilla/5.0 (Linux; Android 13; RMX2121) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Asus ROG Phone 5
  "Mozilla/5.0 (Linux; Android 13; ASUS_I005DA) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Asus Zenfone 8
  "Mozilla/5.0 (Linux; Android 13; ASUS_I006DA) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Google Pixel 7 Pro
  "Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Google Pixel 7
  "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Google Pixel 6 Pro
  "Mozilla/5.0 (Linux; Android 13; Pixel 6 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Google Pixel 6
  "Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Motorola Moto G Power (2022)
  "Mozilla/5.0 (Linux; Android 12; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Motorola Moto G Stylus (2022)
  "Mozilla/5.0 (Linux; Android 12; moto g stylus (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //ZTE Axon 30 Ultra
  "Mozilla/5.0 (Linux; Android 13; A2022U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //ZTE Nubia Red Magic 7 Pro
  "Mozilla/5.0 (Linux; Android 13; NX709J) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36 Telegram-Android/11.2.2",

  //Samsung Galaxy Tab
  "Mozilla/5.0 (Linux; Android 12; SM-T970) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 11; SM-T860) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 10; SM-T510) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 9; SM-T720) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Safari/537.36 Telegram-Android/11.2.2",
  "Mozilla/5.0 (Linux; Android 8.1.0; SM-T580) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Safari/537.36 Telegram-Android/11.2.2",
];

module.exports = user_agents;
