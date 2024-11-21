import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  onSubmit(data: any) {
    // can create any logic here
    alert("Form Submitted Successfully; Check Console for Data");
    console.log(data);
  }
}
