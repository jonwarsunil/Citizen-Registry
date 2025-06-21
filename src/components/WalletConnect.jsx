import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnect = ({ compact }) => {
  return (
    <div className='text-sm'>
      <ConnectButton showBalance={!compact} accountStatus={compact ? 'avatar' : 'address'} />
    </div>
  );
};

export default WalletConnect;
