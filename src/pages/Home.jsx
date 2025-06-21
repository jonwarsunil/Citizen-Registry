import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPublicClient, http, parseAbiItem } from 'viem';
import { sepolia } from 'viem/chains';
import Button from '../components/Button';
import { CITIZEN_CONTRACT_ADDRESS } from '../contract/CitizenABI';

const infuraKey = import.meta.env.VITE_INFURA_KEY;

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(`https://sepolia.infura.io/v3/${infuraKey}`),
});

const citizenEventABI = parseAbiItem(
  'event Citizen(uint256 indexed id, uint256 indexed age, string indexed city, string name)'
);

const Home = () => {
  const [citizenCount, setCitizenCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch logs and count them
  useEffect(() => {
    const fetchCitizenCount = async () => {
      try {
        const logs = await publicClient.getLogs({
          address: CITIZEN_CONTRACT_ADDRESS,
          event: citizenEventABI,
          fromBlock: 0n,
          toBlock: 'latest',
        });

        setCitizenCount(logs.length);
      } catch (err) {
        console.error('Error fetching citizen logs:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCitizenCount();
  }, []);

  return (
    <div className='container'>
      <div className='flex justify-center py-12 px-5'>
        <div className='flex flex-col w-full'>
          <h2 className='text-[#111518] text-[28px] font-bold leading-tight text-left pb-3'>
            Welcome to the Citizen Registry
          </h2>
          <p className='text-[#111518] text-base font-normal leading-normal pb-3 pt-1'>
            Manage citizen information efficiently and effectively.
          </p>

          <div className='flex flex-wrap gap-4 py-4'>
            <div className='flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f2f4]'>
              <p className='text-[#111518] text-base font-medium leading-normal'>Total Citizens</p>
              <div className='text-[#111518] text-2xl font-bold leading-tight'>
                {loading ? (
                  <div className='h-6 w-20 bg-gray-300 rounded animate-pulse'></div>
                ) : error ? (
                  'Error'
                ) : (
                  citizenCount
                )}
              </div>
            </div>
          </div>

          <div className='flex w-full grow bg-white'>
            <div className='w-full gap-1 overflow-hidden bg-white flex'>
              <div className="rounded-xl w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#121416] min-h-[218px] @[480px]:rounded-xl bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtaonI8k8Z0y7Nrn5rm3hjyscuTPKCRY5t4g4jfUkBC0Ma-2zo_-tNMaai1lnBoQv3sMMNxPB9WS9uli6sBz9L_0OFQ2jWB0DJaDPo8oIeD8faNB53wc0IALn_Ks5eKwa_HwdQIZZ7vsFQhknYP18-HGQeBWTaukI98n9f3-Qu9IgGFeAdsN2V-qpUjPakrkhxAd2sZbHX57vRDwlm8d78B_c79GIrbKLbZynUVhH24WO1gOkyB2TI9XAG9noqnOMD5jWbj80nK9uv')]" />
            </div>
          </div>

          <div className='flex justify-start py-3 flex-wrap gap-3'>
            <Link to='/citizens'>
              <Button className='text-sm'>View Citizens</Button>
            </Link>
            <Link to='/create'>
              <Button className='text-sm'>Add Citizen</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
