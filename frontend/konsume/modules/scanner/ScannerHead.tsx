import React, { useEffect, useState } from "react";
import kon from "../../public/assets/kons.png";
import SetupContext, { useSetupContext } from "../../context/SetupContext";
import gemini from "../../http/gemini";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "js-cookie";

const ScannerHead = () => {
  const { name, age, weight, userGoal, possibleDiseases } = useSetupContext();
  const qq = `My name is ${name} I am ${age} years old and ${weight}kg, I am working on ${userGoal}, my health conditons are ${possibleDiseases}. Please generate a three word diet for me e.g High protein diet`;
  const [query, setQuery] = useState(qq);
  const [answer, setAnswer] = useState("");
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
    makeRequest();
  }, []);

  const makeRequest = async () => {
    try {
      console.log("hii");
      const { data } = await gemini.post("/gemini-pro:generateContent", {
        contents: [{ parts: [{ text: query }] }],
      });
      setAnswer(data.candidates[0].content.parts[0].text);
      console.log(data);
      console.log("done");
      console.log(query);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="font-jakarta bg-[#8C77EC] dashboardhead p-5 mt-7 rounded-2xl">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5 md:w-[488px]">
          <h1 className=" text-[#D6FBC4] text-4xl font-bold">
            Hello {client ? Cookies.get("konsumeUsername") : "..."}
          </h1>
          <p className=" text-sm font-medium text-[white]">
            Chat with our AI bot to get personalized nutrition advice, recipes,
            meal plans, and more. Ask anything and get instant, tailored
            responses to help you achieve your health goals!
            <span className="text-[#FFC501]">try it now!</span>
          </p>
        </div>
        <Image src={kon} alt="konsume" className="md:block hidden w-[250px]" />
      </div>
    </div>
  );
};

export default ScannerHead;