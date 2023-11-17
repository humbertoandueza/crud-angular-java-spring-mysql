export interface Client {
    clientId: number,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    email: string
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  }