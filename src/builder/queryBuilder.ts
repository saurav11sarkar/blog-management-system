import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, any>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, any>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchFiled: string[]) {
    const search = this.query?.search || '';
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchFiled.map((filed) => ({
          [filed]: { $regex: search, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sortBy', 'sortOrder', 'filter'];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (this.query.filter) {
      this.modelQuery = this.modelQuery.find({ authorId: this.query.filter });
    }

    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  sort() {
    if (this.query?.sortBy && this.query?.sortOrder) {
      const sortBy = this.query?.sortBy;
      const sortOrder = this.query?.sortOrder;
      const sort = sortOrder === 'desc' ? -1 : 1;
      this.modelQuery = this.modelQuery.sort({ [sortBy]: sort });
    }
    return this;
  }
  build() {
    return this.modelQuery;
  }
}

export default QueryBuilder;
