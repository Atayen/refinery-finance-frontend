import React from 'react';

import { TradeBox, ChooseTokens } from '..';
import { IToken } from '../ChooseTokens';

import './ImportPool.scss';

import BnbImg from '@/assets/img/currency/bnb.svg';

export interface ITokens {
  from: {
    token: IToken | undefined;
    amount: number;
  };
  to: {
    token: IToken | undefined;
    amount: number;
  };
}

const ImportPool: React.FC = () => {
  const [tokensData, setTokensData] = React.useState<ITokens>({
    from: {
      token: {
        img: BnbImg,
        name: 'Binance',
        symbol: 'BNB',
      },
      amount: NaN,
    },
    to: {
      token: undefined,
      amount: NaN,
    },
  });
  console.log(tokensData);

  const handleSetTokens = (tokens: ITokens) => {
    setTokensData(tokens);
  };

  return (
    <TradeBox
      className="import-pool"
      title="Import Pool"
      subtitle="Import an existing pool"
      settingsLink="/trade/liquidity/settings"
      recentTxLink="/trade/liquidity/history"
    >
      <ChooseTokens handleChangeTokens={handleSetTokens} initialTokenData={tokensData} />
    </TradeBox>
  );
};

export default ImportPool;
