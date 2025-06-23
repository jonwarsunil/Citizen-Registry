import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import profile from '../assets/images/nft.jpg';
import { DownArrow } from './Icon';

const WalletConnect = () => {
  return (
    <div className='text-sm'>
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {!connected ? (
                <button
                  onClick={openConnectModal}
                  className='px-4 py-3 rounded-[12px] font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#B3DAF5] bg-[#B3DAF5] text-[#121417] hover:bg-[#9bd0f5] cursor-pointer text-sm'
                >
                  Connect Wallet
                </button>
              ) : chain.unsupported ? (
                <button
                  onClick={() => alert('Please switch to a supported network.')}
                  className='px-4 py-3 rounded-[12px] font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-300 bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer text-sm'
                >
                  Wrong Network
                </button>
              ) : (
                <button
                  onClick={openAccountModal}
                  className='flex items-center gap-3 px-4 py-3 rounded-[12px] font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#B3DAF5] bg-[#B3DAF5] text-[#121417] hover:bg-[#9bd0f5] cursor-pointer text-sm'
                >
                  <div className='w-6 h-6 rounded-full overflow-hidden bg-white'>
                    <img src={profile} alt='nft-avatar' className='w-full h-full object-cover' />
                  </div>
                  <span className='font-mono text-sm hidden sm:inline'>...{account.address.slice(-6)}</span>
                  <span className='w-[14px] h-[14px]'>
                    <DownArrow />
                  </span>
                </button>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default WalletConnect;
