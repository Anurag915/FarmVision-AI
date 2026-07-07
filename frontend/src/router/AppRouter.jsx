import {Routes,Route} from "react-router-dom";

import DashBoard from "../pages/Dashboard";
import Recommendation from "../pages/Recommendation";
import PriceForecast from "../pages/PriceForecast";
import ProductionForecast from "../pages/ProductionForecast";
import AIModels from "../pages/AIModels";
import About from "../pages/About";
import AnalyticsDashboard from "../pages/AnalyticsDashboard";


function AppRouter(){
    return(
        <Routes>
            <Route path="/" element={<DashBoard/>}/>
            <Route path="/recommendation" element={<Recommendation/>}/>
            <Route path="/price" element={<PriceForecast/>}/>
            <Route path="/production" element={<ProductionForecast/>}/>
            <Route path="/models" element={<AIModels/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/analytics" element={<AnalyticsDashboard/>}/>
        </Routes>   
    )
}

export default AppRouter;