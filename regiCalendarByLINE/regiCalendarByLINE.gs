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
    reserveDaytime(replyToken, userMessage);
  }

  else if (/^(19|2[0-1]):(00|30)$/.test(userMessage) === true){ //正規表現で時間指定したい 要修正
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var date = today.getDate();
    dateT = ["日","月","火","水","木","金","土"];
    var day = dateT[today.getDay()];

    var newToday = year + "年" + month + "月" + date + "日" + "(" + day + ")" + " " + userMessage; //今の年月日と選択した時間を合成
    var pTime = Number(userMessage.slice(0, 2)) + 2; //入力した時間の時間部分を抽出
    var min = userMessage.slice(-2); //入力した時間の分部分を抽出

    userMessage = newToday + " ～ " + pTime + ":" + min + " で予約時間を設定します\nよろしければ 「はい」 を選択してください";
    reserveDaytimeSendMessage(replyToken, userMessage);
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
    userMessage = "入力の値が不正です";
    sendMessage(replyToken, userMessage);
  }

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
