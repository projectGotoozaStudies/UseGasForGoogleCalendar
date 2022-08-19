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

    var userMessages = '';
    
    var events = calendar.getEvents(startTime, endTime);
    console.log(events.length);

    if(events.length == 0){
      // 上で定義した、タイトル、始まりと終わりの日時を使用して予定を登録
      calendar.createEvent(title, startTime, endTime);
      userMessages = '予約登録したよ～';
      return userMessages;
    }

    else{
      userMessages = 'もうすでに予約入ってるよ～';
      return userMessages;
    }


  } catch (e) {
    console.log(`カレンダーIDが正しくありません : ${e}`);
  }
}
