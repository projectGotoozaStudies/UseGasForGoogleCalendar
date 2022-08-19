//参考：https://zenn.dev/namioto/articles/8e900d563bba06

function myFunction() {
  // 予定を登録するgmailアカウントのアドレスを定数idに代入
  const id = "********@gmail.com"; // <-　予定を登録するGmailアカウントのアドレス

  try {
    // 上で定義したidからカレンダーを取得
    let calendar = CalendarApp.getCalendarById(id);

    // カレンダーに登録する予定のタイトル
    let title = "予定のタイトル";
    // 予定の始まりの日時
    let startTime = new Date();
    // 予定の終わりの日時
    let endTime = new Date();
    // ここでは予定の終わりの日時を始まりの日時 + 1時間に設定しています。
    new Date(endTime.setHours(endTime.getHours() + 1));

    let descriptions = 'The Moon\n080-XXXX-XXXX';
    
    var events = calendar.getEvents(startTime, endTime);
    console.log(events.length);

    if(events.length == 0){
      // 上で定義した、タイトル、始まりと終わりの日時を使用して予定を登録
      //予定登録時に説明を記載することを追加
      calendar.createEvent(title, startTime, endTime, {description: descriptions});
      console.log('予約登録したよ～');
    }

    else{
      console.log('もうすでに予約入ってるよ～');
    }

  } catch (e) {
    console.log(`カレンダーIDが正しくありません : ${e}`);
  }
}
