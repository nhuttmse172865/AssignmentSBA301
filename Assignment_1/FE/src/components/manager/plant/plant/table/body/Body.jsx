import React, { useState } from "react";
import "./Body.css";
import ICONS from "../../../../../../constant/Image";
import UpdatePlant from "../../update_plant/UpdatePlant";
import useGridColumn from "../../../../../../hook/useGridColumn";

const Body = ({ item, index, itemsActive, handleSelectItem , listTitle, plantTypesData, setRefreshData}) => {
  const [showModal,setShowModal] = useState(false)
  const [itemUpdate,setItemUpdate] = useState()
  const gridColumnTemplate = useGridColumn(listTitle)
  const isActive = Array.isArray(itemsActive) && itemsActive.includes(JSON.stringify(item));
  const handleShowUpdatePopup = (event, item) => {
    setItemUpdate(item)
    event.stopPropagation();
    setShowModal(true)
  };
  const plantTypeName = plantTypesData.find(element => element.id === item.plant_typeId)
  return (
    <>
      {showModal && <UpdatePlant setRefreshData={setRefreshData} itemUpdate={itemUpdate} setShowModal={setShowModal} />}
      <ul
        className={isActive ? "body-table body-table-active" : "body-table"}
        onClick={() => handleSelectItem(item)}
        style={{ gridTemplateColumns: gridColumnTemplate }}
      >
        <li>{index + 1}</li>
        <li>{item.plant_name}</li>
        <li>{item.characteristics}</li>
        <li>{item.description}</li>
        <li>{item.species}</li>
        <li>{item.attracts}</li>
        <li>{item.hardiness}</li>
        <li>{plantTypeName.type_name}</li>
        <li>{item.heat_zone}</li>
        <li>{item.size}</li>
        <li>{item.price}</li>
        <li>{item.is_seed ? "seed": "tree"}</li>
        <li>
          <div
            onClick={(event) => handleShowUpdatePopup(event, item)}
            className="update-table-body"
          >
            <img src={ICONS.icon_update} alt="" />
          </div>
        </li>
        {isActive ? (
          <img className="tick-active-table-item" src={ICONS.icon_tick} />
        ) : null}
      </ul>
    </>
  );
};

export default Body;
