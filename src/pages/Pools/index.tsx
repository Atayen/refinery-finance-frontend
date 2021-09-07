import React, { useState } from 'react';
import cn from 'classnames';

import { ReactComponent as CardViewIcon } from '@/assets/img/icons/card-view.svg';
import { ReactComponent as ListViewIcon } from '@/assets/img/icons/list-view.svg';
import { Button } from '@/components/atoms';
import { ItemsController, StakeUnstakeModal } from '@/components/organisms';
import { PoolCard, PoolsPreview, PoolTable } from '@/components/sections/Pools';
import { IPoolCard } from '@/components/sections/Pools/PoolCard';

import './Pools.scss';

const Pools: React.FC = () => {
  const pools: IPoolCard[] = [
    {
      tokenEarn: {
        name: 'WBNB Token',
        symbol: 'WBNB',
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        chainId: 56,
        decimals: 18,
        logoURI:
          'https://tokens.pancakeswap.finance/images/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png',
      },
      tokenStake: {
        name: 'PancakeSwap Token',
        symbol: 'CAKE',
        address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        chainId: 56,
        decimals: 18,
        logoURI:
          'https://tokens.pancakeswap.finance/images/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png',
      },
      type: 'earn',
      apr: {
        value: 143.3323,
        items: [
          {
            timeframe: '1D',
            roi: 0.19,
            rf: 0.12,
          },
          {
            timeframe: '7D',
            roi: 1.43,
            rf: 0.88,
          },
        ],
      },
    },
    {
      tokenStake: {
        name: 'Cake',
        symbol: 'CAKE',
        address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        chainId: 56,
        decimals: 18,
        logoURI:
          'https://tokens.pancakeswap.finance/images/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png',
      },
      type: 'auto',
      apr: {
        value: 90.6,
        items: [
          {
            timeframe: '1D',
            roi: 0.19,
            rf: 0.12,
          },
          {
            timeframe: '7D',
            roi: 1.43,
            rf: 0.88,
          },
        ],
      },
    },
  ];

  const [isListView, setIsListView] = useState(false);

  const prefixContainer = [
    {
      key: 'list-view-mode',
      icon: ListViewIcon,
      handler: () => setIsListView(true),
      activeClassCondition: isListView,
      title: 'List View',
    },
    {
      key: 'card-view-mode',
      icon: CardViewIcon,
      handler: () => setIsListView(false),
      activeClassCondition: !isListView,
      title: 'Card View',
    },
  ];
  return (
    <>
      <main className="pools">
        <div className="row">
          <PoolsPreview />
          <ItemsController
            prefixContainer={
              <>
                <div className="pools__i-contr-prefix box-f-ai-c">
                  {prefixContainer.map((item) => {
                    const { key, handler, activeClassCondition, title } = item;
                    return (
                      <Button
                        key={key}
                        className="pools__i-contr-button"
                        title={title}
                        colorScheme="white"
                        size="ssm"
                        onClick={handler}
                      >
                        <item.icon
                          className={cn('pools__i-contr-icon', {
                            'pools__i-contr-icon_active': activeClassCondition,
                          })}
                        />
                      </Button>
                    );
                  })}
                </div>
              </>
            }
            radioGroupOptions={[
              {
                text: 'Live',
                value: 'live',
              },
              {
                text: 'Finished',
                value: 'finished',
              },
            ]}
            radioGroupClassName="pools__i-contr"
          />
          <div className="pools__content">
            <div className={`pools__content-${isListView ? 'list' : 'card'}-view`}>
              {isListView ? (
                <PoolTable data={pools} />
              ) : (
                pools.map((pool) => {
                  return (
                    <PoolCard
                      {...pool}
                      key={`${pool.tokenEarn?.address}${pool.tokenStake.address}`}
                      type={pool.type}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
      <StakeUnstakeModal />
    </>
  );
};

export default Pools;
