import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useAccount, useWalletClient } from 'wagmi';
import { getContract } from 'viem';
import { CITIZEN_CONTRACT_ABI, CITIZEN_CONTRACT_ADDRESS } from '../contract/CitizenABI';

const AddCitizen = () => {
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    age: '',
    note: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isConnected || !walletClient) {
      toast.error('Please connect your wallet to continue.');
      return;
    }

    const { name, city, age } = formData;

    if (!name.trim() || !city.trim() || !age.trim()) {
      toast.warning('Name, Age, and City are required.');
      return;
    }

    const parsedAge = Number(age);
    if (isNaN(parsedAge) || parsedAge <= 0 || !Number.isInteger(parsedAge)) {
      toast.warning('Age must be a valid whole number greater than 0.');
      return;
    }

    const contract = getContract({
      abi: CITIZEN_CONTRACT_ABI,
      address: CITIZEN_CONTRACT_ADDRESS,
      client: walletClient,
    });

    try {
      setLoading(true);
      const hash = await contract.write.addCitizen([parsedAge, formData.city, formData.name, formData.note]);
      toast.success('Citizen added!');
      setFormData({ name: '', city: '', age: '', note: '' });
    } catch (err) {
      console.error('addCitizen error:', err);
      toast.error('Add citizen failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='flex flex-col-reverse lg:flex-row items-center gap-10 py-15 px-5'>
        {/* LEFT: FORM */}
        <div className='w-full lg:w-1/2'>
          <h2 className='text-[#111518] text-2xl sm:text-3xl font-bold mb-6'>Add New Citizen</h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-[#111518] font-medium mb-2'>Full Name</label>
              <InputField name='name' placeholder='Enter full name' value={formData.name} onChange={handleChange} />
            </div>

            <div>
              <label className='block text-[#111518] font-medium mb-2'>Age</label>
              <InputField name='age' placeholder='Enter age' value={formData.age} onChange={handleChange} />
            </div>

            <div>
              <label className='block text-[#111518] font-medium mb-2'>City</label>
              <InputField name='city' placeholder='Enter city' value={formData.city} onChange={handleChange} />
            </div>

            <div>
              <label className='block text-[#111518] font-medium mb-2'>Additional Notes</label>
              <textarea
                name='note'
                placeholder='Enter any additional notes'
                value={formData.note}
                onChange={handleChange}
                className='form-input w-full resize-none rounded text-[#111518] border border-[#dbe1e6] bg-white placeholder:text-[#60768a] p-[15px] text-base'
                rows='3'
              ></textarea>
            </div>

            <div>
              <Button type='submit' disabled={loading} className='w-full text-[#111518]'>
                {loading ? <Spinner /> : 'Add Citizen'}
              </Button>
            </div>
          </form>
        </div>

        {/* RIGHT: IMAGE */}
        <div className='w-full lg:w-1/2 flex justify-center'>
          <img
            src='https://lh3.googleusercontent.com/aida-public/AB6AXuAoKFao6GL3kvZ2kcHnrj6PndnpyBoK8Of4TV8xsl-cmXD-B6af501t7H63iwq_w6dV1jR6LjflMus2FSFE7YCN2_FUomLlZb_gXgKypXeFV3LKc8O3G6MWbt-ZdEK2ERhmmdRR1Ig-ZlnPurXTGQoVQtiyY-uepqafxqKcSHsHDx2BZcgoLt54RaihAJigU7PA5ceUlGRtgVr75umzVWaHmmDZF12bETyeCP1xZuAFLUul8FP0vWTa79-Zbee7qFOkmH3EDKKRg8NT'
            alt='Person working at desk'
            className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto'
          />
        </div>
      </div>
    </div>
  );
};

export default AddCitizen;
