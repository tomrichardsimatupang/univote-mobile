import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent  implements OnInit {

  @Input() title = "";
  @Input() message = "";
  @Input() buttonText = "";
  @Output() refresh = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onRefresh() {
    this.refresh.emit();
  }

}
