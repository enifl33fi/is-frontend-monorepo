import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {selectActiveTab} from '@is/labs/lab1/shared/root/store';
import {Tab, TABS} from '@is/labs/lab1/shared/root/types';
import {lab1RouterActions} from '@is/labs/lab1/shared/router/store';
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
  public readonly activeTab = this.store.selectSignal(selectActiveTab);

  public readonly activeTabIndex = computed(() => {
    const activeTab = this.activeTab();

    return this.tabs.indexOf(activeTab);
  });

  public onClick(tab: Tab): void {
    this.store.dispatch(lab1RouterActions.navigateToTab({tab}));
  }
}
