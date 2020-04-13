export class PaginatedList<T> {
    totalCount: number;
    next: string;
    last: string;
    list: Array<T>;
}