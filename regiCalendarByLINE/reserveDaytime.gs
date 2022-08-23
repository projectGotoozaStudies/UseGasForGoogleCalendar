function reserveDaytime(replyToken, userMessage){  
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      "messages": [{
        "type": "text",
        "text": userMessage,
        'quickReply': {
        'items': [{
          'type': 'action',
            'action': {
              'type': 'message',
              'label': '19:00',
              "text": '19:00',
            }
          },
          {
            'type': 'action',
            'action': {
              'type': 'message',
              'label': '19:30',
              "text": '19:30',
            }
          },
          {
            'type': 'action',
            'action': {
              'type': 'message',
              'label': '20:00',
              "text": '20:00',
            }
          },
          {
            'type': 'action',
            'action': {
              'type': 'message',
              'label': '20:30',
              "text": '20:30',
            }
          },
          {
            'type': 'action',
            'action': {
              'type': 'message',
              'label': '21:00',
              "text": '21:00',
            }
          },
          {
            'type': 'action',
            'action': {
              'type': 'message',
              'label': '21:30',
              "text": '21:30',
            }
          }
        ]}
      }]
    })
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function reserveDaytimeSendMessage(replyToken, userMessage){  
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      "messages": [{
        "type": "text",
        "text": userMessage,
        'quickReply': {
        'items': [{
          'type': 'action',
            'action': {
              'type': 'message',
              'label': 'はい',
              "text": '> はい',
            }
          },
          {
            'type': 'action',
            'action': {
              'type': 'message',
              'label': 'いいえ',
              "text": '> いいえ',
            }
          }
        ]}
      }]
    })
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
