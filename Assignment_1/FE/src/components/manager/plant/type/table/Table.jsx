import React, { useEffect, useState } from "react";
import "./Table.css";
import CardPlantType from "./card/CardPlantType";
import axios from "axios";


const Table = ({refreshData,setRefreshData, setUpdateItem}) => {
  const [data,setData] = useState()
  const baseUrl = import.meta.env.VITE_REACT_APP_PLANT_END_POINT
  const handleFetchData = async () => {
    try{
      const response = await axios.get(`${baseUrl}plant_type`);
      if(response.statusText === "OK"){
        setData(response.data)
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    handleFetchData()
  },[refreshData])

  return (
    <div className="table-plant-type">
        {data && Array.isArray(data) && data.map((item) => (
          <CardPlantType item={item} setRefreshData={setRefreshData} setUpdateItem={setUpdateItem} />
        ))}
    </div>  
  );
};

export default Table;
