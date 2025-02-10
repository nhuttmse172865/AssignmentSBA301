import React, { useEffect, useState } from "react";
import "./Table.css";
import Header from "../../../../common/table/header/Header";
import Body from "./body/Body";
import useLocalStorage from "use-local-storage";
import axios from "axios";

const Table = ({ listTitle, refreshData , setRefreshData}) => {
  const [itemsActive, setItemsActive] = useState([]);
  const [selectedPlants, setSelectedPlants] = useLocalStorage(
    "manager_plants_selected",
    ""
  );
  const [listItems, setListItems] = useState();
  const baseUrl = import.meta.env.VITE_REACT_APP_PLANT_END_POINT;
  const [plantTypesData, setPlantTypesData] = useState();
  const handleFetchDataPlantType = async () => {
    try {
      const response = await axios.get(`${baseUrl}plant_type`)
      if (response.statusText !== "OK") throw new Error();
      setPlantTypesData(response.data);
    } catch (error) {
      console.log(error)
    }
  };
  const handleFetchPlantData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/plant`);
      console.log(response)
      if (response.statusText === "OK") {
        setListItems(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectItem = (item_index) => {
    if (itemsActive.includes(JSON.stringify(item_index))) {
      setItemsActive(
        itemsActive.filter(
          (item) =>
            JSON.stringify(JSON.parse(item)) !== JSON.stringify(item_index)
        )
      );
    } else {
      setItemsActive([...itemsActive, JSON.stringify(item_index)]);
    }
  };
  useEffect(() => {
    handleFetchDataPlantType()
  },[])
  useEffect(() => {
    setSelectedPlants(itemsActive);
  }, [itemsActive]);
  useEffect(() => {
    setTimeout(() => {
      handleFetchPlantData();
    }, 1000);
  }, [refreshData]);
  return (
    <>
      <Header listTitle={listTitle} />
      <div className="container-table-body">
        {listItems &&
          listItems.map((item, index) => (
            <Body
              handleSelectItem={handleSelectItem}
              itemsActive={itemsActive}
              item={item}
              index={index}
              listTitle={listTitle}
              plantTypesData={plantTypesData}
              setRefreshData={setRefreshData}
            />
          ))}
      </div>
    </>
  );
};

export default Table;
