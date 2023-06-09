import * as React from 'react';
// import { useState } from 'react';
// import axios from 'axios';
import { DynamicForm } from '@components/FormRenderer/DynamicForm';

import style from './Transaction.scss';

interface ITransactionProps {
  foo: string;
  bar: string;
}

// const [populatedData, setPopulatedData] = useState({});

export const Transaction = (props: ITransactionProps): JSX.Element => (
  <>
    <div className={style.sample}>
      Hello from {props.foo} and {props.bar}!
    </div>
    <DynamicForm name="transaction"></DynamicForm>
  </>
);
