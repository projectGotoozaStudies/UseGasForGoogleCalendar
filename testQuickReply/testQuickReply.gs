//参考：https://www.pre-practice.net/2018/08/line-bot.html

var CHANNEL_ACCESS_TOKEN = "XXX";

function doPost(e) {
    var contents = e.postData.contents;
    var obj = JSON.parse(contents)
    var events = obj["events"];
    for (var i = 0; i < events.length; i++) {
        if (events[i].type == "message") {
            reply_message(events[i]);
        }
    }
}

function reply_message(e) {
    if (e.message.type == "text") {
        if (e.message.text == "hello") {
            var postData = {
                "replyToken": e.replyToken,
                "messages": [{
                        "type": "text",
                        "text": "Select a button below",
                        "quickReply": {
                            "items": [{
                                    "type": "action",
                                    "action": {
                                        "type": "message",
                                        "label": "world",
                                        "text": "World"
                                    }
                                },
                                {
                                    "type": "action",
                                    "action": {
                                        "type": "location",
                                        "label": "Send location"
                                    }
                                },
                                {
                                    "type": "action",
                                    "action": {
                                        "type": "camera",
                                        "label": "camera"
                                    }
                                },
                                {
                                    "type": "action",
                                    "action": {
                                        "type": "cameraRoll",
                                        "label": "Camera roll"
                                    }
                                }
                            ]
                        }
                    }

                ]
            };
        }
    }
    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
        },
        "payload": JSON.stringify(postData)
    };
    UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", options);
}
