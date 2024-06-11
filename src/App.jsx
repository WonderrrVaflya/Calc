import React, { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import KitchenCalculator from './Components/KitchenCalculator';
import BathroomCalculator from './Components/BathroomCalculator';
// Импортируйте другие калькуляторы аналогичным образом

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

    const [designerBonus, setDesignerBonus] = useState(0);

    const updateTotalCost = (cost, calculator) => {
        setCalculatorCosts((prevCosts) => ({
            ...prevCosts,
            [calculator]: cost,
        }));
    };

    const handleDesignerBonusChange = (e) => {
        setDesignerBonus(parseFloat(e.target.value) || 0);
    };

    const totalFurnitureCost = Object.values(calculatorCosts).reduce((sum, cost) => sum + cost, 0);
    const finalTotalCost = totalFurnitureCost + designerBonus;

    const toggleCalculatorVisibility = (calculator) => {
        setVisibleCalculators((prevState) => ({
            ...prevState,
            [calculator]: !prevState[calculator],
        }));
    };

    return (
        <div>
            <div className="form-row header">
                <div className="form-group col-md-4">
                    <label htmlFor="inputName">Имя</label>
                    <input className="form-control inputName" type="text"/>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="inputCurs">Курс</label>
                    <input type="number" className="form-control" id="inputCurs"/>
                </div>
                <div className="form-group col-md-4 header-date">
                    <p id="inputData"></p>
                </div>
            </div>

            <div>
                <button className="btn btn-primary" onClick={() => toggleCalculatorVisibility('kitchen')}>Столешница Кух</button>
                <button className="btn btn-primary" onClick={() => toggleCalculatorVisibility('bathroom')}>Столешница С/У</button>
                <button className="btn btn-primary" onClick={() => toggleCalculatorVisibility('wallPanels')}>Стен панели</button>
                <button className="btn btn-primary" onClick={() => toggleCalculatorVisibility('windowSills')}>Подоконники</button>
                <button className="btn btn-primary" onClick={() => toggleCalculatorVisibility('shelves')}>Полки</button>
                <button className="btn btn-primary" onClick={() => toggleCalculatorVisibility('other')}>Иное</button>
                <button className="btn btn-primary" onClick={() => toggleCalculatorVisibility('comments')}>Комментарий</button>
            </div>

            <div className={visibleCalculators.kitchen ? '' : 'd-none'}>
                <KitchenCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'kitchen')} />
            </div>
            <div className={visibleCalculators.bathroom ? '' : 'd-none'}>
                <BathroomCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'bathroom')} />
            </div>
            <div className={visibleCalculators.wallPanels ? '' : 'd-none'}>
                стен панели
                {/* <BathroomCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'bathroom')} /> */}
            </div>
            <div className={visibleCalculators.windowSills ? '' : 'd-none'}>
                Подоконники
                {/* <BathroomCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'bathroom')} /> */}
            </div>
            <div className={visibleCalculators.shelves ? '' : 'd-none'}>
                Полки
                {/* <BathroomCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'bathroom')} /> */}
            </div>
            <div className={visibleCalculators.other ? '' : 'd-none'}>
                Иное
                {/* <BathroomCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'bathroom')} /> */}
            </div>
            <div className={visibleCalculators.comments ? '' : 'd-none'}>
                Комментарий
                {/* <BathroomCalculator updateTotalCost={(cost) => updateTotalCost(cost, 'bathroom')} /> */}
            </div>

            <div className="finish">   
                <p className="summ">Общая стоимость: {totalFurnitureCost}</p>
                <div className="form-group">
                    <label>Бонус Дизайнера</label>
                    <input 
                    type="number" 
                    className="form-control" 
                    value={designerBonus} 
                    onChange={handleDesignerBonusChange} 
                    />
                </div>
                <p className="summ">Процент:</p>
                <p className="summ">Итого: {finalTotalCost}</p>
            </div>
            <button type="button" className="btn btn-primary btn-lg btn-block">Сохранить</button>
        </div>
    );
};

export default App;

