import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@is/labs/lab1/shared/header/feature';

@Component({
  standalone: true,
  selector: 'lab1-shell',
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
