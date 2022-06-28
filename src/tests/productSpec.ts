import { Product , ProductsTable } from '../models/product';

 
const productsTable = new ProductsTable();

describe('Products table: ', () => {
  it('has an index function', () => {
    expect(productsTable.index).toBeDefined();
  });

  it('has an show function', () => {
    expect(productsTable.show).toBeDefined();
  });

  it('has an create function', () => {
    expect(productsTable.create).toBeDefined();
  });

  it('index should return an array', async() => {
    const result = await productsTable.index();
    expect(result).toEqual([]);
  })

  it('create method should add a product', async() => {
    const product : Product = {
      name: 'pepsi',
      price: 20,
      category:'drink'
    }
    const result = await productsTable.create(product);

    expect(result.id).toEqual(1);
    expect(result.name).toEqual('pepsi');
    expect(result.price).toEqual(20);
    expect(result.category).toEqual('drink');

  })

  it('index method returns a list of users', async() => {
    const result = await productsTable.index();

    expect(result.length).toEqual(1) 
  })

  it('show method returns a specific user', async() => {
    const result = await productsTable.show("1") as Product;

    expect(result.id).toEqual(1);
    expect(result.name).toEqual('pepsi');
    expect(result.price).toEqual(20);
    expect(result.category).toEqual('drink');
  })

})