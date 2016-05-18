import {Page} from 'ionic-angular';

import {NgZone} from 'angular2/core';

declare var horizon;

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  chatText: string
  chats: any[]

  constructor(private _ngZone: NgZone) {

    this.loadData();
  }

  loadData() {
    // Create a "messages" collection
    const chat = horizon("messages");

    // Query chats with `.order`, which by default is in ascending order
    chat.order("datetime", 'descending').limit(100).watch().subscribe(
      // Returns the entire array
      (newChats) => {

        // Here we replace the old value of `chats` with the new
        //  array. Frameworks such as React will re-render based
        //  on the new values inserted into the array.

        this._ngZone.run(() => {
          this.chats = newChats;
        });

        console.log('Loaded chats', newChats);
      },

      (err) => {
        console.log(err);
      })
  }

  post() {
    console.log('Posting', this.chatText);

    const chat = horizon("messages");

    chat.store({
      datetime: new Date(),
      text: this.chatText
    })

    this.chatText = '';
  }
}
