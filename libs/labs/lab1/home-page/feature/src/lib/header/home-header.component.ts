import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {Tab, TABS} from '@is/labs/lab1/shared/root/types';
import {Store} from '@ngrx/store';
import {TuiTabs} from '@taiga-ui/kit';

@Component({
  standalone: true,
  selector: 'lab1-home-header',
  imports: [CommonModule, TuiTabs],
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderComponent {
  private readonly store = inject(Store);

  public readonly tabs = TABS;

  public onClick(tab: Tab): void {
    this.store.dispatch(lab1RootActions.setActiveTab({activeTab: tab}));
  }
}
