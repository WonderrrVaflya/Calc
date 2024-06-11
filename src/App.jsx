import React, { useState } from 'react'; 
import './App.css'
import KitchenCalculator from './Components/KitchenCalculator'

const App = () => {
    const [activeCalculator, setActiveCalculator] = useState(null);

    const toggleCalculator = (calculator) => {
        setActiveCalculator(activeCalculator === calculator ? null : calculator);
    };

    return (
        <div>
            <div>
                <button onClick={() => toggleCalculator('kitchen')}>Столешница Кух</button>
                <button onClick={() => toggleCalculator('bathroom')}>Столешница С/У</button>
                <button onClick={() => toggleCalculator('wallPanels')}>Стен панели</button>
                <button onClick={() => toggleCalculator('windowSills')}>Подоконники</button>
                <button onClick={() => toggleCalculator('shelves')}>Полки</button>
                <button onClick={() => toggleCalculator('other')}>Иное</button>
                <button onClick={() => toggleCalculator('comments')}>Комментарий</button>
            </div>

            {activeCalculator === 'kitchen' && <KitchenCalculator />}
            {/* другие калкуляторы */}
        </div>
    );
};

export default App;
