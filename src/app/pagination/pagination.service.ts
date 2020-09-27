/**
 * This is s mock pagination service which returns paginated data.
 */

import { Injectable } from '@angular/core';

export interface PaginationParams {
    pageNo: number;
    pageSize: number;
    totalRecords: any[];
    filter?: any;
  }

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  getCurrentPageRecords(params: PaginationParams) {
    let records = JSON.parse(JSON.stringify(params.totalRecords));

    if (params.filter && params.filter.sortByField) {
      records = this.getSortedRecords(params.filter.sortByField, records);
    }

    if (params.filter && params.filter.searchFields) {
      records = this.getFilteredRecords(params.filter, records);
    }

    const availableRecordCount = records.length;
    records = this.getRecords(records, params.pageNo, params.pageSize);

    return { count: availableRecordCount, data: records };

  }

  // need to add sorting for dates and numbers
  private getSortedRecords(sort: any, totalRecords: any[]) {
    totalRecords.sort((a, b) => {
      if (!sort.descending) {
        // asc sort
        return a[sort.fieldName].toString().localeCompare(b[sort.fieldName]);
      } else {
        // desc sort
        return b[sort.fieldName].toString().localeCompare(a[sort.fieldName]);
      }
    });
    return totalRecords;
  }

  // filtering is not tested yet
  // need to add filtering for dropdowns
  private getFilteredRecords(filter: any, totalRecords: any[]) {
    return totalRecords.filter(record => {
      if (this.hasMatch(totalRecords[filter.colName], filter.value)) {
        return true;
      }
    });
  }

  private hasMatch(source: string, value: any) {

    if (!source) {
      return;
    }

    const sourceValue = source.toString().toLocaleLowerCase();
    return sourceValue.includes(value.toString().toLocaleLowerCase());
  }

  private getRecords(records: any[], pageNo: number, pageSize: number) {
    const startIndex = (pageNo - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, records.length);
    return records.slice(startIndex, endIndex + 1);
  }

}
