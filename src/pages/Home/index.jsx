import React from 'react';

import { SelectCountry } from '../../components/SelectCountry';
import { SelectLeague } from '../../components/SelectLeague';

export function Home() {

  return (
    <>
      <SelectCountry />
      <SelectLeague />
    </>
  );
}
