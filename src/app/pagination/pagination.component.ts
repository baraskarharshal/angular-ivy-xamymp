/**
 * This component can be used to navigate across given number of items.
 * can be used with grid, list of items, images etc.
 */

import { Component, EventEmitter,  OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalRecords: number;
  @Output() paginationState: EventEmitter<any> = new EventEmitter();

  pageSize = 25;
  pageNo = 1;
  pageIndex = 1;
  lastPageNo = 0;
  
  constructor() { }

  ngOnInit() {
    this.setLastPageNo(this.totalRecords);
  }

  emitCurrentPaginationState() {
    this.paginationState.emit({
      pageNo: this.pageNo,
      pageSize: this.pageSize
    });
  }
  
  getStartIndex() {
    return (this.pageNo - 1) * this.pageSize + 1;
  }

  getEndIndex() {
    return this.pageSize * this.pageNo >
      this.totalRecords ? this.totalRecords :
      this.pageSize * this.pageNo;
  }

  navigateToLastPage() {
    if (this.lastPageNo && this.getEndIndex() !== this.totalRecords) {
      this.pageNo = this.lastPageNo;
      this.pageIndex = this.pageNo;
      // this.loadDocuments();
      this.emitCurrentPaginationState();
    }
  }

  navigateToFirstPage() {
    if (this.pageNo !== 1) {
      this.pageNo = 1;
      this.pageIndex = this.pageNo;
      // this.loadDocuments();
      this.emitCurrentPaginationState();
    }
  }

  onPageNoEntered() {
    this.pageIndex = !this.pageIndex ? 1 : this.pageIndex > this.lastPageNo ? this.lastPageNo : this.pageIndex;
    if (this.pageIndex && this.lastPageNo && this.lastPageNo >= this.pageIndex &&
      this.pageIndex !== this.pageNo) {
      this.pageNo = this.pageIndex;
      // this.loadDocuments();
      this.emitCurrentPaginationState();
    }
  }


  onPageNoDecreased(pageNo: number) {
    if (pageNo > 0) {
      this.pageNo = pageNo;
      // this.loadDocuments();
      this.emitCurrentPaginationState();
      this.pageIndex = this.pageNo;
    }
  }

  onPageNoIncreased(pageNo: number) {
    if (((this.pageSize * (pageNo - 1)) + 1) <= this.totalRecords) {
      this.pageNo = pageNo;
      // this.loadDocuments();
      this.emitCurrentPaginationState();
      this.pageIndex = this.pageNo;
    }
  }

  onPageSizeChanged($event) {
    this.pageSize = Number($event.target.value);
    this.pageNo = 1;
    this.pageIndex = 1;
    this.emitCurrentPaginationState();
    // this.loadDocuments();
  }

  setLastPageNo(totalRecords: number) {
    for (let index = 1; index < totalRecords; index++) {
      if ((totalRecords / (index * this.pageSize)) < 1) {
        this.lastPageNo = index;
        break;
      }
    }
  }

}