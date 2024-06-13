import React, { useState, useEffect } from 'react';

const WindowSillsCalculator = ({ updateTotalCost }) => {
    const [items, setItems] = useState([]);
    const [borts, setBorts] = useState([]);
    const [kromkas, setKromkas] = useState([]);
    const [additionalServices, setAdditionalServices] = useState([]);
  
    const [product, setProduct] = useState('');
    const [material, setMaterial] = useState('');
    const [brand, setBrand] = useState('');
    const [article, setArticle] = useState('');
  
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [materialQuantity, setMaterialQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
  
    const [bortModel, setBortModel] = useState('');
    const [bortQuantity, setBortQuantity] = useState('');
    const [bortPrice, setBortPrice] = useState('');
  
    const [kromkaModel, setKromkaModel] = useState('');
    const [kromkaQuantity, setKromkaQuantity] = useState('');
    const [kromkaPrice, setKromkaPrice] = useState('');

    const [serviceName, setServiceName] = useState('');
    const [serviceQuantity, setServiceQuantity] = useState('');
    const [servicePrice, setServicePrice] = useState('');
  
    const [totalArea, setTotalArea] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
  
    useEffect(() => {
      updateTotalCost(totalCost);
    }, [totalCost]);
  
    const addDimension = () => {
      if (length && width && materialQuantity && unitPrice) {
        const area = totalArea;
        const cost = parseFloat(materialQuantity) * parseFloat(unitPrice);
        const newItem = { length, width, area, materialQuantity, unitPrice, cost };
        setItems([...items, newItem]);
        setTotalCost(totalCost + cost);
        setLength('');
        setWidth('');
        setMaterialQuantity('');
        setUnitPrice('');
      }
    };
  
    const addBort = () => {
      if (bortModel && bortQuantity && bortPrice) {
      const cost = parseFloat(bortQuantity) * parseFloat(bortPrice);
      const newBort = { bortModel, bortQuantity, bortPrice, cost };
      setBorts([...borts, newBort]);
      setTotalCost(totalCost + cost);
      setBortModel('');
      setBortQuantity('');
      setBortPrice('');
      }
    };

    const addKromka = () => {
      if (kromkaModel && kromkaQuantity && kromkaPrice) {
        const cost = parseFloat(kromkaQuantity) * parseFloat(kromkaPrice);
        const newKromka = { kromkaModel, kromkaQuantity, kromkaPrice, cost };
        setKromka([...kromka, newKromka]);
        setTotalCost(totalCost + cost);
        setKromkaModel('');
        setKromkaQuantity('');
        setKromkaPrice('');
      }
    };
  
    const addService = () => {
      if (serviceName && serviceQuantity && servicePrice) {
      const cost = parseFloat(serviceQuantity) * parseFloat(servicePrice);
      const newService = { serviceName, serviceQuantity, servicePrice, cost };
      setAdditionalServices([...additionalServices, newService]);
      setTotalCost(totalCost + cost);
      setServiceName('');
      setServiceQuantity('');
      setServicePrice('');
      }
    };
  
    return (
      <div>
        <form className="form-table">
        <h2>Подоконники</h2>
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
                <label>Общая площадь: {totalArea}</label>
                <div className="button-container">
                <button 
                type='button' 
                className="btn btn-danger size-btn" 
                onClick={() => (length && width) ? setTotalArea(totalArea + parseFloat(length) * parseFloat(width)): setTotalArea(totalArea)}
                >
                  Подсчитать
                </button>
                    <button type='button' className="btn btn-danger size-btn" onClick={() => setTotalArea(0)}>Обнулить</button>
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

            <div className="form-row washing">
            <div className="form-group col-md-4">
              <label>Бортик</label>
              <select 
              className="form-control"
              value={bortModel}
              onChange={(e) => setBortModel (e.target.value)}
              >
              <option value="">Выберите Бортик</option>
              <option>Бортик 1</option>
              <option>Бортик 2</option>
              <option>Бортик 3</option>
            </select>
            </div>
            <div className="form-group col-md-2">
              <label>Кол-во</label>
              <input 
                type="number" 
                className="form-control"
                value={bortQuantity}
                onChange={(e) => setBortQuantity(e.target.value)}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Цена за 1</label>
              <input 
                type="number" 
                className="form-control result"
                value={bortPrice}
                onChange={(e) => setBortPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="washing__wrapper-block">
            {borts.map((bort, index) => (
              <div key={index}>
                Модель: {bort.bort}, Кол-во: {bort.bortQuantity}, Цена: {bort.bortPrice}, Стоимость: {bort.cost}
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-danger wash__btn" onClick={addBort}>Добавить бортик</button>

          <div className="form-row washing">
            <div className="form-group col-md-4">
              <label>Кромка</label>
              <select 
              className="form-control"
              value={kromkaModel}
              onChange={(e) => setKromkaModel (e.target.value)}
              >
              <option value="">Выберите кромку</option>
              <option>Кромка 1</option>
              <option>Кромка 2</option>
              <option>Кромка 3</option>
            </select>
            </div>
            <div className="form-group col-md-2">
              <label>Кол-во</label>
              <input 
                type="number" 
                className="form-control"
                value={kromkaQuantity}
                onChange={(e) => setKromkaQuantity(e.target.value)}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Цена за 1</label>
              <input 
                type="number" 
                className="form-control result"
                value={kromkaPrice}
                onChange={(e) => setKromkaPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="washing__wrapper-block">
            {kromkas.map((kromka, index) => (
              <div key={index}>
                Кромка: {kromka.kromka}, Кол-во: {kromka.kromkaQuantity}, Цена: {kromka.kromkaPrice}, Стоимость: {kromka.cost}
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-danger wash__btn" onClick={addKromka}>Добавить кромку</button>

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

export default WindowSillsCalculator;
