import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {TABS} from '@is/labs/lab1/shared/root/types';
import {Store} from '@ngrx/store';

import {HomeHeaderComponent} from './header/home-header.component';

@Component({
  standalone: true,
  selector: 'lab1-home-page',
  imports: [HomeHeaderComponent, RouterOutlet],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private readonly store = inject(Store);

  public ngOnInit() {
    this.store.dispatch(lab1RootActions.setActiveTab({activeTab: TABS[0]}));
  }
}
