import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CurrencyCharCode, extraSources, initialSources, ResponseView, Source} from '../domain/currency';
import {CurrencyService} from '../services/currency.service';
import {CurrentModalComponent} from './current-modal/current-modal.component';

@Component({
  selector: 'app-currency-main',
  templateUrl: './currency-main.component.html',
  styleUrls: ['./currency-main.component.css']
})
export class CurrencyMainComponent implements OnInit, OnDestroy {
  allSources: Source[];
  currentIndex: number;
  charCode = CurrencyCharCode.EUR;
  maxLength: number;
  minLength: number;
  sources: Source[];
  value: string;

  private intervalLength = 10000;
  private timeout: number;

  constructor(private service: CurrencyService, private dialog: MatDialog) {
    this.currentIndex = 0;
    this.maxLength = initialSources.length + extraSources.length;
    this.minLength = initialSources.length;
    this.allSources = [...initialSources, ...extraSources];
    this.sources = [...initialSources];
  }

  ngOnInit() {
    this.updateData();
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  onAdd() {
    if (this.sources.length < this.maxLength) {
      this.dialog.open(CurrentModalComponent, {
        data: this.allSources.filter(e => !this.sources.map(item => item.id).includes(e.id))
      }).afterClosed().subscribe(res => {
        if (res) {
          this.sources.push(...res);
        }
      });
    }
  }

  onDelete(i: number) {
    if (this.sources.length > this.minLength) {
      this.sources.splice(i, 1);
      if (this.currentIndex > i) {
        this.currentIndex--;
      }
      clearTimeout(this.timeout);
      this.updateData();
    }
  }

  private updateData() {
    const {view, url} = this.sources[this.currentIndex];
    if (view === ResponseView.XML) {
      this.service.getXmlCurrency(url).subscribe(data => {
        const result = data.find(e => e.CharCode === this.charCode);
        this.value = result ? `${result.Value}` : 'not found';
        this.timeout = setTimeout(this.updateData.bind(this), this.intervalLength);
      }, () => {
        clearTimeout(this.timeout);
        this.currentIndex = (++this.currentIndex % this.sources.length);
        this.updateData();
      });
    } else {
      this.service.getJsonCurrency(url).subscribe(data => {
        const result = data.find(e => e.CharCode === this.charCode);
        this.value = result ? `${result.Value}` : 'not found';
        this.timeout = setTimeout(this.updateData.bind(this), this.intervalLength);
      }, () => {
        clearTimeout(this.timeout);
        this.currentIndex = (++this.currentIndex % this.sources.length);
        this.updateData();
      });
    }
  }
}
