import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Exchange, ExchangeSettings, RecentTxs } from '..';
import { IActiveSlippage } from '../ExchangeSettings';

import BnbImg from '@/assets/img/currency/bnb.svg';

export interface IToken {
  img: string;
  name: string;
  symbol: string;
}

export interface ISettings {
  slippage: IActiveSlippage;
  txDeadline: number;
}

const Swap: React.FC = () => {
  const [settings, setSettings] = React.useState<ISettings>({
    slippage: {
      type: 'btn',
      value: 0.1,
    },
    txDeadline: NaN,
  });

  const [tokenFrom, setTokenFrom] = React.useState<IToken>({
    img: BnbImg,
    name: 'Binance',
    symbol: 'BNB',
  });
  const [tokenFromQuantity, setTokenFromQuantity] = React.useState<number>(NaN);

  const [tokenTo, setTokenTo] = React.useState<IToken>({
    img: BnbImg,
    name: 'Ethereum',
    symbol: 'ETH',
  });
  const [tokenToQuantity, setTokenToQuantity] = React.useState<number>(NaN);

  const handleSaveSettings = (settingsObj: ISettings): void => {
    setSettings(settingsObj);
  };

  const handleChangeTokenFrom = (token: IToken): void => {
    if (token) {
      if (token.symbol === tokenTo.symbol) {
        setTokenTo(tokenFrom);
        setTokenToQuantity(tokenFromQuantity);
        setTokenFromQuantity(tokenToQuantity);
      }
      setTokenFrom(token);
    }
  };

  const handleChangeTokenTo = (token: IToken): void => {
    if (token) {
      if (token.symbol === tokenFrom.symbol) {
        setTokenFrom(tokenTo);
        setTokenFromQuantity(tokenToQuantity);
        setTokenToQuantity(tokenFromQuantity);
      }
      setTokenTo(token);
    }
  };

  const handleChangeToken = (type: 'from' | 'to', token: IToken) => {
    if (type === 'from') {
      handleChangeTokenFrom(token);
    }
    if (type === 'to') {
      handleChangeTokenTo(token);
    }
  };

  const handleChangeTokensQuantity = (type: 'from' | 'to', quantity: number) => {
    if (type === 'from') {
      setTokenFromQuantity(quantity);
    }
    if (type === 'to') {
      setTokenToQuantity(quantity);
    }
  };

  return (
    <Switch>
      <Route
        exact
        path="/trade/swap"
        render={() => (
          <Exchange
            tokenFrom={tokenFrom}
            tokenFromQuantity={tokenFromQuantity}
            tokenTo={tokenTo}
            tokenToQuantity={tokenToQuantity}
            handleChangeTokensQuantity={handleChangeTokensQuantity}
            handleChangeToken={handleChangeToken}
          />
        )}
      />
      <Route
        exact
        path="/trade/swap/settings"
        render={() => <ExchangeSettings savedSettings={settings} handleSave={handleSaveSettings} />}
      />
      <Route exact path="/trade/swap/history" component={RecentTxs} />
    </Switch>
  );
};

export default Swap;
