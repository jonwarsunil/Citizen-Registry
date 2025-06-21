import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const WalletConnect = ({ compact }) => {
  const { address } = useAccount();

  return (
    <div className='text-sm'>
      <ConnectButton showBalance={!compact} accountStatus={compact ? 'avatar' : 'address'} />
    </div>
  );
};

export default WalletConnect;
