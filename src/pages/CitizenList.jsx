import React, { useEffect, useState, useMemo } from 'react';
import { createPublicClient, http, parseAbiItem, getContract } from 'viem';
import { sepolia } from 'viem/chains';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { CITIZEN_CONTRACT_ABI, CITIZEN_CONTRACT_ADDRESS } from '../contract/CitizenABI';

const ITEMS_PER_PAGE = 10;

export default function CitizenList() {
  const infuraKey = import.meta.env.VITE_INFURA_KEY;
  const [citizens, setCitizens] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCitizens = async () => {
      const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(`https://sepolia.infura.io/v3/${infuraKey}`),
      });

      const contract = getContract({
        abi: CITIZEN_CONTRACT_ABI,
        address: CITIZEN_CONTRACT_ADDRESS,
        client: publicClient,
      });

      try {
        const latestBlock = await publicClient.getBlockNumber();

        const citizenEvent = parseAbiItem(
          'event Citizen(uint256 indexed id, uint256 indexed age, string indexed city, string name)'
        );

        const logs = await publicClient.getLogs({
          address: CITIZEN_CONTRACT_ADDRESS,
          event: citizenEvent,
          fromBlock: 0n,
          toBlock: latestBlock,
        });

        const citizens = await Promise.all(
          logs.map(async log => {
            const { id, age, city, name } = log.args;
            let note = '—';
            try {
              note = await contract.read.getNoteByCitizenId([id]);
            } catch (e) {
              console.warn(`Note fetch failed for ID ${id}:`, e.message);
            }
            return {
              id: Number(id),
              age: Number(age),
              city,
              name,
              note,
            };
          })
        );

        setCitizens(citizens.reverse());
      } catch (err) {
        console.error('Failed to load citizen logs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCitizens();
  }, [infuraKey]);

  const filteredCitizens = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return citizens.filter(({ name, city, note }) =>
      [name, city, note].some(field => (field || '').toLowerCase().includes(lowerSearch))
    );
  }, [searchTerm, citizens]);

  const totalPages = Math.ceil(filteredCitizens.length / ITEMS_PER_PAGE);
  const paginatedCitizens = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCitizens.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCitizens, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  if (loading) return <Spinner />;

  return (
    <div className='container mx-auto px-4 sm:px-6 py-6 font-sans'>
      <div className='min-h-screen bg-white'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6'>
          <h1 className='text-[#121416] text-2xl sm:text-3xl font-bold leading-tight'>Citizen Registry</h1>
        </div>

        <div className='mb-6'>
          <label className='block w-full'>
            <div className='flex items-center rounded-xl bg-[#f1f2f4] h-12'>
              <div className='pl-4 text-[#6a7681]'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor'>
                  <path d='M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z' />
                </svg>
              </div>
              <input
                type='text'
                placeholder='Search citizens'
                className='flex-1 bg-[#f1f2f4] text-[#121416] placeholder-[#6a7681] border-none outline-none px-4 rounded-xl h-full text-sm'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </label>
        </div>

        {!paginatedCitizens.length ? (
          <div className='text-center mt-10'>
            <p className='text-gray-500 mb-4'>No citizens found.</p>
            <Button onClick={() => navigate('/')}>Back Home</Button>
          </div>
        ) : (
          <>
            <div className='overflow-x-auto rounded-lg border border-[#dde1e3]'>
              <table className='min-w-full bg-white text-sm'>
                <thead className='bg-gray-50 text-[#121416] text-left'>
                  <tr className='border-b border-gray-400'>
                    <th className='px-2 py-3 sm:px-4'>Name</th>
                    <th className='px-2 py-3 sm:px-4'>Age</th>
                    <th className='px-2 py-3 sm:px-4'>City</th>
                    <th className='px-2 py-3 sm:px-4'>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCitizens.map(({ id, name, age, city, note }) => (
                    <tr key={id} className='border-t border-gray-300'>
                      <td className='px-2 py-3 sm:px-4 text-[#121416]'>{name}</td>
                      <td className='px-2 py-3 sm:px-4 text-[#6a7681]'>{age}</td>
                      <td className='px-2 py-3 sm:px-4 text-[#6a7681] break-words'>{city}</td>
                      <td className='px-2 py-3 sm:px-4 text-[#6a7681]'>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </div>
    </div>
  );
}
