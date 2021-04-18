import { Component, OnInit, Input } from '@angular/core';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-sppinerloading',
  templateUrl: './sppinerloading.component.html',
  styleUrls: ['./sppinerloading.component.scss']
})
export class SppinerloadingComponent implements OnInit {
  @Input() message:string = '';
  @Input() popup:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
