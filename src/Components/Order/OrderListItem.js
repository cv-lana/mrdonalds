import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import trashImage from '../../image/trash.svg';
import { totalPriceItems, formatCurrency } from '../Functions/secondaryFunction';
import { Context } from '../Functions/context';

const OrderItemsStyled = styled.li`
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;
  cursor: pointer;
`;

const ItemName = styled.span`
  flex-grow: 1;
`;

const ItemPrice = styled.span`
  margin-left: 20px;
  margin-right: 10px;
  min-width: 65px;
  text-align: right;
`;

const TrashButton = styled.button`
  width: 24px;
  height: 24px;
  border-color: transparent;
  background-color: transparent;
  background-image: url(${trashImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Toppings = styled.div`
  width: 100%;
  font-size: 14px;
  color: #9a9a9a;
`;

export const OrderListItem = ({ order, index, deleteItem }) => {
  const { openItem: { setOpenItem } } = useContext(Context);
  const topping = order.topping.filter(item => item.checked)
    .map(item => item.name)
    .join(', ');

  const refDeleteButton = useRef(null);

  return (
    <OrderItemsStyled onClick={(e) => e.target !== refDeleteButton.current && setOpenItem({ ...order, index })}>
      <ItemName>{order.name} {order.choice}</ItemName>
      <span>{order.count}</span>
      <ItemPrice>{formatCurrency(totalPriceItems(order))}</ItemPrice>
      <TrashButton ref={refDeleteButton} onClick={() => deleteItem(index)} />
      {topping && <Toppings>Допы: {topping}</Toppings>}
    </OrderItemsStyled>
  )
};