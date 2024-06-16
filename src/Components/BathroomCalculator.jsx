import { useState, useEffect } from "react";

const BathroomCalculator = ({ updateTotalCost }) => {
  const [items, setItems] = useState([]);
  const [sinks, setSinks] = useState([]);
  const [kromkas, setKromkas] = useState([]);
  const [boards, setBoards] = useState([]);
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

  const [kromkaName, setKromkaName] = useState('');
  const [kromkaQuantity, setKromkaQuantity] = useState('');
  const [kromkaPrice, setKromkaPrice] = useState('');

  const [boardName, setBoardName] = useState('');
  const [boardQuantity, setBoardQuantity] = useState('');
  const [boardPrice, setBoardPrice] = useState('');

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
      let area = 0;
      if (totalArea === 0) {
        area += parseFloat(length) * parseFloat(width)
      } else area += totalArea
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

  const addSink = () => {
    if (sinkModel && sinkQuantity && sinkPrice) {
      const cost = parseFloat(sinkQuantity) * parseFloat(sinkPrice);
      const newSink = { sinkModel, sinkQuantity, sinkPrice, cost };
      setSinks([...sinks, newSink]);
      setTotalCost(totalCost + cost);
      setSinkModel('');
      setSinkQuantity('');
      setSinkPrice('');
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
  const addKromka = () => {
    if (kromkaName && kromkaQuantity && kromkaPrice) {
      const cost = parseFloat(kromkaQuantity) * parseFloat(kromkaPrice);
      const newKromka = { kromkaName, kromkaQuantity, kromkaPrice, cost };
      setKromkas([...kromkas, newKromka]);
      setTotalCost(totalCost + cost);
      setKromkaName('');
      setKromkaQuantity('');
      setKromkaPrice('');
    }
  };

  const addBoard = () => {
    if (boardName && boardQuantity && boardPrice) {
      const cost = parseFloat(boardQuantity) * parseFloat(boardPrice);
      const newBoard = { boardName, boardQuantity, boardPrice, cost };
      setBoards([...boards, newBoard]);
      setTotalCost(totalCost + cost);
      setBoardName('');
      setBoardQuantity('');
      setBoardPrice('');
    }
  };

  const add = () => {
      addSink();
      addKromka();
      addBoard();
      addService();
  };
  
  useEffect(() => {
    const calculateTotalCost = () => {
      let total = 0;
      items.forEach(item => {
        total += parseFloat(item.cost);
      });
      sinks.forEach(sink => {
        total += parseFloat(sink.cost);
      });
      additionalServices.forEach(service => {
        total += parseFloat(service.cost);
      });
      kromkas.forEach(kromka => {
        total += parseFloat(kromka.cost);
      });
      boards.forEach(board => {
        total += parseFloat(board.cost);
      });
      return total;
    };

    setTotalCost(calculateTotalCost());
  }, [items, sinks, additionalServices, kromkas, boards]);
  
   const deleteItem = (index, type) => {
    let updatedItems;
    let costToDeduct;
    switch (type) {
      case 'dimension':
        costToDeduct = items[index].cost;
        updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        setTotalCost(totalCost - costToDeduct)
        break;
      case 'sink':
        costToDeduct = sinks[index].cost;
        updatedItems = sinks.filter((_, i) => i !== index);
        setSinks(updatedItems);
        setTotalCost(totalCost - costToDeduct)
        break;
      case 'service':
        costToDeduct = additionalServices[index].cost;
        updatedItems = additionalServices.filter((_, i) => i !== index);
        setAdditionalServices(updatedItems);
        setTotalCost(totalCost - costToDeduct)
        break;
      case 'kromka':
        costToDeduct = kromkas[index].cost;
        updatedItems = kromkas.filter((_, i) => i !== index);
        setKromkas(updatedItems);
        setTotalCost(totalCost - costToDeduct)
          break;
      case 'board':
        costToDeduct = boards[index].cost;
        updatedItems = boards.filter((_, i) => i !== index);
        setBoards(updatedItems);
        setTotalCost(totalCost - costToDeduct)
          break;  
      default:
        return;
    }}


  return (
    <div>
      <form className="form-table">
        <h2>Столешница С/У</h2>
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
            <div className="form-group col-md-2 size__large-block">
              <p>Общая площадь: {totalArea}</p>
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
              <div key={index} className="size__wrapper-block">
              <div key={index}>
                Длина: {item.length}, Ширина: {item.width}, Площадь: {item.area}, Кол-во Материала: {item.materialQuantity}, Стоимость: {item.cost}
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteItem(index, 'dimension')}
              >
                &times;
              </button>
              </div>
            ))}
          </div>
        </div>
        <div className="button-container">
          <button
            type='button'
            className="btn btn-danger size-btn"
            onClick={() => (length && width) ? setTotalArea(totalArea + parseFloat(length) * parseFloat(width)) : setTotalArea(totalArea)}
          >
            Подсчитать
          </button>
          <button type='button' className="btn btn-danger size-btn" onClick={() => setTotalArea(0)}>Обнулить</button>
        </div>
        <button type="button" className="btn btn-danger size-btn" onClick={addDimension}>Добавить размеры</button>

        <div className="form-row washing">
          <div className="form-group col-md-4">
            <label>Раковина</label>
            <select
              className="form-control"
              value={sinkModel}
              onChange={(e) => setSinkModel(e.target.value)}
            >
              <option value="">Выберите мойку</option>
              <option>Модель Раковины 1</option>
              <option>Модель Раковины 2</option>
              <option>Модель Раковины 3</option>
              <option>Модель Раковины 4</option>
              <option>Модель Раковины 5</option>
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
            <div key={index} className="size__wrapper-block">
            <div>
              Модель: {sink.sinkModel}, Кол-во: {sink.sinkQuantity}, Цена: {sink.sinkPrice}, Стоимость: {sink.cost}
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteItem(index, 'sink')}
            >
              &times;
            </button>
          </div>
          ))}
        </div>
        <button type="button" className="btn btn-danger wash__btn" onClick={add}>Добавить</button>

        <div className="form-row work">
          <div className="form-group col-md-4">
            <label>Кромки</label>
            <select
              className="form-control"
              value={kromkaName}
              onChange={(e) => setKromkaName(e.target.value)}
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
            <label>Цена</label>
            <input
              type="number"
              className="form-control result"
              value={kromkaPrice}
              onChange={(e) => setKromkaPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="work__wrapper-block">
          {kromkas.map((kromka, index) => (
            <div key={index} className="size__wrapper-block">
            <div>
              Кромка: {kromka.kromkaName}, Кол-во: {kromka.kromkaQuantity}, Цена: {kromka.kromkaPrice}, Стоимость: {kromka.cost}
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteItem(index, 'kromka')}
            >
              &times;
            </button>
            </div>
          ))}
        </div>
        <div className="form-row work">
          <div className="form-group col-md-4">
            <label>Бортики</label>
            <select
              className="form-control"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
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
              value={boardQuantity}
              onChange={(e) => setBoardQuantity(e.target.value)}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Цена</label>
            <input
              type="number"
              className="form-control result"
              value={boardPrice}
              onChange={(e) => setBoardPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="work__wrapper-block">
          {boards.map((board, index) => (
            <div key={index} className="size__wrapper-block">
            <div>
              Борт: {board.boardName}, Кол-во: {board.boardQuantity}, Цена: {board.boardPrice}, Стоимость: {board.cost}
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteItem(index, 'board')}
            >
              &times;
            </button>
            </div>
          ))}
        </div>

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
            <div key={index} className="size__wrapper-block"  >
            <div>
              Работа: {service.serviceName}, Кол-во: {service.serviceQuantity}, Цена: {service.servicePrice}, Стоимость: {service.cost}
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteItem(index, 'service')}
            >
              &times;
            </button>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-danger work__btn" onClick={add}>Добавить</button>

        <div className="form-group">
          <p>Общая стоимость: <b>{totalCost}</b></p>
        </div>
      </form>
    </div>
  );
  };
  
  export default BathroomCalculator;


