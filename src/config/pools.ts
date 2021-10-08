import { tokens } from '@/config/tokens';
import { PoolConfig } from '@/types';

import { contracts } from './contracts';

export const pools: PoolConfig[] = [
  {
    id: 0,
    stakingToken: tokens.rp1,
    earningToken: tokens.rp1,
    contractAddress: {
      42: contracts.MASTER_REFINER.ADDRESS,
    },
    tokenPerBlock: '1',
  },
  {
    id: 1,
    stakingToken: tokens.rp1,
    earningToken: tokens.ugbg,
    contractAddress: {
      42: '0xE61c4EbCec826A0Cc2dA45D1e4EAB60b2bfd523f',
    },
    tokenPerBlock: '1.7361',
    // isFinished: true,
  },
];
