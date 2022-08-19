//参考：https://zenn.dev/miito/articles/f4fc29f92a45aa#%E3%82%BB%E3%83%AB%E3%83%95%E3%83%9A%E3%83%BC%E3%82%B9%E3%83%8F%E3%83%B3%E3%82%BA%E3%82%AA%E3%83%B3%E8%B3%87%E6%96%99
var ACCESS_TOKEN = 'XXX';

function doPost(e) {
  var event = JSON.parse(e.postData.contents).events[0];
  // 応答トークン
  var replyToken = event.replyToken;
  // ユーザーからのメッセージ
  var userMessage = event.message.text;
  // 応答メッセージ用のAPI URL
  var url = 'https://api.line.me/v2/bot/message/reply';

  if (userMessage === undefined) {
    // メッセージ以外(スタンプや画像など)が送られてきた場合
    userMessage = '？？？';
  }

  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': userMessage,
      }]
    })
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

