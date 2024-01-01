import React, { createContext, useState } from "react";

export const outletContext = createContext();

export const OutletContextProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState('Default sorting');
  const [results, setResults] = useState(0);
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(0);
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);

  return (
    <outletContext.Provider
      value={{ sortBy, setSortBy, results, setResults, first, setFirst, last, setLast, startPrice, setStartPrice, endPrice, setEndPrice }}
    >
      {children}
    </outletContext.Provider>
  );
};
