import React from "react";
import { Card } from "react-bootstrap";
import "./CardPlantType.css";
import ICONS from "../../../../../../constant/Image";
import { toast } from "react-toastify/unstyled";
import axios from "axios";


const CardPlantType = ({ item ,setRefreshData, setUpdateItem}) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_PLANT_END_POINT
  const showToastMessageSuccess = () => {
    toast.success("Plant type was deleted !", {
      position: "top-right",
    });
  };
  const showToastMessageFail = () => {
    toast.error("Plant can not delete !", {
      position: "top-right",
    });
  };
  const handleDeleteItem = async (item) => {
    try {
      const response = await axios.delete(`${baseUrl}plant_type/${item.id}`)
      if (response.statusText !== "OK") throw new Error();
      showToastMessageSuccess();
    } catch (error) {
      showToastMessageFail()
    }finally{
      setRefreshData(prev => !prev)
    }
  };
  const handleUpdateItem = (item) => {
    setUpdateItem(item)
  }
  return (
    <Card className="card-plant-type">
      <Card.Header className="card-header">
        <div className="container-icon">
          <img src={ICONS.icon_update} onClick={() => handleUpdateItem(item)}/>
        </div>
        <div className="container-icon" onClick={() => handleDeleteItem(item)}>
          <img src={ICONS.icon_delete} />
        </div>
      </Card.Header>
      <Card.Body className="card-body">
        <Card.Title className="card-title-plant-type">{item.type_name}</Card.Title>
        <Card.Text className="card-text-plant-type">
          {item.type_description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardPlantType;
