import { useColorMode } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { BsFilterLeft, BsArrowDown } from "react-icons/bs";

const radioBtnValue = [
  "all",
  "newestProducts",
  "popular",
  "cheapest",
  "expensive",
];
const names = ["همه", "جدیدترین", "محبوب‌ترین", "ارزان‌ترین", "گران‌ترین"];

interface Props {
  selectedBtn: string;
  onChangeSelectedBtn: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Sort: React.FC<Props> = ({
  selectedBtn: selectedRadioBtn,
  onChangeSelectedBtn,
}) => {
  const { colorMode } = useColorMode();

  const isRadioSelected = (value: string): boolean =>
    value === selectedRadioBtn ? true : false;

  return (
    <div className="my-4 flex flex-wrap border-b-2 border-slate-300 pb-2">
      <div className="flex items-center">
        <div className="flex items-center">
          <BsFilterLeft className="text-2xl" />
          <BsArrowDown />
        </div>
        <h5 className="mr-1 font-bold">مرتب‌سازی:</h5>
      </div>

      <div className="flex flex-wrap items-center">
        {radioBtnValue.map((radioInput) => {
          return (
            <div key={radioInput} className="mx-2 my-1 px-1 sm:my-0 md:px-2">
              <label
                htmlFor={radioInput}
                className={`cursor-pointer text-sm font-bold ${
                  radioInput === selectedRadioBtn
                    ? "font-bold text-[#A71B4A]"
                    : "text-[#8c9aaf]/80 transition-all hover:text-[#e2e8f0]"
                } ${
                  colorMode === "dark"
                    ? "hover:text-[#e2e8f0]"
                    : "hover:text-[#41464F]"
                }`}
              >
                {names[radioBtnValue.indexOf(radioInput)]}
              </label>
              <input
                type="radio"
                className="hidden"
                id={radioInput}
                value={radioInput}
                name="sortProduct"
                checked={isRadioSelected(radioInput)}
                onChange={onChangeSelectedBtn}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sort;
