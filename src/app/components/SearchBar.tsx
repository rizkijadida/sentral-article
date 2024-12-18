"use client";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";

export interface searchProps {
  onSearch: (value: string) => void;
}

const SearchBar = (props: searchProps) => {
  const { onSearch } = props;
  const placeHolderValue = "Type a command ...";
  const [value, setValue] = useState(placeHolderValue);
  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(value);
      console.log(value);
    }
  };
  const handleButtonClick = () => {
    onSearch(value); // Menjalankan pencarian saat tombol klik
    console.log(value); // Menampilkan nilai input ke konsol
  };

  return (
    <div className="container flex items-center justify-center gap-10 p-10">
      <input
        className="flex h-10 md:w-full rounded-full border-black bg-white px-5 pr-10 text-sm text-black focus:outline-none"
        type="search"
        placeholder={placeHolderValue}
        name="search"
        onChange={searchHandler}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant={"outline"}
        className="rounded-full bg-violet-800 text-xs text-white md:w-[150px] w-[100px]"
        onClick={handleButtonClick}
      >
        Search Article
      </Button>
    </div>
  );
};

export default SearchBar;
