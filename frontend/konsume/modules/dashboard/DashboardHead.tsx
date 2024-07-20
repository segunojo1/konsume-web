import React, { useContext, useEffect, useState } from 'react';
import veg from '../../public/assets/kons.png';
import SetupContext, { useSetupContext } from '../../context/SetupContext';
import { dashboardhero } from './dashboardhero';
import gemini from '../../http/gemini';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Cookies from 'js-cookie';

const DashboardHead = () => {
  const { name, age, weight, userGoal, possibleDiseases } = useSetupContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this only runs on the client
    setIsClient(true);
  }, []);
  // const stringdisease = userDiseases.join(, )
  const qq = `Hello, I am ${Cookies.get('age')} years old, I am working on ${Cookies.get(
    'userGoal',
  )}, my health conditons are ${Cookies.get(
    'possibleDiseases',
  )}. Please generate a three word diet for me e.g High protein diet, just suggest a hypothetical name`;
  const [query, setQuery] = useState(qq);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    makeRequest();
  }, []);

  const makeRequest = async () => {
    try {
      console.log('hii');
      const { data } = await gemini.post('/gemini-pro:generateContent', { contents: [{ parts: [{ text: query }] }] });
      setAnswer(data.candidates[0].content.parts[0].text);
      console.log(data);
      console.log('done');
      console.log(query);
    } catch (error) {
      console.error(error);
    }
  };

  const textForUserGoal = dashboardhero.filter(({ title }) => title == userGoal).map(({ text }) => text);
  console.log(textForUserGoal);

  return (
    <div className="font-satoshi bg-[#8C77EC] p-5 mt-7 rounded-2xl dashboardhead">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5 max-w-[450px]">
          <h1 className=" text-[#D6FBC4] leading-[57px] text-[42px] font-bold">
            Hello {isClient ? Cookies.get('konsumeUsername') : '...'}
          </h1>
          <p className=" text-sm font-light text-[white]">Hello, {isClient ? textForUserGoal : '...'}</p>
          <p className=" font-medium text-sm">
            <span className="text-[#FFFFFF] font-jakarta">Meal Plan:</span>{' '}
            <span className="text-[#FFC501]">{answer}</span>{' '}
          </p>
          <button className="bg-[#DFE1F7] text-[#8C77EC] font-bold py-[10px] px-[22px] leading-[17px] w-fit rounded-lg">
            Today&apos;s Meal Recommendation
          </button>
        </div>
        <Image src={veg} alt="veg" className="md:block hidden w-[250px]" />
      </div>
    </div>
  );
};

export default DashboardHead;