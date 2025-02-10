import React, { useEffect, useRef, useState } from "react";
import "./ToolBar.css";
import SearchBar from "../../../../common/search_bar/SearchBar";
import Filter from "../../../../common/filter/Filter";
import NewPlant from "../new_plant/NewPlant";
import useLocalStorage from "use-local-storage";
import axios from "axios";
import { toast } from "react-toastify/unstyled";

const ToolBar = ({ setRefreshData }) => {
  const [selectedPlants, setSelectedPlants] = useLocalStorage(
    "manager_plants_selected",
    ""
  );
  const [showModal, setShowModal] = useState(false);
  const baseUrl = import.meta.env.VITE_REACT_APP_PLANT_END_POINT;
  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  const showToastMessageSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
    });
  };
  const showToastMessageFail = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };
  const handleDeletePlant = async () => {
    try {
      const deleteOne = async (item_id, plantTypeId) => {
        try {
          await axios.delete(
            `${baseUrl}/plant_type/${plantTypeId}/plant/${item_id}`
          );
        } catch (e) {
          console.log(e);
        }
      };
      if(selectedPlants === null || selectedPlants.length == 0) return;
      Array.isArray(selectedPlants) &&
        selectedPlants.forEach((element) => {
          const item = JSON.parse(element);
          deleteOne(item.id, item.plant_typeId);
        });
        showToastMessageSuccess("Delete successful!")
    } catch (error) {
      console.log(error);
      showToastMessageSuccess("Delete fail!")
    } finally {
      setSelectedPlants("");
      setRefreshData((prev) => !prev);
    }
  };

  return (
    <div className="tool-bar-plant">
      <Filter />
      <div className="right-tool-bar-plant">
        <SearchBar />
        <div
          onClick={() => handleDeletePlant()}
          className={
            selectedPlants && selectedPlants.length > 0
              ? "plant-button delete-plant-button-active"
              : "plant-button delete-plant-button-non-active"
          }
        >
          Delete
        </div>
        <div
          className="plant-button new-plant-button"
          onClick={() => handleShowModal()}
        >
          Create Plant
        </div>
      </div>
      {showModal && (
        <NewPlant setRefreshData={setRefreshData} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default ToolBar;
