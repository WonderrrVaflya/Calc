import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const Other = forwardRef(({ updateTotalCost }, ref) => {
  const [measures, setMeasures] = useState([]);
  const [deliverys, setDeliverys] = useState([]);
  const [installations, setInstallations] = useState([]);

  const [measureQuantity, setMeasureQuantity] = useState('');
  const [measurePrice, setMeasurePrice] = useState('');
  const [deliveryQuantity, setDeliveryQuantity] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState('');
  const [installationQuantity, setInstallationQuantity] = useState('');
  const [installationPrice, setInstallationPrice] = useState('');

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    updateTotalCost(totalCost);
  }, [totalCost]);

  useImperativeHandle(ref, () => ({
    getData() {
      return {
        measures,
        deliverys,
        installations,
        totalCost,
      };
    },
  }));

  const addMeasure = () => {
    if (measureQuantity && measurePrice) {
      const cost = parseFloat(measureQuantity) * parseFloat(measurePrice);
      const newMeasure = { measureQuantity, measurePrice, cost };
      setMeasures([...measures, newMeasure]);
      setTotalCost(totalCost + cost);
      setMeasureQuantity('');
      setMeasurePrice('');
    }
  }

  const addDelivery = () => {
    if (deliveryQuantity && deliveryPrice) {
      const cost = parseFloat(deliveryQuantity) * parseFloat(deliveryPrice);
      const newDelivery = { deliveryQuantity, deliveryPrice, cost };
      setDeliverys([...deliverys, newDelivery]);
      setTotalCost(totalCost + cost);
      setDeliveryQuantity('');
      setDeliveryPrice('');
    }
  }

  const addInstallation = () => {
    if (installationPrice && installationQuantity) {
      const cost = parseFloat(installationQuantity) * parseFloat(installationPrice);
      const newInstallation = { installationQuantity, installationPrice, cost };
      setInstallations([...installations, newInstallation]);
      setTotalCost(totalCost + cost);
      setInstallationQuantity('');
      setInstallationPrice('');
    }
  }

  const deleteItem = (index, type) => {
    let updatedItems;
    let costToDeduct;
    switch (type) {
      case 'measure':
        costToDeduct = measures[index].cost;
        updatedItems = measures.filter((_, i) => i !== index);
        setMeasures(updatedItems);
        setTotalCost(totalCost - costToDeduct)
        break;
      case 'delivery':
        costToDeduct = deliverys[index].cost;
        updatedItems = deliverys.filter((_, i) => i !== index);
        setDeliverys(updatedItems);
        setTotalCost(totalCost - costToDeduct)
        break;  
      case 'installation':
        costToDeduct = installations[index].cost;
        updatedItems = installations.filter((_, i) => i !== index);
        setInstallations(updatedItems);
        setTotalCost(totalCost - costToDeduct)
        break;  
      default:
        return;
    }}

  return (
    <form className="form-table">
      <h2>Иное</h2>
      <div className="form-row">
        <div className="form-group col-md-2 froze">
          Замер
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="measureQuantity">Кол-во</label>
          <input
            type="number"
            className="form-control"
            id="measureQuantity"
            value={measureQuantity}
            onChange={(e) => setMeasureQuantity(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="measurePrice">Стоимость</label>
          <input
            type="number"
            className="form-control"
            id="measurePrice"
            value={measurePrice}
            onChange={(e) => setMeasurePrice(parseFloat(e.target.value))}
          />
        </div>
        <button type="button" className="btn btn-danger other__btn" onClick={addMeasure}>Добавить замер</button>
      </div>
      <div className="washing__wrapper-block">
        {measures.map((measure, index) => (
          <div key={index} className="size__wrapper-block">
            <p>Кол-во: {measure.measureQuantity}, Цена: {measure.measurePrice}, Стоимость: {measure.cost}</p>
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteItem(index, 'measure')}
              >
                &times;
              </button>
          </div>
        ))}
      </div>

      <div className="form-row">
        <div className="form-group col-md-2 froze">
          Доставка
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="deliveryQuantity">Кол-во</label>
          <input
            type="number"
            className="form-control"
            id="deliveryQuantity"
            value={deliveryQuantity}
            onChange={(e) => setDeliveryQuantity(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="deliveryPrice">Стоимость</label>
          <input
            type="number"
            className="form-control"
            id="deliveryPrice"
            value={deliveryPrice}
            onChange={(e) => setDeliveryPrice(parseFloat(e.target.value))}
          />
        </div>
        <button type="button" className="btn btn-danger other__btn" onClick={addDelivery}>Добавить доставку</button>
      </div>
      <div className="washing__wrapper-block">
        {deliverys.map((delivery, index) => (
          <div key={index} className="size__wrapper-block">
          <p>Кол-во: {delivery.deliveryQuantity}, Цена: {delivery.deliveryPrice}, Стоимость: {delivery.cost}</p>
          <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteItem(index, 'delivery')}
            >
              &times;
            </button>
        </div>
        ))}
      </div>

      <div className="form-row">
        <div className="form-group col-md-2 froze">
          Монтаж
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="installationQuantity">Кол-во</label>
          <input
            type="number"
            className="form-control"
            id="installationQuantity"
            value={installationQuantity}
            onChange={(e) => setInstallationQuantity(parseFloat(e.target.value))}
          />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="installationPrice">Стоимость</label>
          <input
            type="number"
            className="form-control"
            id="installationPrice"
            value={installationPrice}
            onChange={(e) => setInstallationPrice(parseFloat(e.target.value))}
          />
        </div>
        <button type="button" className="btn btn-danger other__btn" onClick={addInstallation}>Добавить установку</button>
      </div>
      <div className="washing__wrapper-block">
        {installations.map((installation, index) => (
          <div key={index} className="size__wrapper-block">
          <p>Кол-во: {installation.installationQuantity}, Цена: {installation.installationPrice}, Стоимость: {installation.cost}</p>
          <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteItem(index, 'installation')}
            >
              &times;
            </button>
        </div>
        ))}
      </div>
    </form>
  );
});

export default Other;
