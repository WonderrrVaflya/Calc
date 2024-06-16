import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import KitchenCalculator from './Components/KitchenCalculator';
import BathroomCalculator from './Components/BathroomCalculator';
import WallPanelsCalculator from './Components/WallPanelsCalculator';
import ShelvesCalculator from './Components/ShelvesCalculator';
import WindowSillsCalculator from './Components/WindowSillsCalculator';
import Other from './Components/Other';
import Comments from './Components/Comments';

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [calculatorCosts, setCalculatorCosts] = useState([]);
  const [name, setName] = useState('');
  const [exchange, setExchange] = useState('');
  const [designerBonus, setDesignerBonus] = useState('');
  const [designerBonusSum, setDesignerBonusSum] = useState('');
  const [userBonus, setUserBonus] = useState('');
  const [userBonusSum, setUserBonusSum] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;
      setCurrentDate(formattedDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000 * 60 * 10);

    return () => clearInterval(interval);
  }, []);

  const addBlock = (type) => {
    setBlocks([...blocks, { type, id: Date.now() }]);
    setCalculatorCosts([...calculatorCosts, { id: Date.now(), cost: 0 }]);
  };

  const removeBlock = (id) => {
    setBlocks(blocks.filter(block => block.id !== id));
    setCalculatorCosts(calculatorCosts.filter(cost => cost.id !== id));
  };

  const updateTotalCost = (cost, id) => {
    setCalculatorCosts((prevCosts) => prevCosts.map(c => c.id === id ? { ...c, cost } : c));
  };

  const totalFurnitureCost = calculatorCosts.reduce((sum, item) => sum + item.cost, 0);

  const handleDesignerBonusChange = (e) => {
    const value = e.target.value;
    const summ = parseFloat(value) / 100 * totalFurnitureCost;
    setDesignerBonus(value);
    if (!isNaN(summ)) {
      setDesignerBonusSum(summ);
    } else {
      setDesignerBonusSum(0);
    }
  };

  const handleUserBonusChange = (e) => {
    const value = e.target.value;
    const summ = parseFloat(value) / 100 * totalFurnitureCost;
    setUserBonus(value);
    if (!isNaN(summ)) {
      setUserBonusSum(summ);
    } else {
      setUserBonusSum(0);
    }
  };

  const finalTotalCost = totalFurnitureCost + designerBonusSum + userBonusSum;

  const handleSave = async () => {
    const data = {
      name,
      exchange,
      date: currentDate,
      totalFurnitureCost,
      designerBonus,
      designerBonusSum,
      userBonus,
      userBonusSum,
      finalTotalCost,
      calculatorCosts
    };

    try {
      const response = await fetch('http://localhost:5000/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Данные успешно сохранены!');
      } else {
        alert('Ошибка при сохранении данных');
      }
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
      alert('Ошибка при сохранении данных');
    }
  };

  return (
    <div>
      <div className="form-row header">
        <div className="form-group col-md-4">
          <label htmlFor="inputName">Имя</label>
          <input
            className="form-control inputName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputCurs">Курс</label>
          <input
            className="form-control inputName"
            type="text"
            value={exchange}
            onChange={(e) => setExchange(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4 header-date">
          <p>Дата: {currentDate}</p>
        </div>
      </div>

      <div className='button-container'>
        <button className="btn btn-success btns-finish" onClick={() => addBlock('kitchen')}>Столешница Кух</button>
        <button className="btn btn-success btns-finish" onClick={() => addBlock('bathroom')}>Столешница С/У</button>
        <button className="btn btn-success btns-finish" onClick={() => addBlock('wallPanels')}>Стен панели</button>
        <button className="btn btn-success btns-finish" onClick={() => addBlock('windowSills')}>Подоконники</button>
        <button className="btn btn-success btns-finish" onClick={() => addBlock('shelves')}>Полки</button>
        <button className="btn btn-success btns-finish" onClick={() => addBlock('other')}>Иное</button>
        <button className="btn btn-success btns-finish" onClick={() => addBlock('comments')}>Комментарий</button>
      </div>

      {blocks.map(block => (
        <div key={block.id} className="block-container">
          {block.type === 'kitchen' && <KitchenCalculator updateTotalCost={(cost) => updateTotalCost(cost, block.id)} />}
          {block.type === 'bathroom' && <BathroomCalculator updateTotalCost={(cost) => updateTotalCost(cost, block.id)} />}
          {block.type === 'wallPanels' && <WallPanelsCalculator updateTotalCost={(cost) => updateTotalCost(cost, block.id)} />}
          {block.type === 'windowSills' && <WindowSillsCalculator updateTotalCost={(cost) => updateTotalCost(cost, block.id)} />}
          {block.type === 'shelves' && <ShelvesCalculator updateTotalCost={(cost) => updateTotalCost(cost, block.id)} />}
          {block.type === 'other' && <Other updateTotalCost={(cost) => updateTotalCost(cost, block.id)} />}
          {block.type === 'comments' && <Comments updateTotalCost={(cost) => updateTotalCost(cost, block.id)} />}
          <button className="btn btn-danger btn-remove" onClick={() => removeBlock(block.id)}>Удалить</button>
        </div>
      ))}

      <div className="finish">
        <p className="summ">Общая стоимость: {totalFurnitureCost}</p>
        <div className="form-group finish__percent">
          <p>Бонус Дизайнера</p>
          <input
            type="number"
            className="form-control finish__design--percent"
            value={designerBonus}
            onChange={handleDesignerBonusChange}
          />
        </div>
        <div className="form-group finish__percent">
          <p className="summ">Процент</p>
          <input
            type="number"
            className="form-control finish__design--percent"
            value={userBonus}
            onChange={handleUserBonusChange}
          />
        </div>

        <p className="summ">Итого: {finalTotalCost}</p>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-lg btn-block"
        onClick={handleSave}>
        Сохранить
      </button>
    </div>
  );
};

export default App;


