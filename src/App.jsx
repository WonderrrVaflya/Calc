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
    const [visibleCalculators, setVisibleCalculators] = useState({
        kitchen: false,
        bathroom: false,
        wallPanels: false,
        windowSills: false,
        shelves: false,
        other: false,
        comments: false,
    });

    const [calculatorCosts, setCalculatorCosts] = useState({
        kitchen: 0,
        bathroom: 0,
        wallPanels: 0,
        windowSills: 0,
        shelves: 0,
        other: 0,
        comments: 0,
    });

    const toggleCalculatorVisibility = (calculator) => {
        setVisibleCalculators((prevState) => ({
            ...prevState,
            [calculator]: !prevState[calculator],
        }));
    };

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


    const updateTotalCost = (cost, calculator) => {
        setCalculatorCosts((prevCosts) => ({
            ...prevCosts,
            [calculator]: cost,
        }));
    };

    const totalFurnitureCost = Object.values(calculatorCosts).reduce((sum, cost) => sum + cost, 0);

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
                <button className="btn btn-success btns-finish" onClick={() => toggleCalculatorVisibility('kitchen')}>Столешница Кух</button>
                <button className="btn btn-success btns-finish" onClick={() => toggleCalculatorVisibility('bathroom')}>Столешница С/У</button>
                <button className="btn btn-success btns-finish" onClick={() => toggleCalculatorVisibility('wallPanels')}>Стен панели</button>
                <button className="btn btn-success btns-finish" onClick={() => toggleCalculatorVisibility('windowSills')}>Подоконники</button>
                <button className="btn btn-success btns-finish" onClick={() => toggleCalculatorVisibility('shelves')}>Полки</button>
                <button className="btn btn-success btns-finish" onClick={() => toggleCalculatorVisibility('other')}>Иное</button>
                <button className="btn btn-success btns-finish" onClick={() => toggleCalculatorVisibility('comments')}>Комментарий</button>
            </div>
            <div className={visibleCalculators.kitchen ? '' : 'd-none'}>
                <KitchenCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'kitchen')} />
            </div>
            <div className={visibleCalculators.bathroom ? '' : 'd-none'}>
                <BathroomCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'bathroom')} />
            </div>
            <div className={visibleCalculators.wallPanels ? '' : 'd-none'}>
                <WallPanelsCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'wallPanels')} />
            </div>
            <div className={visibleCalculators.windowSills ? '' : 'd-none'}>
                <WindowSillsCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'windowSills')} />
            </div>
            <div className={visibleCalculators.shelves ? '' : 'd-none'}>
                <ShelvesCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'shelves')} />
            </div>
            <div className={visibleCalculators.other ? '' : 'd-none'}>
                <Other updateTotalCost={(cost) => updateTotalCost(cost, 'other')} />
            </div>
            <div className={visibleCalculators.comments ? '' : 'd-none'}>
                <Comments updateTotalCost={(cost) => updateTotalCost(cost, 'comments')} />
            </div>

            <div className="finish">   
                <p className="summ">Общая стоимость: {totalFurnitureCost}</p>
                <div className="form-group">
                    <label>Бонус Дизайнера: {designerBonusSum}</label>
                    <input 
                    type="number" 
                    className="form-control" 
                    value={designerBonus} 
                    onChange={handleDesignerBonusChange} 
                    />
                </div>
                <p className="summ">Процент: {userBonusSum}</p>
                    <input 
                    type="number" 
                    className="form-control" 
                    value={userBonus} 
                    onChange={handleUserBonusChange} 
                    />
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

