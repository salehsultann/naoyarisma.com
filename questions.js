const config = {
    // tuana v
    "competition-name": "Nesibe Aydın Okulları\nZeka ve Akıl Oyunları Yarışması",
    "question-duration": 500,
    "break-duration": 60,
    "registration-start": "15 Sep 2022 00:00",
    "registration-end": "31 Oct 2022 23:59",
    "start-time": "05 Nov 2022 11:00",
    "page-title": "Zeka ve Akıl Oyunları Yarışması",
    // tuana ^^^
    "page-icon": "https://naoyarisma.com/img/ico.png",
    "send-url": "https://naoyarisma.com/send.php",
    "broken-image": "/19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7.png",
    "suffixDict": ["de", "de", "te", "te", "te", "da", "de", "de", "da"],
    "tensSuffixDict": ["da", "da", "de", "da", "ta", "de"],
    "registration-open-text": '"Kayıtlar, " + now.toLocaleString("tr-TR", {weekday: "long", month:"long", day: "numeric"}) + " günü açılacaktır."',
    "registration-text": '"Kayıt Formu (Son Tarih " + now.toLocaleString("tr-TR", {weekday: "long", month:"long", day: "numeric"}) + ")"',
    "registered-text": '"Kaydınız başarıyla alınmıştır. "',
    "registration-closed-text": '"Kayıtlar kapanmıştır. "',
    "start-text": '"Sınav, " + now.toLocaleString("tr-TR", {weekday: "long", month:"long", day: "numeric", hour: "numeric", minute:"numeric"}) + "\'" + (now.getMinutes() % 10 != 0 ? config.suffixDict[now.getMinutes()%10-1] : config.tensSuffixDict[Math.floor(now.getMinutes()/10)] )+ " başlayacaktır."',
    "break-text": 'config["break-duration"] >= 60 ? config["break-duration"] % 60 + " dakika ara" : config["break-duration"] + " saniye ara"',
    "end-text": 'Sınav bitmiştir.',
    "debug": false,

};