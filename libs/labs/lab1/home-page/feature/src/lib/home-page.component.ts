import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {HomeHeaderComponent} from './header/home-header.component';

@Component({
  standalone: true,
  selector: 'lab1-home-page',
  imports: [HomeHeaderComponent, RouterOutlet],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
