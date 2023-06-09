import React, { useState } from 'react';

import { initialComponentProps } from '@components/Transaction/handlers';
import { Transaction } from '@components/Transaction/Transaction';

export default (): JSX.Element => {
  const [componentProps] = useState(initialComponentProps);
  console.log(componentProps);
  return <Transaction {...componentProps} />;
};
