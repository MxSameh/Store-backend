import { OrdersTable } from '../models/order'

const ordersTable = new OrdersTable();

describe('Orders table: ',() => {

  it('index method is defined', () => {
    expect(ordersTable.index).toBeDefined();
  })

  it('show method is defined', () => {
    expect(ordersTable.show).toBeDefined();
  })

  it('index method should return an empty string', async () => {
    const result = await ordersTable.index();
    expect(result).toEqual([]);
  })

})