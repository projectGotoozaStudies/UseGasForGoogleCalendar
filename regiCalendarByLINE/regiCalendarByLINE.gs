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
    addCalendar();
    userMessage = 'とうろく～';
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

function addCalendar() {
  // 予定を登録するgmailアカウントのアドレスを定数idに代入
  const id = "XXX@gmail.com"; // <-　予定を登録するGmailアカウントのアドレス

  try {
    // 上で定義したidからカレンダーを取得
    let calendar = CalendarApp.getCalendarById(id);

    // カレンダーに登録する予定のタイトル
    let title = "予約　goto";
    // 予定の始まりの日時
    let startTime = new Date('YYYY/MM/DD hh:mm:ss');
    // 予定の終わりの日時
    let endTime = new Date('YYYY/MM/DD hh:mm:ss');
    
    var events = calendar.getEvents(startTime, endTime);
    console.log(events.length);

    if(events.length == 0){
      // 上で定義した、タイトル、始まりと終わりの日時を使用して予定を登録
      calendar.createEvent(title, startTime, endTime);
      console.log('予約登録したよ～');
    }

    else{
      console.log('もうすでに予約入ってるよ～');
    }


  } catch (e) {
    console.log(`カレンダーIDが正しくありません : ${e}`);
  }
}

