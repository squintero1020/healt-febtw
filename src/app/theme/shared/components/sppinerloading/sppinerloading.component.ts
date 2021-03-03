import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sppinerloading',
  templateUrl: './sppinerloading.component.html',
  styleUrls: ['./sppinerloading.component.scss']
})
export class SppinerloadingComponent implements OnInit {
  @Input() message:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
