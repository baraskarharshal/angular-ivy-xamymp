import { Component, OnInit,  VERSION } from '@angular/core';
import { contries } from './contries.config';
import { PaginationParams, PaginationService } from './pagination/pagination.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  
  records = [];
  totalRecordCount = 0;

  constructor(private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.loadData(1, 25);
  }

  loadData(pageNo: number, pageSize: number) {
    const params: PaginationParams = {
      pageNo: pageNo,
      pageSize: pageSize,
      totalRecords: contries
    }

    const results = this.paginationService.getCurrentPageRecords(params);
    this.records = results.data;
    this.totalRecordCount = results.count;
  }

  onChangePagination(event: any) {
    this.loadData(event.pageNo, event.pageSize);
  }
}
