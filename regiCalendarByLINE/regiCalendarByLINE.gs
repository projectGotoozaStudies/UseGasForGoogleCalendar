var ACCESS_TOKEN = 'XXX';

function doPost(e) {
  var event = JSON.parse(e.postData.contents).events[0];

  // 応答トークン
  var replyToken = event.replyToken;

  // ユーザーからのメッセージ
  var userMessage = event.message.text;

  // メッセージ以外(スタンプや画像など)が送られてきた場合
  if (userMessage === undefined) {
    //カレンダー追加関数の変数呼び出し
    let remessage = addCalendar();

    //カレンダー追加関数実行
    addCalendar();
    userMessage = remessage;
  }

  sendMessage(replyToken, userMessage);
}

function sendMessage(replyToken, userMessage){
  // 応答メッセージ用のAPI URL
  var url = 'https://api.line.me/v2/bot/message/reply';
  
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
