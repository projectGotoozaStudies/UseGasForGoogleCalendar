var ACCESS_TOKEN = 'XXX';

// 応答メッセージ用のAPI URL
var url = 'https://api.line.me/v2/bot/message/reply';
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

  if (userMessage === '予約') {
    userMessage = "予約日を選択してください\n選択した時間から２時間が予約時間となります";
    sendMessage(replyToken, userMessage);
  }

  else if (userMessage === 'アクセス'){
    userMessage  = "https://goo.gl/maps/1rnJMrj9BZ8zkcPD8";
    sendMessage(replyToken, userMessage);
  }

  else if (userMessage === 'ホームページ'){
    userMessage  = "https://www.bar-riberty.com/";
    sendMessage(replyToken, userMessage);
  }

  else{
    sendMessage(replyToken, userMessage);
  }
tentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function sendMessage(replyToken, userMessage){  
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
