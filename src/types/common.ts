export type PhoneNumber = {
  code: string;
  number: string;
};

export type PaginatedData<T> = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  data: T[];
};

export type QueryParams = {
  page: number;
  limit: number;
  search?: string;
};

type Column<T> = {
  key: string;
  name: string;
  render?: (item: T) => React.ReactNode;
};

export type Columns<T> = Column<T>[];
