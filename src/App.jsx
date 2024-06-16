import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import KitchenCalculator from './Components/KitchenCalculator';
import BathroomCalculator from './Components/BathroomCalculator';
import WallPanelsCalculator from './Components/WallPanelsCalculator';
import ShelvesCalculator from './Components/ShelvesCalculator';
import WindowSillsCalculator from './Components/WindowSillsCalculator';
import Other from './Components/Other';
import Comments from './Components/Comments';

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [name, setName] = useState('');
  const [exchange, setExchange] = useState('');
  const [designerBonus, setDesignerBonus] = useState('');
  const [designerBonusSum, setDesignerBonusSum] = useState(0); // Initialize to 0
  const [userBonus, setUserBonus] = useState('');
  const [userBonusSum, setUserBonusSum] = useState(0); // Initialize to 0
  const [currentDate, setCurrentDate] = useState('');
  const [totalFurnitureCost, setTotalFurnitureCost] = useState(0); // Initialize to 0
  const [finalTotalCost, setFinalTotalCost] = useState(0); // Initialize to 0
  
  const kitchenCalculatorRef = useRef();
  const bathroomCalculatorRef = useRef();
  const wallPanelsCalculatorRef = useRef();
  const shelvesCalculatorRef = useRef();
  const windowSillsCalculatorRef = useRef();
  const otherCalculatorRef = useRef();
  const commentsCalculatorRef = useRef();

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
  };

  const removeBlock = (id) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

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

  const calculateTotalFurnitureCost = () => {
    let totalCost = 0;

    if (kitchenCalculatorRef.current) {
      const kitchenData = kitchenCalculatorRef.current.getData();
      totalCost += kitchenData.totalCost || 0;
    }

    if (bathroomCalculatorRef.current) {
      const bathroomData = bathroomCalculatorRef.current.getData();
      totalCost += bathroomData.totalCost || 0;
    }

    if (wallPanelsCalculatorRef.current) {
      const wallPanelsData = wallPanelsCalculatorRef.current.getData();
      totalCost += wallPanelsData.totalCost || 0;
    }

    if (shelvesCalculatorRef.current) {
      const shelvesData = shelvesCalculatorRef.current.getData();
      totalCost += shelvesData.totalCost || 0;
    }

    if (windowSillsCalculatorRef.current) {
      const windowSillsData = windowSillsCalculatorRef.current.getData();
      totalCost += windowSillsData.totalCost || 0;
    }

    if (otherCalculatorRef.current) {
      const otherData = otherCalculatorRef.current.getData();
      totalCost += otherData.totalCost || 0;
    }

    if (commentsCalculatorRef.current) {
      const commentsData = commentsCalculatorRef.current.getData();
      totalCost += commentsData.totalCost || 0;
    }

    return totalCost;
  };

  useEffect(() => {
    const newTotalFurnitureCost = calculateTotalFurnitureCost();
    setTotalFurnitureCost(newTotalFurnitureCost);
    const newFinalTotalCost = newTotalFurnitureCost + designerBonusSum + userBonusSum;
    setFinalTotalCost(newFinalTotalCost);
  }, [
    kitchenCalculatorRef,
    bathroomCalculatorRef,
    wallPanelsCalculatorRef,
    shelvesCalculatorRef,
    windowSillsCalculatorRef,
    otherCalculatorRef,
    commentsCalculatorRef,
    designerBonusSum,
    userBonusSum
  ]);

  const handleSave = async () => {
    const kitchenData = kitchenCalculatorRef.current ? kitchenCalculatorRef.current.getData() : {};
    const bathroomData = bathroomCalculatorRef.current ? bathroomCalculatorRef.current.getData() : {};
    const wallPanelsData = wallPanelsCalculatorRef.current ? wallPanelsCalculatorRef.current.getData() : {};
    const shelvesData = shelvesCalculatorRef.current ? shelvesCalculatorRef.current.getData() : {};
    const windowSillsData = windowSillsCalculatorRef.current ? windowSillsCalculatorRef.current.getData() : {};
    const otherData = otherCalculatorRef.current ? otherCalculatorRef.current.getData() : {};
    const commentsData = commentsCalculatorRef.current ? commentsCalculatorRef.current.getData() : {};

    const totalFurnitureCost = [
      kitchenData.totalCost || 0,
      bathroomData.totalCost || 0,
      wallPanelsData.totalCost || 0,
      shelvesData.totalCost || 0,
      windowSillsData.totalCost || 0,
      otherData.totalCost || 0,
      commentsData.totalCost || 0,
    ].reduce((sum, cost) => sum + cost, 0);
  
    const designerBonusSum = parseFloat(designerBonus) / 100 * totalFurnitureCost || 0;
    const userBonusSum = parseFloat(userBonus) / 100 * totalFurnitureCost || 0;
    const finalTotalCost = totalFurnitureCost + designerBonusSum + userBonusSum;
  
    const dataToSend = {
      name,
      exchange,
      date: currentDate,
      totalFurnitureCost,
      designerBonus,
      designerBonusSum,
      userBonus,
      userBonusSum,
      finalTotalCost,
      kitchenData,
      bathroomData,
      wallPanelsData,
      shelvesData,
      windowSillsData,
      otherData,
      commentsData,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/entries', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
        alert('Данные успешно сохранены!');
      console.log(response)
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
          {block.type === 'kitchen' && <KitchenCalculator ref={kitchenCalculatorRef} updateTotalCost={(cost) => setTotalFurnitureCost(prev => prev + cost)} />}
          {block.type === 'bathroom' && <BathroomCalculator ref={bathroomCalculatorRef} updateTotalCost={(cost) => setTotalFurnitureCost(prev => prev + cost)} />}
          {block.type === 'wallPanels' && <WallPanelsCalculator ref={wallPanelsCalculatorRef} updateTotalCost={(cost) => setTotalFurnitureCost(prev => prev + cost)} />}
          {block.type === 'windowSills' && <WindowSillsCalculator ref={windowSillsCalculatorRef} updateTotalCost={(cost) => setTotalFurnitureCost(prev => prev + cost)} />}
          {block.type === 'shelves' && <ShelvesCalculator ref={shelvesCalculatorRef} updateTotalCost={(cost) => setTotalFurnitureCost(prev => prev + cost)} />}
          {block.type === 'other' && <Other ref={otherCalculatorRef} updateTotalCost={(cost) => setTotalFurnitureCost(prev => prev + cost)} />}
          {block.type === 'comments' && <Comments ref={commentsCalculatorRef} updateTotalCost={(cost) => setTotalFurnitureCost(prev => prev + cost)} />}
          <button className="btn btn-danger btn-sm" onClick={() => removeBlock(block.id)}>Удалить блок</button>
        </div>
      ))}

      <div className="form-group">
        <label htmlFor="designerBonus">Бонус дизайнера, %:</label>
        <input
          type="number"
          className="form-control"
          id="designerBonus"
          value={designerBonus}
          onChange={handleDesignerBonusChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="userBonus">Бонус клиента, %:</label>
        <input
          type="number"
          className="form-control"
          id="userBonus"
          value={userBonus}
          onChange={handleUserBonusChange}
        />
      </div>

      <div className="total-cost">
        <h3>Общая стоимость мебели: {totalFurnitureCost}</h3>
        <h3>Итоговая стоимость с учетом бонусов: {finalTotalCost}</h3>
      </div>

      <button className="btn btn-primary" onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default App;
