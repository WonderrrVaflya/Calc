import React, { useState } from 'react';

const KitchenCalculator = () => {
    const [items, setItems] = useState([]);
    const [sinks, setSinks] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);

    const [product, setProduct] = useState('');
    const [material, setMaterial] = useState('');
    const [brend, setBrend] = useState('');
    const [artikol, setArtikol] = useState('');
  
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
  
    const addDimension = () => {
      const area = totalArea 
      const cost = parseFloat(materialQuantity) * parseFloat(unitPrice);
      const newItem = { length, width, area, materialQuantity, unitPrice, cost, brend, artikol, product, material };
      setItems([...items, newItem]);
      setTotalArea(0)
      setTotalCost(totalCost + cost);
      setProduct('')
      setArtikol('')
      setBrend('')
      setMaterial('')
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
      setTotalCost(totalCost + cost)
      setServiceName('');
      setServiceQuantity('');
      setServicePrice('');
    };
  
    return (
      <div>
        <form className="form-table">
          <div className="form-row about">
            <div className="form-group col-md-3">
              <label>Изделие</label>
              <input 
                  type="text" 
                  className="form-control size__length" 
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                />
            </div>
            <div className="form-group col-md-3">
              <label>Материал</label>
              <input 
                  type="text" 
                  className="form-control size__length" 
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                />
            </div>
            <div className="form-group col-md-3">
              <label>Бренд</label>
              <input 
                  type="text" 
                  className="form-control size__length" 
                  value={brend}
                  onChange={(e) => setBrend(e.target.value)}
                />
            </div>
            <div className="form-group col-md-3">
              <label>Артикул</label>
              <input 
                  type="text" 
                  className="form-control size__length" 
                  value={artikol}
                  onChange={(e) => setArtikol(e.target.value)}
                />
            </div>
          </div>
  
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
                <p>Общая площадь: {totalArea}</p>
                <button type='button' onClick={() => setTotalArea(totalArea + parseFloat(length) * parseFloat(width))}>Посчитать</button>
                <button type='button' onClick={() => setTotalArea(0)}>Обнулить</button>
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
                <label>Стоимость за 1</label>
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
                    Изделие-Артикол:{item.product},{item.material}... Площадь: {item.area}, Кол-во Материала: {item.materialQuantity}, Стоимость: {item.cost}.
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="btn btn-danger size-btn" onClick={addDimension}>Добавить размеры</button>
        
          <div className="form-row washing">
            <div className="form-group col-md-4">
              <label>Модель Мойки</label>
              <input 
                type="text" 
                className="form-control"
                value={sinkModel}
                onChange={(e) => setSinkModel(e.target.value)}
              />
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
              <label>Стоимость за 1</label>
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
        
          <div className="form-row work">
            <div className="form-group col-md-4">
              <label>Доп.работы</label>
              <input 
                type="text" 
                className="form-control"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-1">
              <label>Кол-во</label>
              <input 
                type="number" 
                className="form-control"
                value={serviceQuantity}
                onChange={(e) => setServiceQuantity(e.target.value)}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Стоимость за 1</label>
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
                Работа: {service.serviceName}, Кол-во: {service.serviceQuantity}, Стоимость: {service.cost}
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-danger work__btn" onClick={addService}>Добавить доп.услугу</button>
        </form>
        
        <p className="rest">Общая стоимость изделия: <span className="res__summ">{totalCost}</span></p>
      </div>
    );
  };
export default KitchenCalculator;