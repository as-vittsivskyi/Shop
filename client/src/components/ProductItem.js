import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import star from '../assets/star.png'
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";

const ProductItem = ({product}) => {
  const history = useNavigate()
  return (
    <Col md={3} className="mt-3" onClick={() => history(PRODUCT_ROUTE + '/' + product.id)}>
      <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
        <Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.img}/>
        <div className="mt-1 d-flex text-black-50 align-items-center justify-content-between">
          <div>Зелена корівка</div>
          <div className="d-flex align-items-center">
            <div>{product.rating}</div>
            <Image width={18} height={18} src={star}/>
          </div>
        </div>
        <div>{product.name}</div>
      </Card>
    </Col>
  );
};

export default ProductItem;