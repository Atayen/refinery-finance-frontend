import React from 'react';
import { Switch, Route } from 'react-router-dom';
import moment from 'moment';
import { useLazyQuery, gql } from '@apollo/client';
import { observer } from 'mobx-react-lite';

import { Exchange, ExchangeSettings, RecentTxs } from '..';
import { ISettings, IRecentTx } from '../../../../types';
import TradeWrapper from '../../../../HOC/TradeWrapper';
import { useMst } from '../../../../store';

const GET_USER_TRX = gql`
  query Swap($address: String!) {
    swaps(where: { from: $address }, orderBy: timestamp, orderDirection: desc) {
      transaction {
        id
      }
      pair {
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
      amount0In
      amount0Out
      amount1In
      amount1Out
    }
  }
`;

const Swap: React.FC = observer(() => {
  const { user } = useMst();

  const [getUserTrx, { error, data: userTrx }] = useLazyQuery(GET_USER_TRX, {
    pollInterval: 60000,
  });

  const [trx, setTrx] = React.useState<IRecentTx[] | undefined>(undefined);

  const [settings, setSettings] = React.useState<ISettings>({
    slippage: {
      type: 'btn',
      value: 0.1,
    },
    txDeadline: 20,
    txDeadlineUtc: moment.utc().add(20, 'm').valueOf(),
  });

  const handleSaveSettings = (settingsObj: ISettings): void => {
    setSettings(settingsObj);
  };

  const ExchangeComp = TradeWrapper(Exchange, 'getAmountOut', settings);

  React.useEffect(() => {
    if (user.address) {
      getUserTrx({
        variables: {
          address: user.address,
        },
      });
    }
  }, [user.address, getUserTrx]);

  React.useEffect(() => {
    if (!error && userTrx && userTrx.swaps) {
      const trxData: IRecentTx[] = [];

      userTrx.swaps.forEach((swapObj: any) => {
        const dataItem: IRecentTx = {
          type: 'Swap',
          address: swapObj.transaction.id,
          from: {
            symbol: '',
            value: 0,
          },
          to: {
            symbol: '',
            value: 0,
          },
        };

        if (+swapObj.amount1In && +swapObj.amount0Out) {
          dataItem.from = {
            symbol: swapObj.pair.token1.symbol,
            value: swapObj.amount1In,
          };
          dataItem.to = {
            symbol: swapObj.pair.token0.symbol,
            value: swapObj.amount0Out,
          };
        } else if (+swapObj.amount0In && +swapObj.amount1Out) {
          dataItem.from = {
            symbol: swapObj.pair.token0.symbol,
            value: swapObj.amount0In,
          };
          dataItem.to = {
            symbol: swapObj.pair.token1.symbol,
            value: swapObj.amount1Out,
          };
        }
        trxData.push(dataItem);
      });
      setTrx(trxData);
    }
  }, [userTrx, error]);

  return (
    <Switch>
      <Route exact path="/trade/swap" render={() => <ExchangeComp />} />
      <Route
        exact
        path="/trade/swap/settings"
        render={() => <ExchangeSettings savedSettings={settings} handleSave={handleSaveSettings} />}
      />
      <Route exact path="/trade/swap/history" render={() => <RecentTxs items={trx} />} />
    </Switch>
  );
});

export default Swap;
