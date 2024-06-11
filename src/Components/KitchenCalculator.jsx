import React, { useState, useEffect } from 'react';

const KitchenCalculator = ({ updateTotalCost }) => {
  const [items, setItems] = useState([]);
  const [sinks, setSinks] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);

  const [product, setProduct] = useState('');
  const [material, setMaterial] = useState('');
  const [brand, setBrand] = useState('');
  const [article, setArticle] = useState('');

  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [materialQuantity, setMaterialQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');

  const [sinkModel, setSinkModel] = useState('');
  const [sinkQuantity, setSinkQuantity] = useState('');
  const [sinkPrice, setSinkPrice] = useState('');

  const [serviceName, setServiceName] = useState('');
  const [serviceQuantity, setServiceQuantity] = useState('');
  const [servicePrice, setServicePrice] = useState('');

  const [totalArea, setTotalArea] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    updateTotalCost(totalCost);
  }, [totalCost, updateTotalCost]);

  const addDimension = () => {
    const area = parseFloat(length) * parseFloat(width);
    const cost = parseFloat(materialQuantity) * parseFloat(unitPrice);
    const newItem = { length, width, area, materialQuantity, unitPrice, cost };
    setItems([...items, newItem]);
    setTotalArea(totalArea + area);
    setTotalCost(totalCost + cost);
    setLength('');
    setWidth('');
    setMaterialQuantity('');
    setUnitPrice('');
  };

  const addSink = () => {
    const cost = parseFloat(sinkQuantity) * parseFloat(sinkPrice);
    const newSink = { sinkModel, sinkQuantity, sinkPrice, cost };
    setSinks([...sinks, newSink]);
    setTotalCost(totalCost + cost);
    setSinkModel('');
    setSinkQuantity('');
    setSinkPrice('');
  };

  const addService = () => {
    const cost = parseFloat(serviceQuantity) * parseFloat(servicePrice);
    const newService = { serviceName, serviceQuantity, servicePrice, cost };
    setAdditionalServices([...additionalServices, newService]);
    setTotalCost(totalCost + cost);
    setServiceName('');
    setServiceQuantity('');
    setServicePrice('');
  };

  return (
    <div>
      <form className="form-table">
        {/* ... rest of the form ... */}
        <div className="form-row about">
          <div className="form-group col-md-3">
            <label>Изделие</label>
            <select 
              className="form-control"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="">Выберите изделие</option>
              <option>Столешница кухня 1</option>
              <option>Столешница кухня 2</option>
              <option>Столешница кухня 3</option>
              <option>Столешница кухня 4</option>
              <option>Столешница кухня 5</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label>Материал</label>
            <select 
              className="form-control"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="">Выберите материал</option>
              <option>Камень</option>
              <option>Кварц</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label>Бренд</label>
            <select 
              className="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">Выберите бренд</option>
              <option>Бренд 1</option>
              <option>Бренд 2</option>
              <option>Бренд 3</option>
              <option>Бренд 4</option>
              <option>Бренд 5</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label>Артикул</label>
            <select 
              className="form-control"
              value={article}
              onChange={(e) => setArticle(e.target.value)}
            >
              <option value="">Выберите артикул</option>
              <option>Артикул 1</option>
              <option>Артикул 2</option>
              <option>Артикул 3</option>
            </select>
          </div>
        </div>

        {/* Form for adding dimensions, sinks, and services */}
        <div className="size">
          <div className="form-row form-size">
            <div className="form-block">
              <div className="form-row form-size__block">
                <div className="form-group col-md-6 size__length-block">
                  <label>Длина</label>
                  <input 
                    type="number" 
                    className="form-control size__length" 
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6 size__large-block">
                  <label>Ширина</label>
                  <input 
                    type="number" 
                    className="form-control size__large"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group col-md-2">
              <label>Общая площадь</label>
              <input type="number" className="form-control size__sum" value={totalArea} readOnly />
            </div>
            <div className="form-group col-md-2">
              <label>Кол-во Материала</label>
              <input 
                type="number" 
                className="form-control size__material"
                value={materialQuantity}
                onChange={(e) => setMaterialQuantity(e.target.value)}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Стоимость</label>
              <input 
                type="number" 
                className="form-control size__price result"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="size__wrapper-block">
            {items.map((item, index) => (
              <div key={index}>
                Длина: {item.length}, Ширина: {item.width}, Площадь: {item.area}, Кол-во Материала: {item.materialQuantity}, Стоимость: {item.cost}
              </div>
            ))}
          </div>
        </div>
        <button type="button" className="btn btn-danger size-btn" onClick={addDimension}>Добавить размеры</button>

        {/* Sinks form */}
        <div className="form-row washing">
          <div className="form-group col-md-4">
            <label>Модель Мойки</label>
            <select 
            className="form-control"
            value={sinkModel}
            onChange={(e) => setSinkModel(e.target.value)}
            >
            <option value="">Выберите мойку</option>
            <option>Модель Мойки 1</option>
            <option>Модель Мойки 2</option>
            <option>Модель Мойки 3</option>
            <option>Модель Мойки 4</option>
            <option>Модель Мойки 5</option>
          </select>
          </div>
          <div className="form-group col-md-2">
            <label>Кол-во</label>
            <input 
              type="number" 
              className="form-control"
              value={sinkQuantity}
              onChange={(e) => setSinkQuantity(e.target.value)}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Цена</label>
            <input 
              type="number" 
              className="form-control result"
              value={sinkPrice}
              onChange={(e) => setSinkPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="washing__wrapper-block">
          {sinks.map((sink, index) => (
            <div key={index}>
              Модель: {sink.sinkModel}, Кол-во: {sink.sinkQuantity}, Цена: {sink.sinkPrice}, Стоимость: {sink.cost}
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-danger wash__btn" onClick={addSink}>Добавить мойку</button>

        {/* Additional services form */}
        <div className="form-row work">
          <div className="form-group col-md-4">
            <label>Доп.работы</label>
            <select 
            className="form-control"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            >
            <option value="">Выберите доп.работы</option>
            <option>Доп.работа 1</option>
            <option>Доп.работа 2</option>
            <option>Доп.работа 3</option>
          </select>
          </div>
          <div className="form-group col-md-2">
            <label>Кол-во</label>
            <input 
              type="number" 
              className="form-control"
              value={serviceQuantity}
              onChange={(e) => setServiceQuantity(e.target.value)}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Цена</label>
            <input 
              type="number" 
              className="form-control result"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
            />
          </div>
        </div>
        <div className="work__wrapper-block">
          {additionalServices.map((service, index) => (
            <div key={index}>
              Работа: {service.serviceName}, Кол-во: {service.serviceQuantity}, Цена: {service.servicePrice}, Стоимость: {service.cost}
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-danger work__btn" onClick={addService}>Добавить работу</button>

        <div className="form-group">
          <p>Общая стоимость: <b>{totalCost}</b></p>
        </div>
      </form>
    </div>
  );
};

export default KitchenCalculator;
